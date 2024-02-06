import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  BrowserRouter,
} from "react-router-dom";

// Page
import App from './App';


// Application Root
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>    
  // </React.StrictMode>
)
