import React, {useState, useEffect} from 'react'

import styles from './Content.module.sass'
import LocationSearch from './LocationSearch'
import HistoryGraph from './HistoryGraph'
import WeatherForecastCurrent from './WeatherForecastCurrent'
import WeatherForecastHourly from './WeatherForecastHourly'
import WeatherForecastDaily from './WeatherForecastDaily'
import WeatherWarnings from './WeatherWarnings'

export default function Content() {
    const [data, setdata] = useState([])
    useEffect( () => {
        fetch("/chicago").then(
            res => {
                if (res.ok){
                    return res.json()
                }
                else{
                    console.log("uh oh")
                }
            }).then(
                data => {
                    setdata(data)
                    //this.data.current_temp = data.current
                    console.log(data.current)
                }
            )
    },[])
    const map = new Map<string, string>();
    for (const value in data) {
    map.set(value, data[value]);
    }
    console.log(data)
    return (
        <div className={styles.Content}  onClick={() => {console.log(map.get("today")); setData()}}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <LocationSearch />
                    <HistoryGraph />
                </div>
                <div className={styles.column}>
                    <WeatherForecastCurrent city={'chicago'} current_temp={map.get("current") as string}/>
                    <WeatherForecastHourly />
                    <WeatherForecastDaily />
                </div>
            </div>
            <WeatherWarnings />
        </div>
    )
}

function setData(){
    console.log("hgere")
}