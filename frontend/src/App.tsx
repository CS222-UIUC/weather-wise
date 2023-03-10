import React from 'react'
import logo from './logo.svg'
import { APP_NAME } from './constants'
import './App.css'

const CURRENT_YEAR = new Date().getFullYear()

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo"></img>
                <h1 className="App-title">{APP_NAME}</h1>
            </header>
            <div className="App-content">
                <p>Some info here</p>
            </div>
            <footer className="App-footer">
                <p>
                    ©️2023-{CURRENT_YEAR} {APP_NAME}, all rights reserved
                </p>
            </footer>
        </div>
    )
}

export default App
