import React from 'react'

import WeatherPanel from './WeatherPanel'

import styles from './WeatherForecastHourly.module.sass'

export default function WeatherForecastHourly() {
    return (
        <WeatherPanel className={styles.WeatherForecastHourly}>
            Insert forecast by the hour
        </WeatherPanel>
    )
}
