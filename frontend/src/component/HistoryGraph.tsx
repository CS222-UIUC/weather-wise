import React from 'react'

import styles from './HistoryGraph.module.sass'
import { GetWeatherTypeFor, WeatherTypeToMetadata } from 'src/data/WeatherType'
import { TodayData } from 'src/data/WeatherReport'

interface MyProps {
    unit: string
    data: TodayData
}

export default class HistoryGraph extends React.Component<MyProps> {
    render() {
        const today = this.props.data
        const weatherType = GetWeatherTypeFor(today.shortForecast)
        const weatherTypeMetadata = WeatherTypeToMetadata[weatherType]
        return (
            <div className={styles.HistoryGraph}>
                <h1>Related Climate Change Data</h1>
                <img src={weatherTypeMetadata.cc_src}></img>
            </div>
        )
    }
}
