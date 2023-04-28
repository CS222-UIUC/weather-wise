import React from 'react'

import styles from './WeatherWarnings.module.sass'

type MyProps = { forecast?: string }

export default class WeatherWarnings extends React.Component<MyProps> {
    render() {
        return (
            <div className={styles.WeatherWarnings}>
                <h1>Warnings and Advice</h1>
                <ul>
                    {this.props.forecast &&
                        this.props.forecast
                            .trim()
                            .split('. ')
                            .map((warning, i) => <li key={i}>{warning}.</li>)}
                </ul>
            </div>
        )
    }
}
