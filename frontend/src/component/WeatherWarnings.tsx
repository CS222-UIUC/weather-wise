import React from 'react'

import styles from './WeatherWarnings.module.sass'

type MyProps = {data:string[]};

export default class WeatherWarnings extends React.Component<MyProps> {
    
    render(){
        const today = new Map<string,string>();
        for (const value in this.props.data){
            today.set(value, this.props.data[value] as string)
        }
        return (
            <div className={styles.WeatherWarnings}>
                <h1>Warnings and Advice</h1>
                <p>{today.get("detailedForecast")}</p>
            </div>
        )
    }
}
