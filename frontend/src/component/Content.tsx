import React, { useState, useEffect } from 'react'

import styles from './Content.module.sass'
import LocationSearch from './LocationSearch'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
import WeatherWarnings from './WeatherWarnings'
import WeatherReport from 'src/data/WeatherReport'

export default function Content() {
    const [city, setCity] = useState('chicago')
    const [report, setData] = useState<WeatherReport | null>(null)
    useEffect(() => {
        fetch('/weather/' + city)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return null
                }
            })
            .then((data) => {
                setData(data)
            })
    }, [city])

    return (
        <div className={styles.Content}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <LocationSearch
                        city={city}
                        onSubmit={(param: string) => {
                            setCity(param)
                            return param
                        }}
                    />
                    {report && (
                        <WeatherWarnings
                            forecast={report.today.detailedForecast}
                        />
                    )}
                </div>
                <div className={styles.column}>
                    {report && (
                        <>
                            <WeatherForecastCurrent
                                unit={report.unit}
                                data={report.today}
                            />
                            <WeatherForecastHourly
                                unit={report.unit}
                                forecast={report.daily}
                            />
                            <WeatherForecastDaily
                                unit={report.unit}
                                forecast={report.weekly}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
