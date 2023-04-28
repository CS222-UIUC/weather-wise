import React, { useState, useEffect } from 'react'

import styles from './Content.module.sass'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
import WeatherWarnings from './WeatherWarnings'

export default function Content() {
    const [city, setCity] = useState('chicago')
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch('/weather/' + city)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('JSON not okay')
                }
            })
            .then((data) => {
                setdata(data)
            })
    }, [city])
    const map = new Map<string, string[]>()
    for (const value in data) {
        map.set(value, data[value])
    }
    //console.log(data)
    let unit = 'no unit found'
    if (typeof map.get('unit') !== 'undefined') {
        unit =
            (map.get('unit') as string[]).length < 1
                ? 'K'
                : (map.get('unit') as string[])[0]
    }

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
                    <HistoryGraph />
                </div>
                <div className={styles.column}>
                    <WeatherForecastCurrent
                        city={city}
                        unit={unit}
                        data={map.get('today') as string[]}
                    />
                    <WeatherForecastHourly
                        data={map.get('daily') as string[]}
                    />
                    <WeatherForecastDaily
                        data={map.get('weekly') as string[]}
                    />
                </div>
            </div>
            <WeatherWarnings data={map.get('today') as string[]} />
        </div>
    )
}
