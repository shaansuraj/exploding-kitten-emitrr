import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Importing necessary functions from Redux Toolkit

// Initial state for the user slice
const initialState = {
    user: null, // Holds user information (null if not logged in)
    highscores: [], // Array to store user high scores
    isScoreUpdated: true // Flag to indicate if the score has been updated
};

// Async thunk to fetch high scores from the server
export const fetchHighscore = createAsyncThunk('fetchHighscore', async (_, { getState }) => {
    const { user } = getState().user; // Accessing user state from Redux store

    // Making a GET request to fetch highest scores
    const response = await fetch('https://soviet-arline-brandladder-b70d5ac2.koyeb.app/users/highest', {
        headers: {
            'Authorization': `Bearer ${user.token}` // Including authorization token in the request header
        }
    });

    return response.json(); // Returning the parsed JSON response
});

// Async thunk to update the user's score on the server
export const updateScore = createAsyncThunk('updatescore', async (_, { getState }) => {
    const { user } = getState().user; // Accessing user state from Redux store

    // Making a POST request to update the user's score
    const response = await fetch('https://soviet-arline-brandladder-b70d5ac2.koyeb.app/users/updatescore', {
        headers: {
            'Authorization': `Bearer ${user.token}` // Including authorization token in the request header
        }
    });

    // It's recommended to return the response for further processing if needed
    return response.json(); // Returning the parsed JSON response (optional)
});

// Creating the user slice
export const userSlice = createSlice({
    name: 'user', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Updating user state with the payload
        },
        logoutUser: (state) => {
            state.user = null; // Setting user state to null on logout
        }
    },
    extraReducers: (builder) => {
        // Handling fulfilled state of fetchHighscore
        builder.addCase(fetchHighscore.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.highscores = action.payload; // Updating highscores with fetched data
        });

        // Handling rejected state of fetchHighscore
        builder.addCase(fetchHighscore.rejected, (state, action) => {
            // state.isLoading = false; 
            
            // state.error = action.error.message; 
        });

        // Handling fulfilled state of updateScore
        builder.addCase(updateScore.fulfilled, (state, action) => {
            state.isScoreUpdated = true; // Indicating that the score has been updated
           
        });
    }
});

// Exporting actions for use in components
export const { setUser, logoutUser } = userSlice.actions;

// Exporting the reducer for use in the store
export default userSlice.reducer;
