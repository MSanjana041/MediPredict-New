const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getRecoveryProgress, getTeamAvailability } = require('../controllers/reportController');

// Recovery Progress Report
// We map both the base path and the path with a specific playerId to the same controller
router.get('/recovery-progress', protect, getRecoveryProgress);
router.get('/recovery-progress/:playerId', protect, getRecoveryProgress);

// Team Availability Report
router.get('/team-availability', protect, getTeamAvailability);

module.exports = router;
