import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/home" className="navbar-logo">AutoPost</Link>
                <ul className="navbar-menu">
                    <li className="navbar-item"><Link to="/home" className="navbar-link">Home</Link></li>
                    <li className="navbar-item dropdown">
                        <span className="navbar-link">予約確認</span>
                        <ul className="dropdown-menu">
                            <li><Link to="/reservation" className="dropdown-link">予約確認</Link></li>
                            <li><Link to="/completed" className="dropdown-link">投稿済み</Link></li>
                        </ul>
                    </li>
                    <li className="navbar-item"><Link to="/post" className="navbar-link">予約投稿</Link></li>
                    <li className="navbar-item dropdown">
                        <span className="navbar-link">SNSアカウント接続</span>
                        <ul className="dropdown-menu">
                            <li><Link to="/register-sns" className="dropdown-link">アカウント登録</Link></li>
                            <li><Link to="/check-sns" className="dropdown-link">アカウント確認</Link></li>
                        </ul>
                    </li>
                    <li className="navbar-item"><Link to="/account" className="navbar-link">アカウント管理</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
