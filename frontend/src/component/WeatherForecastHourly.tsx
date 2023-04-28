import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastHourly.module.sass'
import { HourForecast } from 'src/data/WeatherReport'

type MyProps = {
    unit: string
    forecast: Array<HourForecast>
}

function convertHour(hour: number) {
    if (hour == 0) {
        return '12 AM'
    }
    if (hour == 12) {
        return '12 PM'
    }
    if (hour < 12) {
        return `${hour} AM`
    }

    return `${hour - 12} PM`
}

export default class WeatherForecastHourly extends React.Component<MyProps> {
    render() {
        return (
            <WeatherPanel className={styles.WeatherForecastHourly}>
                {this.props.forecast.map((hourForecast, i) => (
                    <div key={i}>
                        <p>{convertHour(hourForecast.hour)}</p>
                        <p>
                            {hourForecast.temperature}°{this.props.unit}
                        </p>
                    </div>
                ))}
            </WeatherPanel>
        )
    }
}
