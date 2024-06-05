import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h1>Welcome to the Auto Posting App</h1>
            <div className="button-container">
                <Link to="/login">
                    <button className="landing-button">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="landing-button">Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
