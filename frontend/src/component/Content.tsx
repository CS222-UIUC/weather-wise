import React from 'react'

import './Content.css'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherPanel from './WeatherPanel'
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
                    <WeatherPanel className="Weather-current">
                        <div className="Weather-current-column">
                            <div className="Weather-current-row">70°</div>
                            <div className="Weather-current-row">
                                H:74°, L:65°
                            </div>
                        </div>
                        <div className="Weather-current-column">
                            Other current weather information here
                        </div>
                    </WeatherPanel>
                    <WeatherPanel className="Weather-hourly">
                        Insert forecast by the hour
                    </WeatherPanel>
                    <WeatherPanel className="Weather-daily">
                        Insert forecast by the day
                    </WeatherPanel>
                </div>
            </div>
            <WeatherWarnings />
        </div>
    )
}
