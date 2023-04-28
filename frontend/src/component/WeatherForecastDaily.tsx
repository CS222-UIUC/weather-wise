import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastDaily.module.sass'

type MyProps = { data: string[] }

export default class WeatherForecastDaily extends React.Component<MyProps> {
    getFormattedString(forecast: Map<string, Map<string, string>>) {
        let to_return = ''
        for (let i = 0; i < 7; i++) {
            to_return +=
                forecast.get(i.toString())?.get('day') +
                ': H:' +
                forecast.get(i.toString())?.get('high') +
                '° L:' +
                forecast.get(i.toString())?.get('low') +
                '\n'
        }
        return to_return
    }

    render() {
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

        return (
            <WeatherPanel className={styles.WeatherForecastDaily}>
                {this.getFormattedString(forecast)}
            </WeatherPanel>
        )
    }
}
