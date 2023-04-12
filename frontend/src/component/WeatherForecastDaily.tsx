import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastDaily.module.sass'

export default function WeatherForecastDaily() {
    return (
        <WeatherPanel className={styles.WeatherForecastDaily}>
            Insert forecast by the day
        </WeatherPanel>
    )
}
