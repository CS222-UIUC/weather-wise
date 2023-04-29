import React from 'react'

import styles from './WeatherWarnings.module.sass'

type MyProps = { forecast: string }

export default class WeatherWarnings extends React.Component<MyProps> {
    render() {
        let formattedForecast = this.props.forecast
            .trim()
            .replaceAll('..', '.')
            .replaceAll('..', '.')

        if (formattedForecast.endsWith('.')) {
            formattedForecast = formattedForecast.substring(
                0,
                formattedForecast.length - 1
            )
        }

        return (
            <div className={styles.WeatherWarnings}>
                <h1>Warnings and Advice</h1>
                <ul>
                    {formattedForecast.split('. ').map((warning, i) => (
                        <li key={i}>{warning}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
