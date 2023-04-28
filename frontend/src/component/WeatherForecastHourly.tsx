import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastHourly.module.sass'

type MyProps = { data: string[] }

export default class WeatherForecastHourly extends React.Component<MyProps> {
    getFormattedString(forecast: Map<string, Map<string, string>>) {
        let to_return = ''
        for (let i = 0; i < 24; i++) {
            to_return +=
                forecast.get(i.toString())?.get('hour') +
                ': ' +
                forecast.get(i.toString())?.get('temperature') +
                '°  '
        }
        return to_return
    }
    render() {
        // console.log(forecastJSON.hour)
        const forecast = new Map<string, Map<string, string>>()
        let i = 0
        for (const value in this.props.data) {
            const details = new Map<string, string>()
            const arr = this.props.data[value] as any
            for (const value2 in arr) {
                details.set(value2, arr[value2])
            }
            forecast.set(i.toString(), details)
            i++
        }
        //console.log(forecast)
        return (
            <WeatherPanel className={styles.WeatherForecastHourly}>
                {this.getFormattedString(forecast)}
            </WeatherPanel>
        )
    }
}
