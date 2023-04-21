import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastCurrent.module.sass'

export default function WeatherForecastCurrent() {
    return (
        <WeatherPanel className={styles.WeatherForecastCurrent}>
            <div className={styles.column}>
                <div className={styles.row}>70°</div>
                <div className={styles.row}>H:74°, L:65°</div>
            </div>
            <div className={styles.column}>
                Other current weather information here
            </div>
        </WeatherPanel>
    )
}
