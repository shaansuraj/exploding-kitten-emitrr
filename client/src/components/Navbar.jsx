import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice'; // Importing the logout action from Redux slice
import Modal from 'react-modal'; // Importing the Modal component for displaying game rules
import './Navbar.css'; // Importing CSS styles for the Navbar

// Setting the root element for the modal to improve accessibility
Modal.setAppElement('#root');

// Custom styles for the modal
const customStyles = {
    content: {
        top: '50%', // Center the modal vertically
        left: '50%', // Center the modal horizontally
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)', // Adjust position based on its width and height
        width: '90%', // Modal width
        padding: '40px 20px', // Padding inside the modal
        borderRadius: '10px', // Rounded corners
        background: '#fff', // Modal background color
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Shadow effect for the modal
    },
};

/**
 * Navbar component for user navigation and actions.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar() {
    const userVal = useSelector((state) => state.user.user); // Accessing the user information from Redux store
    const dispatch = useDispatch(); // Redux dispatch function
    const navigate = useNavigate(); // Navigation function

    /**
     * Handles user logout, clearing local storage and redirecting to login page.
     */
    const handleLogout = () => {
        localStorage.setItem('user', null); // Clearing user data from local storage
        dispatch(logoutUser()); // Dispatching action to log out the user
        navigate('/login'); // Redirecting to the login page
    };

    const [modalIsOpen, setIsOpen] = React.useState(false); // State to manage modal visibility

    /**
     * Opens the modal when invoked.
     */
    function openModal() {
        setIsOpen(true); // Set modal visibility to true
    }

    /**
     * Closes the modal when invoked.
     */
    function closeModal() {
        setIsOpen(false); // Set modal visibility to false
    }

    return (
        <div className='navbar'>
            <h3 className='navbar-title'>{userVal.email}</h3> {/* Displaying the user's email */}
            <div className='navbar-links'>
                {/* Link to open the rules modal */}
                <a onClick={openModal} href="#" className='navbar-link'>Rules</a>
                <Modal
                    isOpen={modalIsOpen} // Control modal visibility
                    onRequestClose={closeModal} // Function to close the modal
                    style={customStyles} // Applying custom styles to the modal
                    contentLabel="Game Rules" // Accessibility label for the modal
                >
                    <div className='modal-content'>
                        <button onClick={closeModal} className='close-modal-btn'>Close</button> {/* Button to close the modal */}
                        <h2>Rules</h2> {/* Modal heading */}
                        <p>- If the card drawn from the deck is a cat card, it is removed from the deck.</p>
                        <p>- If the card is an exploding kitten, the player loses the game.</p>
                        <p>- If the card is a defusing card, it is removed from the deck. This card can be used to defuse a bomb in subsequent draws.</p>
                        <p>- If the card is a shuffle card, the game restarts, and the deck is filled with 5 cards again.</p>
                    </div>
                </Modal>
                <button className='logout-btn' onClick={handleLogout}>Logout</button> {/* Logout button */}
            </div>
        </div>
    );
}

export default Navbar; // Exporting the Navbar component for use in other parts of the application
