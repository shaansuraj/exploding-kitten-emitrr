import React from 'react';
import './Highscore.css'; // Importing the CSS styles for the Highscore component

/**
 * Highscore component that displays the top 10 high scores of users.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.highscore - An array of user objects containing email and score.
 * @returns {JSX.Element} The rendered Highscore component.
 */
function Highscore({ highscore }) {
    /**
     * Extracts the username from the user's email address.
     *
     * @param {string} email - The user's email address.
     * @returns {string} The extracted username.
     */
    function extractNameFromEmail(email) {
        const atIndex = email.indexOf('@'); // Find the index of the '@' symbol
        return email.substring(0, atIndex); // Return the substring before the '@'
    }

    return (
        <div className="highscore-cont">
            {/* Highscore title */}
            <h1 className="highscore-title" style={{ fontSize: '2rem', color: 'black', fontWeight: 'bold' }}>
                Highscores (Top 10)
            </h1>
            <div className="highscore-list">
                {/* Check if highscore exists and render the top 10 scores */}
                {highscore && highscore.slice(0, 10).map((user, index) => (
                    <div key={index} className="highscore-item">
                        {/* Display the username and score for each user */}
                        <span className="username">{extractNameFromEmail(user.email)}</span>
                        <span className="score">{user.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Highscore; // Exporting the Highscore component for use in other parts of the application
