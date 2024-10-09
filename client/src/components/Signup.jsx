import React, { useState } from 'react'; // Importing React and useState hook
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from Redux
import { setUser, fetchHighscore } from "../redux/slices/userSlice"; // Importing actions from userSlice
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing
import Notification from './notificationstyle'; // Importing the Notification component
import './signupStyle.css'; // Importing the signup styles

/**
 * Signup component for user registration.
 *
 * @returns {JSX.Element} The rendered Signup component.
 */
function Signup() {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [notification, setNotification] = useState({ message: '', type: '', visible: false }); // State for notification
    const dispatch = useDispatch(); // Redux dispatch function
    const navigate = useNavigate(); // Navigation function

    /**
     * Validates the email format using a regular expression.
     *
     * @param {string} email - The email to validate.
     * @returns {boolean} True if the email is valid, otherwise false.
     */
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for email validation
        return regex.test(email); // Testing the email against the regex
    };

    /**
     * Handles the form submission for user signup.
     *
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior

        // Validate the email format before proceeding
        if (!validateEmail(email)) {
            setNotification({ message: "Invalid email format!", type: 'error', visible: true });
            return; // Exit if the email is invalid
        }

        // Making a POST request to the signup endpoint
        const response = await fetch(`https://soviet-arline-brandladder-b70d5ac2.koyeb.app/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Setting content type to JSON
            },
            body: JSON.stringify({ email, password }) // Sending email and password in the request body
        });

        const json = await response.json(); // Parsing the response JSON

        // Handling response based on the status
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json)); // Storing user data in local storage
            dispatch(setUser(json)); // Dispatching action to set the user in Redux store
            dispatch(fetchHighscore()); // Dispatching action to fetch high scores
            setNotification({ message: "Signup successful!", type: 'success', visible: true });
            navigate("/"); // Redirecting to home after successful signup
        } else if (json.message === "User already exists") {
            setNotification({ message: "User already exists. Please login.", type: 'warn', visible: true });
        } else {
            setNotification({ message: "Signup failed!", type: 'error', visible: true });
        }
    };

    /**
     * Closes the notification when invoked.
     */
    const closeNotification = () => {
        setNotification({ ...notification, visible: false }); // Setting notification visibility to false
    };

    return (
        <div className='signup-container'>
            <Notification 
                message={notification.visible ? notification.message : ''} // Displaying notification message if visible
                type={notification.type} // Setting notification type for styling
                onClose={closeNotification} // Callback to close the notification
            />
            <div className="signup-content">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}> {/* Form for user signup */}
                    <div>
                        <label>Email:</label>
                        <input
                            type="text" // Input type for email
                            value={email} // Binding email state to input
                            onChange={(e) => setEmail(e.target.value)} // Updating email state on change
                        />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password" // Input type for password
                            value={password} // Binding password state to input
                            onChange={(e) => setPassword(e.target.value)} // Updating password state on change
                        />
                    </div>
                    <button type="submit">Submit</button> {/* Submit button */}
                </form>

                <button onClick={() => navigate("/login")} className="secondary">Already a user? Login</button> {/* Button to navigate to login */}
            </div>
        </div>
    );
}

export default Signup; // Exporting the Signup component for use in other parts of the application
