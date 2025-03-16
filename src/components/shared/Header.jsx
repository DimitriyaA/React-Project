import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="magical-header">
            <div className="header-logo">
                <Link to="/">HP Magical App</Link>
            </div>
            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/map">Map</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default Header;
