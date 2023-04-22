import React, {useState, useEffect} from 'react'

import WeatherPanel from './WeatherPanel'
import icons from './WeatherIcon.module.sass'
import styles from './WeatherForecastCurrent.module.sass'

const CLOUDY = "images/cloudy.png"
const PARTLY_CLOUDY = "images/partly_cloudy.png"
const RAINY = "images/rainy.png"
const SNOWY = "images/snowy.png"
const STORMY = "images/stormy.png"
const SUNNY = "images/sunny.png"
class CurrentWeather {
    current_temp: number
    high: number
    low: number
    current_weather: string
    constructor()   {
        //call api, possibly pass in?
        this.current_temp = 10000
        this.high = 78
        this.low = 68
        this.current_weather = "snowy"
    }

    getImage()  {
        if (this.current_weather === "cloudy")
            return (<img src={CLOUDY}></img>)
        if (this.current_weather === "partly_cloudy")
            return (<img src={PARTLY_CLOUDY}></img>)
        if (this.current_weather === "rainy")
            return (<img src={RAINY}></img>)
        if (this.current_weather === "snowy")
            return (<img src={SNOWY}></img>)
        if (this.current_weather === "stormy")
            return (<img src={STORMY}></img>)
        if (this.current_weather === "sunny")
            return (<img src={SUNNY}></img>)
    }
    getCurrent()    {
        return this.current_temp
    }
    getHigh(){
        return this.high
    }
    getLow()    {
        return this.low
    }
    
    
}

import styles from './WeatherForecastCurrent.module.sass'

export default function WeatherForecastCurrent() {
    const [data, setdata] = useState([{}])
    useEffect( () => {
        fetch("/welcome").then(
            res => res.json()
            .then(
                data => {
                    setdata(data.welcome)
                    console.log(data)
                }
            )
        )
    }, [])
    console.log(typeof(data))
    const weather = new CurrentWeather()
    return (
        <WeatherPanel className={styles.WeatherForecastCurrent}>
            <div className={styles.column}>
                <div className={styles.row}>{weather.getCurrent()}°</div>
                <div className={styles.row}>H:{weather.getHigh()}°, L:{weather.getLow()}°</div>
            </div>
            <div className={icons.WeatherIcon}>
                {weather.getImage()}
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
