import React from 'react'

import styles from './WeatherWarnings.module.sass'
import { GetAdvice } from 'src/data/WeatherType'
import { TodayData } from 'src/data/WeatherReport'

type MyProps = { forecast: string, data: TodayData}

export default class WeatherWarnings extends React.Component<MyProps> {
    render() {
        let formattedForecast = this.props.forecast
            .trim()
            .replaceAll('..', '.')
            .replaceAll('..', '.')

        if (formattedForecast.endsWith('.')) {
            formattedForecast = formattedForecast.substring(
                0,
                formattedForecast.length - 1
            )
        }
        const today = this.props.data
        const advice = GetAdvice(today.shortForecast)
        const temperature = today.current
        let temp_advice = ''
        if (temperature <= 0)  {
            temp_advice = 'Be careful, it\'s really cold out! Make sure to wear lots of layers!'
        }
        else if (temperature <= 40) {
            temp_advice = 'It\'s a bit chilly out, bring your coat!' 
        }
        else if (temperature <= 60) {
            temp_advice = 'Consider bringing a light jacket'
        }
        else if (temperature <= 80) {
            temp_advice = 'Enjoy the nice weather, no need for a coat today!'
        }
        else if (temperature <= 100) {
            temp_advice = 'It\'s hot out! Make sure to drink lots of water!'
        }
        else if (temperature > 100) {
            temp_advice = 'Be careful of the high temperatures! Consider staying indoors and be sure to stay hydrated!'
        }
        return (
            <div className={styles.WeatherWarnings}>
                <h1>Warnings and Advice</h1>
                <ul>
                    {formattedForecast.split('. ').map((warning, i) => (
                        <li key={i}>{warning}</li>
                    ))}
                </ul>
                {advice!== null && advice !== '' &&
                <ul>
                    <li>
                    {advice} 
                    </li>
                </ul>
                }
                {temp_advice!== null && temp_advice !== '' &&
                <ul>
                    <li>
                    {temp_advice} 
                    </li>
                </ul>
                }
                
            </div>
        )
    }
}
