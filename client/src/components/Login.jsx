import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, fetchHighscore } from "../redux/slices/userSlice"; // Importing Redux actions
import { useNavigate } from "react-router-dom"; // Hook for navigation
import Notification from './notificationstyle'; // Importing the Notification component
import './loginStyle.css'; // Importing CSS styles for the Login component

/**
 * Login component for user authentication.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
function Login() {
    // State variables to manage email, password, and notification
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });
    
    const dispatch = useDispatch(); // Redux dispatch function
    const navigate = useNavigate(); // Navigation function

    /**
     * Handles the form submission for login.
     *
     * @param {Event} e - The event triggered by form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Sending POST request to login the user
        const response = await fetch(`https://soviet-arline-brandladder-b70d5ac2.koyeb.app/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Specifying content type
            },
            body: JSON.stringify({ email, password }) // Converting email and password to JSON
        });

        const json = await response.json(); // Parsing the JSON response

        // Handling successful login
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json)); // Storing user data in local storage
            dispatch(setUser(json)); // Dispatching action to set user in Redux store
            dispatch(fetchHighscore()); // Dispatching action to fetch high scores
            showNotification("Login successful!", "success"); // Display success notification
            navigate("/"); // Redirect to home after successful login
        } 
        // Handling user not existing
        else if (json.message === "User does not exist") {
            showNotification("User does not exist. Please signup.", "warning"); // Display warning notification
        } 
        // Handling incorrect credentials
        else {
            showNotification("Please check email and password", "error"); // Display error notification
        }
    };

    /**
     * Displays a notification with the specified message and type.
     *
     * @param {string} message - The notification message.
     * @param {string} type - The type of notification (success, warning, error).
     */
    const showNotification = (message, type) => {
        setNotification({ message, type, visible: true }); // Set notification state to visible
    };

    /**
     * Closes the notification when invoked.
     */
    const handleCloseNotification = () => {
        setNotification({ ...notification, visible: false }); // Hide notification
    };

    return (
        <div className='login-container'>
            <div className="login-content">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                        />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                        />
                    </div>
                    <button type="submit">Submit</button> {/* Submit button for the form */}
                </form>

                <button onClick={() => navigate("/signup")} className="secondary">Not a user? Signup</button> {/* Redirect to signup page */}
            </div>

            {/* Conditional rendering of Notification component */}
            {notification.visible && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={handleCloseNotification} // Close notification handler
                />
            )}
        </div>
    );
}

export default Login; // Exporting the Login component for use in other parts of the application
