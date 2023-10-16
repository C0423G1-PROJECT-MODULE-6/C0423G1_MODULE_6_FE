import logo from './logo.svg';
import './App.css';
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import {CustomerList} from "./components/customer/CustomerList";
import React from "react";
import {ShoppingHistoryList} from "./components/customer/ShoppingHistoryList";

function App() {
    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>

        </>
    );
}

export default App;
