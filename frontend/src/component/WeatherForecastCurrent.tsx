import React from 'react'

import WeatherPanel from './WeatherPanel'
import styles from './WeatherForecastCurrent.module.sass'
import { TodayData } from 'src/data/WeatherReport'
import { GetWeatherTypeFor, WeatherTypeToMetadata } from 'src/data/WeatherType'

//, high: string, low: string, weather: string
interface MyProps {
    unit: string
    data: TodayData
}

type MyState = {
    current_temp: number
}

export default class WeatherForecastCurrent extends React.Component<
    MyProps,
    MyState
> {
    render() {
        const today = this.props.data
        const weatherType = GetWeatherTypeFor(today.shortForecast)
        const weatherTypeMetadata = WeatherTypeToMetadata[weatherType]
        return (
            <div className={styles.WeatherForecastCurrent}>
                <div>
                    <div className={styles.column}>
                        <div className={styles.row + ' ' + styles.current}>
                            {today.current}°
                        </div>
                        <div className={styles.row + ' ' + styles.highLow}>
                            {Math.max(today.high, today.current)}° /{' '}
                            {Math.min(today.low, today.current)}°
                        </div>
                    </div>
                    <div className={styles.icon}>
                        <img src={weatherTypeMetadata.src}></img>
                    </div>
                </div>
                <p className={styles.notice}>
                    All temperatures are measured in °{this.props.unit}
                </p>
            </div>
        )
    }
}
