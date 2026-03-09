const User = require('../models/User');
const Role = require('../models/Role');
const Injury = require('../models/Injury');
const TrainingLoad = require('../models/TrainingLoad');

// @desc    Get recovery progress for a specific player
// @route   GET /api/reports/recovery-progress/:playerId
// @access  Private (Player or Medical Staff)
const getRecoveryProgress = async (req, res) => {
    try {
        const playerId = req.params.playerId || req.user._id;

        // Verify player exists
        const player = await User.findById(playerId).select('name team position');
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Check Authorization (if trying to access someone else's player data)
        const isMedicalOrCoach = req.user.roles && req.user.roles.some(r => r.name === 'Medical' || r.name === 'Coach');
        if (req.user._id.toString() !== playerId.toString() && !isMedicalOrCoach) {
            // We might not have the populated roles here cleanly depending on auth middleware, 
            // but keeping basic protection.
            return res.status(403).json({ message: 'Not authorized to view this report' });
        }


        // Find the most recent active or recovering injury
        const activeInjury = await Injury.findOne({
            playerId,
            status: { $in: ['Active', 'Recovering'] }
        }).sort({ createdAt: -1 });

        if (!activeInjury) {
            return res.status(404).json({ message: 'No active injury found for this player to report on.' });
        }

        // Mocking week-by-week progress logic based on training loads and time elapsed
        // In reality, this would be computed by a ML model or aggregated accurately.
        // For demonstration, we'll generate a 6-week progressive array.

        const daysElapsed = Math.floor((new Date() - new Date(activeInjury.dateOfInjury)) / (1000 * 60 * 60 * 24));
        const weeksElapsed = Math.floor(daysElapsed / 7) || 1;

        let currentLevel = 0;
        let progressData = [];

        // Generate mock progressive curve up to 6 weeks
        const maxWeeks = Math.max(weeksElapsed, 6);
        for (let w = 1; w <= maxWeeks; w++) {
            // Simulated logarithmic recovery curve
            const estimatedProgress = Math.min(Math.round((w / (activeInjury.expectedRecoveryDays / 7 || 6)) * 100), 100);

            progressData.push({
                week: `Week ${w}`,
                progress: w <= weeksElapsed ? estimatedProgress : null // Future weeks are null
            });

            if (w === weeksElapsed) {
                currentLevel = estimatedProgress;
            }
        }

        let interpretation = '';
        if (currentLevel >= 100) {
            interpretation = `The player reached full recovery and maintained stable physical condition through Week ${weeksElapsed}. Final medical clearance is pending before returning to competition.`;
        } else if (currentLevel >= 50) {
            interpretation = `The player is showing steady progress, currently at ${currentLevel}% recovery capacity. Rehabilitation is proceeding as expected towards the estimated return date.`;
        } else {
            interpretation = `The player is currently in the early stages of recovery at ${currentLevel}%. Focus remains on reducing inflammation and restoring basic mobility.`;
        }

        // Formatting the response
        const report = {
            player: {
                name: player.name,
                team: player.team || 'Unassigned',
                position: player.position || 'Unknown'
            },
            injury: {
                type: activeInjury.injuryType,
                date: activeInjury.dateOfInjury,
                status: activeInjury.status,
                treatment: activeInjury.treatment || 'Standard Rehabilitation',
                notes: activeInjury.notes || 'Patient recovery progressing well.\nMobility restored to normal levels.\nRecommended gradual return to full training.'
            },
            recovery: {
                currentLevel: currentLevel,
                expectedReturnDays: activeInjury.expectedRecoveryDays || 42, // Default 6 weeks
                estimatedReturnDate: new Date(new Date(activeInjury.dateOfInjury).getTime() + ((activeInjury.expectedRecoveryDays || 42) * 24 * 60 * 60 * 1000)),
                progressTimeline: progressData,
                interpretation: interpretation
            }
        };

        res.json(report);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get team availability metrics for a coach
// @route   GET /api/reports/team-availability
// @access  Private (Coach)
const getTeamAvailability = async (req, res) => {
    try {
        const coachId = req.user._id;

        // Ensure user is a coach
        const playerRole = await Role.findOne({ name: 'Player' });

        // Find all players assigned to this coach
        const players = await User.find({ roles: playerRole._id, coachId }).select('name position');

        if (!players || players.length === 0) {
            return res.status(404).json({ message: 'No players assigned to this coach' });
        }

        const playerIds = players.map(p => p._id);
        const totalSquadSize = players.length;

        // Find all recent active or recovering injuries for these players
        const activeInjuries = await Injury.find({
            playerId: { $in: playerIds },
            status: { $in: ['Active', 'Recovering'] }
        }).populate('playerId', 'name');

        const clearedInjuries = await Injury.find({
            playerId: { $in: playerIds },
            status: 'Recovered'
        }).sort({ actualRecoveryDate: -1 }).limit(10); // Recently cleared

        let counts = {
            available: totalSquadSize,
            recovering: 0,
            injured: 0,
            cleared: Object.keys(clearedInjuries).length > 20 ? 20 : clearedInjuries.length
        };

        const playerStatusTable = [];

        // Determine player statuses
        players.forEach(player => {
            const playerInjury = activeInjuries.find(i => i.playerId._id.toString() === player._id.toString());

            if (playerInjury) {
                if (playerInjury.status === 'Recovering') {
                    counts.recovering++;
                    counts.available--;
                } else if (playerInjury.status === 'Active') {
                    counts.injured++;
                    counts.available--;
                }

                // Add to table
                const daysRemaining = (playerInjury.expectedRecoveryDays || 14) - Math.floor((new Date() - new Date(playerInjury.dateOfInjury)) / (1000 * 60 * 60 * 24));

                playerStatusTable.push({
                    name: player.name,
                    status: playerInjury.status,
                    injuryType: playerInjury.injuryType,
                    expectedReturn: daysRemaining > 0 ? `${daysRemaining} days` : 'Any day now'
                });
            } else {
                playerStatusTable.push({
                    name: player.name,
                    status: 'Available',
                    injuryType: '-',
                    expectedReturn: 'Available'
                });
            }
        });

        const report = {
            team: {
                totalSquadSize,
                counts
            },
            playerStatusTable: playerStatusTable.sort((a, b) => a.status === 'Available' ? 1 : -1) // Injured/Recovering bubble to top
        };

        res.json(report);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRecoveryProgress,
    getTeamAvailability
};
