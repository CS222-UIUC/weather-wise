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
type MyObj = {
    current_temp: number
    high: number
    low: number
    current_weather: string
}
class CurrentWeather {
    data: MyObj
    
    constructor()   {
        this.data = JSON.parse('{}');
        //call api, possibly pass in?
        

       
        console.log(this.data.current_temp)
        this.data.current_weather = "snowy"
        
        
    }

    getImage()  {
        if (this.data.current_weather === "cloudy")
            return (<img src={CLOUDY}></img>)
        if (this.data.current_weather === "partly_cloudy")
            return (<img src={PARTLY_CLOUDY}></img>)
        if (this.data.current_weather === "rainy")
            return (<img src={RAINY}></img>)
        if (this.data.current_weather === "snowy")
            return (<img src={SNOWY}></img>)
        if (this.data.current_weather === "stormy")
            return (<img src={STORMY}></img>)
        if (this.data.current_weather === "sunny")
            return (<img src={SUNNY}></img>)
    }
    getCurrent()    {
        console.log(this.data.current_temp)
        return this.data.current_temp
    }
    getHigh(){
        return this.data.high
    }
    getLow()    {
        return this.data.low
    }
    
    
}
//, high: string, low: string, weather: string
type MyProps = {city: string, current_temp: string};
type MyState = { current_temp: number };
export default class WFC extends React.Component<MyProps,MyState>{
    state: MyState = {
        current_temp: 100
    }
    /*constructor(props: any){
        super(props)
        this.setState({current_temp: 0})
    }*/
    
    render() {
        const temp: MyObj = {current_temp: 0, high: 0, low: 0, current_weather: "sunny"}
    /*const [data, setdata] = useState([{}])
        useEffect( () => {
            fetch("/chicago").then(
                res => res.json()
                .then(
                    data => {
                        setdata(data)
                        temp.current_temp = data.current
                        //this.data.current_temp = data.current
                        console.log(temp.current_temp)
                    }
                )
            )
        }, [])
        
        console.log(data)*/
    const weather = new CurrentWeather()
        
        return(
        <div className={styles.WeatherForecastCurrent}>
            <div className={styles.column}>
                
                <div className={styles.row}>{this.props.current_temp}°</div>
                
                <div className={styles.row}>H:{temp.high}°, L:{temp.low}°</div>
            </div>
            <div className={icons.WeatherIcon}>
                {weather.getImage()}
            </div>
        <div className={styles.WeatherForecastCurrent}>
            <div className={styles.column}>
                Other current weather information here
                {this.props.city}
            </div>
        </div>
        </div>)
    }
}
/*export default function WeatherForecastCurrent() {
    
    return (
        <WFC city>

        </WFC>
    )
}*/
