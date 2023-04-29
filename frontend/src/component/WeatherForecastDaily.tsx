import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastDaily.module.sass'
import { DayForecast } from 'src/data/WeatherReport'
import { GetImageSrcFor } from 'src/data/WeatherType'

type MyProps = {
    unit: string
    forecast: Array<DayForecast>
}

const DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]

function formatDay(day: string) {
    if (!DAYS.includes(day.toLowerCase())) {
        day = DAYS[new Date().getDay()]
    }

    return day.toUpperCase().substring(0, 3)
}

export default class WeatherForecastDaily extends React.Component<MyProps> {
    render() {
        return (
            <WeatherPanel className={styles.WeatherForecastDaily}>
                {this.props.forecast.map((dayForecast, i) => (
                    <div key={i}>
                        <p>{formatDay(dayForecast.day)}</p>
                        <p>
                            {dayForecast.high}°{' / '}
                            {dayForecast.low}°
                        </p>
                        <img
                            src={GetImageSrcFor(dayForecast.shortForecast)}
                        ></img>
                    </div>
                ))}
            </WeatherPanel>
        )
    }
}
