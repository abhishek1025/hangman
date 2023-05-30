import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="App">
            <h1>THE <br /> HANGMAN</h1>

            <p>
                Welcome to the world of Hangman, the classic word-guessing game that has been entertaining and challenging players for generations.
            </p>


            <Link to="gamescreen">
                <button>Play Game</button>
            </Link>
        </div>
    )
}

export default Home;