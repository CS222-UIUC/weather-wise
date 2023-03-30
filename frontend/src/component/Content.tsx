import React from 'react'

import './Content.css'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherWarnings from './WeatherWarnings'

export default function Content() {
    return (
        <div className="App-content">
            <div className="App-columns">
                <div className="App-column">
                    <LocationSearch />
                    <HistoryGraph />
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
