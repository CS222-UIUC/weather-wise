import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastDaily.module.sass'
import { DayForecast } from 'src/data/WeatherReport'

type MyProps = {
    unit: string
    forecast: Array<DayForecast>
}

export default class WeatherForecastDaily extends React.Component<MyProps> {
    render() {
        return (
            <WeatherPanel className={styles.WeatherForecastDaily}>
                {this.props.forecast.map((dayForecast, i) => (
                    <p key={i}>
                        {dayForecast.day}: {dayForecast.high}°{' / '}
                        {dayForecast.low}° | {dayForecast.shortForecast}
                    </p>
                ))}
            </WeatherPanel>
        )
    }
}
