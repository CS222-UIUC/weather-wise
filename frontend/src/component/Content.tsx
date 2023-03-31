import React from 'react'

import './Content.css'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
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
                    <WeatherForecastCurrent />
                    <WeatherForecastHourly />
                    <WeatherForecastDaily />
                </div>
            </div>
            <WeatherWarnings />
        </div>
    )
}
