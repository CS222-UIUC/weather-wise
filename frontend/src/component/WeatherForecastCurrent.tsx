import React, {useState, useEffect} from 'react'

import WeatherPanel from './WeatherPanel'

import './WeatherForecastCurrent.css'

export default function WeatherForecastCurrent() {
    const [data, setdata] = useState([{}])
    useEffect( () => {
        fetch("/welcome").then(
            res => res.json()
            .then(
                data => {
                    setdata(data.welcome)
                    console.log(data)
                }
            )
        )
    }, [])
    console.log(typeof(data))
    return (
        <WeatherPanel className="WeatherForecastCurrent">
            <div className="WeatherForecastCurrent-column">
                <div className="WeatherForecastCurrent-row">70°</div>
                <div className="WeatherForecastCurrent-row">H:74°, L:65°</div>
            </div>
            <div className="WeatherForecastCurrent-column">
                {typeof(data) !== 'string' ? (
                    <p>Loading...</p>
                ) : (
                    <p>{data}</p>
                )}
            </div>
        </WeatherPanel>
    )
}
