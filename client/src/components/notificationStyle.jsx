// src/components/Notification.js

import React from 'react';
import './notificationStyle.css'; // Importing CSS styles for the Notification component

/**
 * Notification component to display messages to the user.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The notification message to display.
 * @param {string} props.type - The type of notification (e.g., success, error).
 * @param {function} props.onClose - Callback function to close the notification.
 * @returns {JSX.Element} The rendered Notification component.
 */
const Notification = ({ message, type, onClose }) => {
    return (
        <div className={`notification ${type}`}> {/* Applying dynamic class based on notification type */}
            <p>{message}</p> {/* Displaying the notification message */}
            <button onClick={onClose}>Close</button> {/* Button to close the notification */}
        </div>
    );
};

export default Notification; // Exporting the Notification component for use in other parts of the application
