import React from 'react';
import "../game-screen/GameScreen.styles.scss";

const Hangman = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <svg height="250" width="200" className="figure-container">
                {/* <!-- Rod --> */}
                <line x1="60" y1="20" x2="140" y2="20"></line>
                <line x1="140" y1="20" x2="140" y2="50"></line>
                <line x1="60" y1="20" x2="60" y2="230"></line>
                <line x1="20" y1="230" x2="100" y2="230"></line>

                {/* <!-- Head --> */}
                <circle cx="140" cy="70" r="20" className="figure-part"></circle>
                {/* <!-- Body --> */}
                <line x1="140" y1="90" x2="140" y2="150" className="figure-part"></line>
                {/* <!-- Arms --> */}
                <line x1="140" y1="120" x2="120" y2="100" className="figure-part"></line>
                <line x1="140" y1="120" x2="160" y2="100" className="figure-part"></line>
                {/* <!-- Legs --> */}
                <line x1="140" y1="150" x2="120" y2="180" className="figure-part"></line>
                <line x1="140" y1="150" x2="160" y2="180" className="figure-part"></line>
            </svg>

        </div>
    )
}

export default Hangman;