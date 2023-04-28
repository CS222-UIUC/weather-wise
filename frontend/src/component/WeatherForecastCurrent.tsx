import React, {useState, useEffect} from 'react'

import WeatherPanel from './WeatherPanel'
import icons from './WeatherIcon.module.sass'
import styles from './WeatherForecastCurrent.module.sass'
import { NULL } from 'sass'

const CLOUDY = "images/cloudy.png"
const PARTLY_CLOUDY = "images/partly_cloudy.png"
const RAINY = "images/rainy.png"
const SNOWY = "images/snowy.png"
const STORMY = "images/stormy.png"
const SUNNY = "images/sunny.png"
//, high: string, low: string, weather: string
type MyProps = {city: string, unit: string, data:string[]};
type MyState = { current_temp: number };
export default class WFC extends React.Component<MyProps,MyState>{    
    getImage(current_weather: string)  {
        if (current_weather === "cloudy")
            return (<img src={CLOUDY}></img>)
        if (current_weather === "partly_cloudy")
            return (<img src={PARTLY_CLOUDY}></img>)
        if (current_weather === "rainy")
            return (<img src={RAINY}></img>)
        if (current_weather === "snowy")
            return (<img src={SNOWY}></img>)
        if (current_weather === "stormy")
            return (<img src={STORMY}></img>)
        if (current_weather === "sunny")
            return (<img src={SUNNY}></img>)
    }
    render() {
        const today = new Map<string,string>();
        for (const value in this.props.data){
            today.set(value, this.props.data[value] as string)
        }
        return(
        <div className={styles.WeatherForecastCurrent}>
            <div className={styles.column}>
                <div className={styles.row}>{today.get("current")}°{this.props.unit}</div>
                <div className={styles.row}>H:{today.get("high")}°, L:{today.get("low")}°</div>
            </div>
            <div className={icons.WeatherIcon}>
                {this.getImage("snowy")}
            </div>
        <div className={styles.WeatherForecastCurrent}>
            <div className={styles.column}>
                {today.get("shortForecast")}
            </div>
        </div>
        </div>)
    }
}