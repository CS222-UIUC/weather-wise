import React from 'react'

import './Content.sass'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
import WeatherWarnings from './WeatherWarnings'

export default function Content() {
    return (
        <div className="Content">
            <div className="Content-columns">
                <div className="Content-column">
                    <LocationSearch />
                    <HistoryGraph />
                </div>
                <div className="Content-column">
                    <WeatherForecastCurrent />
                    <WeatherForecastHourly />
                    <WeatherForecastDaily />
                </div>
            </div>
            <WeatherWarnings />
        </div>
    )
}
