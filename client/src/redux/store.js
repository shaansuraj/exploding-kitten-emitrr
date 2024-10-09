import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore from Redux Toolkit
import userReducer from './slices/userSlice'; // Importing the user reducer to manage user-related state

// Configuring the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer // Adding the user reducer to the store under the 'user' key
    },
    
});


