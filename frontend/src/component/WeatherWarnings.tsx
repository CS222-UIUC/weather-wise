import React from 'react'

import styles from './WeatherWarnings.module.sass'

export default function WeatherWarnings() {
    return (
        <div className={styles.WeatherWarnings}>
            <h1>Warnings and Advice</h1>
            <p>This is a great warning</p>
            <p>This is a great advice</p>
        </div>
    )
}
