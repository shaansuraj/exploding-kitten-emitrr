import { useEffect } from 'react'; // Importing useEffect for side effects
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks for interacting with Redux store
import './App.css'; // Importing the main CSS file for styling
import Board from './Board'; // Importing the game board component
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Importing routing components from react-router-dom
import Login from './components/Login'; // Importing the Login component
import Signup from './components/Signup'; // Importing the Signup component
import { fetchHighscore, setUser } from './redux/slices/userSlice'; // Importing actions from userSlice

function App() {
    const dispatch = useDispatch(); // Getting the dispatch function from Redux

    // Effect to check for a user in localStorage and set it in Redux state
    useEffect(() => {
        const localStorageUser = localStorage.getItem("user"); // Retrieving user data from localStorage
        const userJson = JSON.parse(localStorageUser); // Parsing the JSON string to an object
        if (userJson) {
            dispatch(setUser(userJson)); // Dispatching action to set user in Redux state
        }
    }, [dispatch]); // Adding dispatch to dependencies to avoid linting errors

    // Effect to fetch the highscore from the server when the component mounts
    useEffect(() => {
        dispatch(fetchHighscore()); // Dispatching action to fetch high scores
    }, [dispatch]); // Adding dispatch to dependencies for proper effect management

    const user = useSelector(state => state.user.user); // Selecting the user state from Redux

    return (
        <div className="App">
            <BrowserRouter> {/* Wrapping the application with BrowserRouter for routing */}
                <Routes>
                    <Route path="/" element={!user ? <Navigate to="/signup" /> : <Board />} /> {/* Redirecting to signup if not logged in */}
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} /> {/* Redirecting to home if already logged in */}
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} /> {/* Redirecting to home if already logged in */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App; // Exporting the App component
