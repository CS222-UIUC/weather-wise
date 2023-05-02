import React, { useState, useEffect } from 'react'

import styles from './Content.module.sass'
import LocationSearch from './LocationSearch'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
import WeatherWarnings from './WeatherWarnings'
import WeatherReport from 'src/data/WeatherReport'
import { USE_LOCAL_LOCATION } from 'src/constants'
import HistoryGraph from './HistoryGraph'

function getLocalLocation(): Promise<string> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
        )
    }).then((position) => {
        return `(${position.coords.latitude},${position.coords.longitude})`
    })
}

function getPrettyCity(city: string): string {
    return city == USE_LOCAL_LOCATION ? 'your location' : city
}

export default function Content() {
    const [city, setCity] = useState(USE_LOCAL_LOCATION)
    const [status, setStatus] = useState('')
    const [report, setData] = useState<WeatherReport | null>(null)
    useEffect(() => {
        new Promise((resolve, reject) => {
            setStatus('Loading...')
            if (city != USE_LOCAL_LOCATION) {
                return resolve(city)
            }

            getLocalLocation()
                .then(resolve)
                .catch((error) => {
                    setStatus('Permissions for local location denied')
                    reject(error)
                })
        })
            .then((location) => fetch('/weather/' + location))
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    if (res.status == 404) {
                        setStatus(
                            `Couldn't find weather information for: ${getPrettyCity(
                                city
                            )}`
                        )
                    } else {
                        setStatus(
                            `Failed to get weather information for: ${getPrettyCity(
                                city
                            )}`
                        )
                    }
                    return null
                }
            })
            .then((data) => {
                if (data) {
                    setStatus(`Showing weather for: ${getPrettyCity(city)}`)
                }
                setData(data)
            })
            .catch(() => setData(null))
    }, [city])

    return (
        <div className={styles.Content}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <LocationSearch
                        city={city}
                        status={status}
                        onSubmit={(param: string) => {
                            setCity(param)
                            return param
                        }}
                    />
                    {report && (
                        <>
                            <WeatherWarnings data={report.today} />
                            <HistoryGraph
                                unit={report.unit}
                                data={report.today}
                            />
                        </>
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
