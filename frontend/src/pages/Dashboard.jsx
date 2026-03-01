import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, Shield, Stethoscope, TrendingUp, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return (
        <div className="db-loading">
            <div className="db-spinner"></div>
            <p>Loading...</p>
        </div>
    );

    // Safely extract role names
    const getRoleNames = () => {
        if (!user.roles) return [];
        if (Array.isArray(user.roles) && typeof user.roles[0] === 'object') {
            return user.roles.map(r => r.name);
        }
        if (Array.isArray(user.roles)) return user.roles;
        return user.role ? [user.role] : [];
    };

    const roleNames = getRoleNames();
    const roleDisplay = roleNames.join(', ') || 'Unknown';

    const isAdmin = roleNames.includes('Admin');
    const isCoach = roleNames.includes('Coach');
    const isMedical = roleNames.includes('Medical');
    const isPlayer = roleNames.includes('Player');

    // Role badge config
    const roleBadgeClass = isAdmin ? 'badge-admin'
        : isCoach ? 'badge-coach'
            : isMedical ? 'badge-medical'
                : 'badge-player';

    return (
        <div className="db-page">
            {/* Navbar */}
            <nav className="db-nav">
                <div className="db-nav-brand">
                    <Activity size={22} className="db-brand-icon" />
                    <span className="db-brand-text">
                        Medi<span className="db-brand-highlight">Predict</span>
                    </span>
                </div>
                <div className="db-nav-right">
                    <span className="db-nav-welcome">Welcome, <strong>{user.name}</strong></span>
                    <button className="db-logout-btn" onClick={handleLogout}>
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </nav>

            <main className="db-main">
                {/* Page Header */}
                <div className="db-header-section">
                    <div>
                        <p className="db-section-label">OVERVIEW</p>
                        <h1 className="db-page-title">Player Dashboard</h1>
                    </div>
                    <span className={`db-role-badge ${roleBadgeClass}`}>{roleDisplay}</span>
                </div>

                {/* Stat Cards Row */}
                <div className="db-stats-grid">
                    <div className="db-stat-card">
                        <div className="db-stat-icon-wrap">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="db-stat-label">Account Email</p>
                            <p className="db-stat-value">{user.email}</p>
                        </div>
                    </div>
                    <div className="db-stat-card">
                        <div className="db-stat-icon-wrap">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="db-stat-label">Assigned Role</p>
                            <p className="db-stat-value">{roleDisplay}</p>
                        </div>
                    </div>
                    <div className="db-stat-card">
                        <div className="db-stat-icon-wrap">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="db-stat-label">User ID</p>
                            <p className="db-stat-value db-truncate">{user._id || user.id}</p>
                        </div>
                    </div>
                </div>

                {/* Role-based message */}
                <div className="db-info-banner">
                    {isAdmin && <p className="db-info-msg db-info-admin"><Shield size={16} /> You have full Admin privileges. Manage users and roles via the API.</p>}
                    {isPlayer && <p className="db-info-msg db-info-player"><Activity size={16} /> View your personal injury predictions and recovery timeline below.</p>}
                    {isCoach && <p className="db-info-msg db-info-coach"><TrendingUp size={16} /> Monitor your team's health and performance data.</p>}
                    {isMedical && <p className="db-info-msg db-info-medical"><Stethoscope size={16} /> Access and manage player injury records.</p>}
                </div>

                {/* Quick Access Cards */}
                {(isCoach || isAdmin || isMedical) && (
                    <div className="db-section">
                        <p className="db-section-label">QUICK ACCESS</p>
                        <div className="db-quick-grid">
                            {(isCoach || isAdmin) && (
                                <button className="db-quick-card" onClick={() => navigate('/coach-dashboard')}>
                                    <div className="db-quick-icon">
                                        <TrendingUp size={22} />
                                    </div>
                                    <div className="db-quick-text">
                                        <span className="db-quick-title">Coach Dashboard</span>
                                        <span className="db-quick-desc">Team health, training loads & injury view</span>
                                    </div>
                                    <ChevronRight size={18} className="db-quick-arrow" />
                                </button>
                            )}
                            {(isMedical || isAdmin) && (
                                <button className="db-quick-card" onClick={() => navigate('/medical-dashboard')}>
                                    <div className="db-quick-icon">
                                        <Stethoscope size={22} />
                                    </div>
                                    <div className="db-quick-text">
                                        <span className="db-quick-title">Medical Dashboard</span>
                                        <span className="db-quick-desc">Manage injury records & recovery plans</span>
                                    </div>
                                    <ChevronRight size={18} className="db-quick-arrow" />
                                </button>
                            )}
                            {(isMedical || isAdmin) && (
                                <button className="db-quick-card" onClick={() => navigate('/predictions')}>
                                    <div className="db-quick-icon">
                                        <Activity size={22} />
                                    </div>
                                    <div className="db-quick-text">
                                        <span className="db-quick-title">AI Prediction Module</span>
                                        <span className="db-quick-desc">Generate & review recovery predictions</span>
                                    </div>
                                    <ChevronRight size={18} className="db-quick-arrow" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Session Token */}
                <div className="db-section">
                    <p className="db-section-label">SESSION INFO</p>
                    <div className="db-token-card">
                        <p className="db-token-label">Active JWT Token</p>
                        <code className="db-token-value">{user.token}</code>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
