import React from 'react'
import logo from '../svgs/logo.svg'
import { APP_NAME } from '../constants'
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
                <div className="App-columns">
                    <div className="App-column">
                        <input
                            className="Weather-search"
                            placeholder="Search for weather at..."
                        ></input>
                        <div className="Weather-graphs">
                            <h1>Graph Title</h1>
                            <p>In theory, a graph. Instead, some cats.</p>
                            <img src="res/cats.jpg"></img>
                        </div>
                    </div>
                    <div className="App-column">
                        <div className="Weather-current Weather-forecast-panel">
                            <div className="Weather-current-column">
                                <div className="Weather-current-row">70°</div>
                                <div className="Weather-current-row">
                                    H:74°, L:65°
                                </div>
                            </div>
                            <div className="Weather-current-column">
                                Other current weather information here
                            </div>
                        </div>
                        <div className="Weather-hourly Weather-forecast-panel">
                            Insert forecast by the hour
                        </div>
                        <div className="Weather-daily Weather-forecast-panel">
                            Insert forecast by the day
                        </div>
                    </div>
                </div>
                <div className="Weather-warnings">
                    <h1>Warnings and Advice</h1>
                    <p>This is a great warning</p>
                    <p>This is a great advice</p>
                </div>
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
