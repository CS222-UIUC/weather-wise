import React from 'react'

import './Content.css'
import WeatherWarnings from './WeatherWarnings'

export default function Content() {
    return (
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
            <WeatherWarnings />
        </div>
    )
}
