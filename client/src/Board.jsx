import React, { useState, useEffect } from 'react'; // Importing necessary hooks and React
import './Board.css'; // Importing styles for the board
import Navbar from './components/Navbar'; // Importing the Navbar component
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks for state management
import { updateScore, fetchHighscore } from './redux/slices/userSlice'; // Importing actions from userSlice
import Highscore from './components/Highscore'; // Importing the Highscore component

function Board() {
    // State variables for managing the game state
    const [deck, setDeck] = useState([]); // Holds the deck of cards
    const [diffuseCardCount, setDiffuseCardCount] = useState(0); // Counter for defuse cards
    const [gameOver, setGameOver] = useState(false); // Flag for game over status
    const [gameWon, setGameWon] = useState(false); // Flag for win status
    const [explodeAction, setExplodeAction] = useState(false); // Flag to trigger diffuse action
    const [currentCard, setCurrentCard] = useState(null); // Holds the currently shown card
    const [cardIsShowing, setCardIsShowing] = useState(false); // Flag to check if a card is currently shown

    const dispatch = useDispatch(); // Getting dispatch function from Redux
    const highscore = useSelector((state) => state.user.highscores); // Selecting highscore state from Redux

    // Function to initialize the game deck with random cards
    const initializeDeck = () => {
        const cards = [
            { cardName: 'Cat card', cardTitle: 'Cat Action!' },
            { cardName: 'Defuse card', cardTitle: 'Defuse Card' },
            { cardName: 'Shuffle card', cardTitle: 'Shuffle the Deck' },
            { cardName: 'Exploding kitten card', cardTitle: 'Exploding Kitten!' },
        ];
        const tempDeck = []; // Temporary deck to store cards

        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min); // Helper function to get a random index
        };

        // Adding 5 random cards to the deck
        for (let i = 0; i < 5; i++) {
            tempDeck.push(cards[getRandomInt(0, cards.length - 1)]);
        }

        return tempDeck; // Returning the initialized deck
    };

    // Function to restart the game
    const restartGame = () => {
        const tempDeck = initializeDeck(); // Initialize a new deck
        setDeck(tempDeck); // Set the new deck
        setDiffuseCardCount(0); // Reset defuse card count
        dispatch(fetchHighscore()); // Fetch the high score from the server
        setGameOver(false); // Reset game over status
        setGameWon(false); // Reset win status
    };

    // Function to handle exploding kitten card action
    const handleExplodingKitten = () => {
        const tempDeck = [...deck]; // Create a copy of the current deck
        tempDeck.pop(); // Remove the last card from the deck

        if (deck.length === 1) {
            dispatch(updateScore()); // Update score if the last card was the exploding kitten
            setGameWon(true); // Set game won status
        } else {
            setDiffuseCardCount((prev) => prev - 1); // Decrease the defuse card count
            setDeck(tempDeck); // Update the deck
            setExplodeAction(false); // Reset explode action flag
        }
    };

    // Function to handle showing the current card
    const handleCardShow = () => {
        const tempDeck = [...deck]; // Create a copy of the current deck
        const currCard = tempDeck[tempDeck.length - 1]; // Get the last card from the deck
        setCurrentCard(currCard); // Set the current card to show
        setCardIsShowing(true); // Set card showing flag to true

        // Set a timeout to handle card effects after 2.5 seconds
        setTimeout(() => {
            if (tempDeck.length === 1 && currCard.cardName !== 'Shuffle card' && currCard.cardName !== 'Exploding kitten card') {
                setGameWon(true); // Set game won status if the last card is not a shuffle or exploding kitten
                dispatch(updateScore()); // Update score
            }

            // Handling different card actions
            if (currCard.cardName === 'Cat card') {
                tempDeck.pop(); // Remove cat card from the deck
                setDeck(tempDeck); // Update the deck
            } else if (currCard.cardName === 'Defuse card') {
                setDiffuseCardCount((prev) => prev + 1); // Increase defuse card count
                tempDeck.pop(); // Remove defuse card from the deck
                setDeck(tempDeck); // Update the deck
            } else if (currCard.cardName === 'Shuffle card') {
                restartGame(); // Restart the game
            } else if (currCard.cardName === 'Exploding kitten card') {
                if (diffuseCardCount > 0) {
                    setExplodeAction(true); // Set explode action flag if a defuse card is available
                } else {
                    setGameOver(true); // Set game over status if no defuse cards are left
                }
            }

            setCurrentCard(null); // Reset current card
            setCardIsShowing(false); // Reset card showing flag
        }, 2500); // Duration to show the card
    };

    // Effect to initialize the deck on component mount
    useEffect(() => {
        const tempDeck = initializeDeck(); // Initialize the deck
        setDeck(tempDeck); // Set the deck
    }, []);

    return (
        <>
            <Navbar /> {/* Rendering the Navbar component */}
            {gameWon ? (
                <div className="popup-container">
                    <div className="popup win-popup">
                        <h1 className="win-message">You Won!</h1>
                        <button onClick={restartGame} className="restart-btn">Restart</button>
                    </div>
                </div>
            ) : gameOver ? (
                <div className="popup-container">
                    <div className="popup lose-popup">
                        <h1 className="lose-message">Game Over</h1>
                        <button onClick={restartGame} className="restart-btn">Restart</button>
                    </div>
                </div>
            ) : (
                <div className="board"> {/* Main game board rendering */}
                    <div className="container">
                        <div className="card-cont"> {/* Container for card display */}
                            {deck &&
                                deck.map((card, ind) => (
                                    <div
                                        key={ind}
                                        className={`card card-${ind + 1} ${cardIsShowing && ind === deck.length - 1 ? 'flip' : ''}`}
                                    >
                                        <div className="card-front">Card {ind + 1}</div>
                                        <div className="card-back">{card.cardTitle}</div>
                                    </div>
                                ))}
                        </div>

                        {currentCard && <div className="card active-card">{currentCard.cardName}</div>} {/* Displaying current card */}

                        {!cardIsShowing && (
                            <button className="show-btn pulse" onClick={handleCardShow}>
                                Show Card
                            </button>
                        )}
                        {explodeAction && (
                            <button className="diffuse-btn bounce" onClick={handleExplodingKitten}>
                                Use Diffuse
                            </button>
                        )}
                        <h2 className="diffuse-count">Diffuse Cards Available - {diffuseCardCount}</h2> {/* Displaying available defuse cards */}
                    </div>

                    <Highscore highscore={highscore} /> {/* Rendering highscore component */}
                </div>
            )}
        </>
    );
}

export default Board; // Exporting the Board component
