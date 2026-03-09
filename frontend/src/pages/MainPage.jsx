import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import './MainPage.css';
import heroIllustration from '../assets/hero-illustration.png';
import { Activity, ArrowRight, Play, Clock, Brain, LayoutGrid, BarChart3, ClipboardList, Cpu, CalendarCheck, TrendingUp, UserRound, ShieldCheck, Stethoscope } from 'lucide-react';

const MainPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <MainNavbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    {/* Left Content */}
                    <div className="hero-content">
                        {/* Badge */}
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            AI-Powered Recovery Prediction
                        </div>

                        {/* Headline */}
                        <h1 className="hero-title">
                            Predict Recovery.<br />
                            <span className="title-highlight">Plan Performance.</span>
                        </h1>

                        {/* Description */}
                        <p className="hero-description">
                            MediPredict analyzes injury data, player history, and training load to generate personalized recovery timelines — empowering smarter return-to-play decisions.
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={() => navigate('/register')}>
                                Get Started
                                <ArrowRight size={18} />
                            </button>
                            <button className="btn-secondary">
                                <Play size={18} />
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-value">95%</div>
                                <div className="stat-label">Prediction Accuracy</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">3x</div>
                                <div className="stat-label">Faster Recovery Plans</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">500+</div>
                                <div className="stat-label">Athletes Monitored</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="hero-visual">
                        <img
                            src={heroIllustration}
                            alt="AI-Powered Recovery Analytics"
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>

            {/* Built for Every Role Section */}
            <section className="roles-section">
                <div className="roles-container">
                    <span className="roles-subtitle">WHO IT'S FOR</span>
                    <h2 className="roles-title">Built for Every Role</h2>

                    <div className="roles-grid">
                        <div className="role-card">
                            <div className="role-icon-wrapper">
                                <UserRound size={28} />
                            </div>
                            <h3 className="role-card-title">Player</h3>
                            <p className="role-card-desc">Track your recovery progress and get personalized return-to-play timelines.</p>
                        </div>
                        <div className="role-card">
                            <div className="role-icon-wrapper">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="role-card-title">Coach</h3>
                            <p className="role-card-desc">Monitor team availability and plan training schedules around recovery data.</p>
                        </div>
                        <div className="role-card">
                            <div className="role-icon-wrapper">
                                <Stethoscope size={28} />
                            </div>
                            <h3 className="role-card-title">Medical Staff</h3>
                            <p className="role-card-desc">Access detailed injury analytics, set recovery milestones, and export medical reports.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand-col">
                            <div className="navbar-brand">
                                <Activity className="brand-icon" size={24} />
                                <span className="brand-text">
                                    Medi<span className="brand-highlight">Predict</span>
                                </span>
                            </div>
                            <p className="footer-tagline">
                                AI-powered sports injury recovery prediction for smarter return-to-play decisions.
                            </p>
                        </div>

                        {/* Product Links */}
                        <div className="footer-link-col">
                            <h4 className="footer-col-title">Product</h4>
                            <a onClick={() => navigate('/features')} style={{ cursor: 'pointer' }}>Features</a>
                            <a onClick={() => navigate('/how-it-works')} style={{ cursor: 'pointer' }}>How It Works</a>
                            <a onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>Reports</a>
                            <a href="#">Pricing</a>
                        </div>

                        {/* Company Links */}
                        <div className="footer-link-col">
                            <h4 className="footer-col-title">Company</h4>
                            <a onClick={() => navigate('/about-team')} style={{ cursor: 'pointer' }}>About Team</a>
                            <a href="#">Careers</a>
                            <a href="#">Contact</a>
                            <a href="#">Blog</a>
                        </div>

                        {/* Legal Links */}
                        <div className="footer-link-col">
                            <h4 className="footer-col-title">Legal</h4>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookie Policy</a>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <span>© 2026 MediPredict. All rights reserved.</span>
                        <span>Built with AI for sports medicine professionals.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;

