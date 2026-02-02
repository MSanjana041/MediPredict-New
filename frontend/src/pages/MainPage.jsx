import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import logo from '../assets/logo/logo.png';
import {
    BarChart3,
    Brain,
    FileText,
    TrendingUp,
    Users,
    Zap,
    User,
    Stethoscope,
    ShieldCheck,
    LayoutDashboard,
    ArrowRight,
    LogIn
} from 'lucide-react';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="main-page">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <div className="logo-container">
                        <img src={logo} alt="MediPredict Logo" className="logo" />
                    </div>
                </div>
                <nav className="nav-links">
                    <span>Home</span>
                    <span>Features</span>
                    <span>How It Works</span>
                    <span>About Team</span>
                </nav>
                <div className="header-right">
                    <button className="login-btn" onClick={() => navigate('/login')}>
                        <LogIn size={18} />
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <h1>
                    Smarter <span className="hero-gradient">Return-to-Play</span><br />
                    Decisions
                </h1>
                <p className="hero-description">
                    Predict injury recovery timelines with precision. Empower athletes, coaches,
                    and medical teams with data-driven insights for safer, faster returns.
                </p>

                <div className="stats">
                    <div className="stat-item stat-accuracy">
                        <div className="stat-value"><TrendingUp size={28} /> 94%</div>
                        <div className="stat-label">Prediction Accuracy</div>
                    </div>
                    <div className="stat-item stat-recovery">
                        <div className="stat-value"><Zap size={28} /> 40%</div>
                        <div className="stat-label">Faster Recovery</div>
                    </div>
                    <div className="stat-item stat-tracked">
                        <div className="stat-value"><Users size={28} /> 10K+</div>
                        <div className="stat-label">Athletes Tracked</div>
                    </div>
                </div>
            </section>

            {/* Roles Section */}
            <section className="roles-section">
                <div className="section-title">
                    <h2>Built for Every Role</h2>
                    <p>Whether you're tracking your own recovery or managing a team, MediPredict adapts to your needs.</p>
                </div>

                <div className="roles-grid">
                    <div className="role-card">
                        <div className="role-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                            <User size={24} />
                        </div>
                        <h3>Player</h3>
                        <p>Track your recovery progress and understand your return-to-play timeline with personalized insights.</p>
                    </div>

                    <div className="role-card">
                        <div className="role-icon" style={{ backgroundColor: '#f0fdf4', color: '#10b981' }}>
                            <Users size={24} />
                        </div>
                        <h3>Coach</h3>
                        <p>Plan matches with confidence using real-time player availability and recovery predictions.</p>
                    </div>

                    <div className="role-card">
                        <div className="role-icon" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
                            <Stethoscope size={24} />
                        </div>
                        <h3>Medical Staff</h3>
                        <p>Access data-driven recovery insights to make informed treatment and clearance decisions.</p>
                    </div>

                    <div className="role-card">
                        <div className="role-icon" style={{ backgroundColor: '#fff7ed', color: '#f97316' }}>
                            <ShieldCheck size={24} />
                        </div>
                        <h3>Admin</h3>
                        <p>Manage system-wide settings, user access, and monitor organization health metrics.</p>
                    </div>
                </div>
            </section>

            {/* Actions Section */}
            <section className="actions-section">
                <div className="section-title">
                    <h2>What would you like to do?</h2>
                    <p>Jump straight into the tools you need most</p>
                </div>

                <div className="actions-grid">
                    <div className="action-card">
                        <div className="action-icon">
                            <LayoutDashboard size={28} />
                        </div>
                        <h3>View Dashboard</h3>
                        <p>Access real-time analytics and team health overview</p>
                        <button className="action-btn btn-blue">
                            Get Started <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="action-card">
                        <div className="action-icon" style={{ color: '#10b981' }}>
                            <Brain size={28} />
                        </div>
                        <h3>Predict Recovery</h3>
                        <p>Generate AI-powered recovery timeline predictions</p>
                        <button className="action-btn btn-teal">
                            Get Started <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="action-card">
                        <div className="action-icon">
                            <FileText size={28} />
                        </div>
                        <h3>View Reports</h3>
                        <p>Review detailed injury and recovery documentation</p>
                        <button className="action-btn btn-gray">
                            Get Started <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-left">
                    <div className="logo-container">
                        <img src={logo} alt="MediPredict Logo" className="logo" />
                    </div>
                </div>
                <div className="copyright">
                    © 2026 MediPredict. AI-powered injury recovery prediction.
                </div>
            </footer>
        </div>
    );
};

export default MainPage;
