import React, { useEffect, useState } from 'react'
import Hangman from '../hangman/Hangman.component';
import triviaData from '../../data/trivia-questions.json';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const GameScreen = () => {

    const [indexOfPartToDisplay, setIndexOfPartToDisplay] = useState(-1);
    const [triviaHints, setTriviaHints] = useState(triviaData.statements);
    const [triviaSN, setTriviaSN] = useState(0);

    const [lettersThatAreInAns, setLettersThatAreInAns] = useState("");
    const [lettersThatAreNotInAns, setLettersThatAreNotInAns] = useState("");

    const [lengthOfAns, setLengthOfAns] = useState(0);

    //function to display the hangman parts
    const displayBodyParts = () => {

        if (indexOfPartToDisplay < 5) {
            setIndexOfPartToDisplay(indexOfPartToDisplay + 1);
            document.querySelectorAll(".figure-part")[indexOfPartToDisplay + 1].style.display = "block";

            return;
        }

        return "bodyIsHanged";
    }


    //function to find the indexes of letter in the answer and display them in the userinterface
    const findIndexes = (array, element) => {

        const indexes = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i] === element) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    //function to display the letter in ui
    const displayLetters = (indexes, word) => {

        const letterDisplayEl = document.querySelectorAll(".letter")

        setLengthOfAns(lengthOfAns + indexes.length);

        indexes.forEach(index => {
            letterDisplayEl[index].innerHTML = word;
        });
    }

    //function to reset the game
    const resetGame = () => {
        setTriviaSN(Math.floor(Math.random() * triviaHints.length));
        setLettersThatAreInAns("");
        setLettersThatAreNotInAns("");
        setIndexOfPartToDisplay(-1);
        setLengthOfAns(0);

        document.querySelectorAll(".letter").forEach((el) => {
            el.innerHTML = "";
        })

        document.querySelectorAll(".figure-part").forEach((el) => {
            el.style.display = "none";
        })
    }

    //hook to handle all the main logic to the game
    useEffect(() => {

        const handleKeyEvent = (event) => {

            const pressedletter = event.key.toLowerCase();
            const triviaAns = triviaHints[triviaSN].answer;

            if (letters.includes(pressedletter)) {

                if (lettersThatAreNotInAns.includes(pressedletter) || lettersThatAreInAns.includes(pressedletter)) {
                    alert("You have aleady entered this word")
                }
                else if (triviaAns.includes(pressedletter)
                ) {
                    const correctLetters = lettersThatAreInAns + pressedletter
                    setLettersThatAreInAns(correctLetters);

                    //displaying letter 
                    displayLetters(findIndexes(Array.from(triviaAns), pressedletter), pressedletter);

                } else {
                    if (indexOfPartToDisplay < 5) {
                        displayBodyParts();

                        const incorrectLetters = lettersThatAreNotInAns + pressedletter;
                        setLettersThatAreNotInAns(incorrectLetters);
                    }
                }
            }


        }

        document.addEventListener("keydown", handleKeyEvent);

        return () => {
            document.removeEventListener("keydown", handleKeyEvent);
        };

    }, [indexOfPartToDisplay, lettersThatAreInAns, lettersThatAreNotInAns, triviaHints, triviaSN])

    //hook to select the question randomly
    useEffect(() => {
        setTriviaSN(Math.floor(Math.random() * triviaHints.length))
    }, [triviaHints.length])

    //hook to check wthere the game is finished or not
    useEffect(() => {
        setTimeout(() => {
            if (indexOfPartToDisplay === 5) {
                alert("Game Over, Better luck next time!");
                resetGame();
                return;
            } else if (triviaHints[triviaSN].answer.length === lengthOfAns) {
                alert("Congratulations, You have guessed the word");
                resetGame();
                return;
            }
        }, 400)

    }, [indexOfPartToDisplay, lengthOfAns, triviaHints, triviaSN])

    return (
        <div className='game-screen'>
            <p className='hint'>Hint: {triviaHints[triviaSN].hint}</p>

            <div className="hangman-icon-sec">
                <Hangman />

                <p className='incorrect-letter'>
                    <b>Incorrect Letters:</b> <br /> {Array.from(lettersThatAreNotInAns).map((letter) => `${letter}, `)}
                </p>
            </div>

            <div className="letters">
                {
                    Array.from(triviaHints[triviaSN].answer).map((letter, index) => {
                        return (<span key={index} className='letter'></span>)
                    })
                }
            </div>

        </div>
    )
}

export default GameScreen;