import React from 'react'; // Importing React library
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import App from './App'; // Importing the main App component
import './index.css'; // Importing global styles
import { store } from "./redux/store"; // Importing the Redux store
import { Provider } from 'react-redux'; // Importing Provider from React Redux to connect the store

// Creating a root element to render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Enabling StrictMode for highlighting potential problems */}
    <Provider store={store}> {/* Providing the Redux store to the app */}
      <App /> {/* Rendering the main App component */}
    </Provider>
  </React.StrictMode>,
);
