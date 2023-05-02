import React from 'react'

import styles from './WeatherWarnings.module.sass'
import { GetWeatherTypeFor, WeatherTypeToMetadata } from 'src/data/WeatherType'
import { TodayData } from 'src/data/WeatherReport'
import TemperatureAdvice from 'src/data/TemperatureAdvice'

type MyProps = {
    data: TodayData
}

export default class WeatherWarnings extends React.Component<MyProps> {
    render() {
        const today = this.props.data
        let formattedForecast = today.detailedForecast
            .trim()
            .replaceAll('..', '.')
            .replaceAll('..', '.')

        if (formattedForecast.endsWith('.')) {
            formattedForecast = formattedForecast.substring(
                0,
                formattedForecast.length - 1
            )
        }
        const weatherType = GetWeatherTypeFor(today.shortForecast)
        const weatherTypeMetadata = WeatherTypeToMetadata[weatherType]
        const advice = weatherTypeMetadata.advice
        const temperatureAdvice = TemperatureAdvice(today.current)

        return (
            <div className={styles.WeatherWarnings}>
                <h1>Warnings and Advice</h1>
                <ul>
                    {formattedForecast.split('. ').map((warning, i) => (
                        <li key={i}>{warning}</li>
                    ))}
                    {advice && <li>{advice}</li>}
                    {temperatureAdvice && <li>{temperatureAdvice}</li>}
                </ul>
            </div>
        )
    }
}
