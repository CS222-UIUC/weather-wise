import React from 'react'

import styles from './Content.module.sass'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
import WeatherWarnings from './WeatherWarnings'

export default function Content() {
    return (
        <div className={styles.Content}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <LocationSearch />
                    <HistoryGraph />
                </div>
                <div className={styles.column}>
                    <WeatherForecastCurrent />
                    <WeatherForecastHourly />
                    <WeatherForecastDaily />
                </div>
            </div>
            <WeatherWarnings />
        </div>
    )
}
