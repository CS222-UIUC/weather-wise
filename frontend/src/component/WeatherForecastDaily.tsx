import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastDaily.module.sass'
import { DayForecast } from 'src/data/WeatherReport'

type MyProps = {
    unit: string
    forecast: Array<DayForecast>
}

export default class WeatherForecastDaily extends React.Component<MyProps> {
    getFormattedString() {
        let to_return = ''
        for (const dayForecast of this.props.forecast) {
            to_return += `${dayForecast.day}: ${dayForecast.high}°${this.props.unit} / ${dayForecast.low}°${this.props.unit}`
        }
        return to_return
    }

    render() {
        return (
            <WeatherPanel className={styles.WeatherForecastDaily}>
                {this.props.forecast.map((dayForecast, i) => (
                    <p key={i}>
                        {dayForecast.day}: {dayForecast.high}°{this.props.unit}
                        {' / '}
                        {dayForecast.low}°{this.props.unit} |{' '}
                        {dayForecast.shortForecast}
                    </p>
                ))}
            </WeatherPanel>
        )
    }
}
