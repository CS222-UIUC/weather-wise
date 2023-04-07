import React from 'react'

import WeatherPanel from './WeatherPanel'

import './WeatherForecastCurrent.sass'

export default function WeatherForecastCurrent() {
    return (
        <WeatherPanel className="WeatherForecastCurrent">
            <div className="WeatherForecastCurrent-column">
                <div className="WeatherForecastCurrent-row">70°</div>
                <div className="WeatherForecastCurrent-row">H:74°, L:65°</div>
            </div>
            <div className="WeatherForecastCurrent-column">
                Other current weather information here
            </div>
        </WeatherPanel>
    )
}
