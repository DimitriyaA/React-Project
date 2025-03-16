import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="overlay"></div>
            <div className="content">
                <h1 className="title">Welcome to HP Magical App</h1>
                <p className="subtitle">
                    Discover the enchanting world of Harry Potter. Explore magical artifacts, mysterious potions, and mystical locations.
                </p>
                <div className="hero-image">
                    <img src="/assets/magical-hero.webp" alt="Magical World" />
                </div>
            </div>
        </div>
    );
}

export default Home;
