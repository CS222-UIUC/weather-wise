import React from 'react'
import { USE_LOCAL_LOCATION } from 'src/constants'

import styles from './LocationSearch.module.sass'
type MyProps = { city: string; onSubmit: (params: string) => string }
export default class LocationSearch extends React.Component<MyProps> {
    render() {
        const city = this.props.city
        return (
            <div className={styles.LocationSearch}>
                <input
                    placeholder='Search for weather at...'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.props.onSubmit(e.currentTarget.value)
                            e.currentTarget.value = ''
                        }
                    }}
                ></input>
                <div>
                    <p>
                        Showing weather for:{' '}
                        {city == USE_LOCAL_LOCATION ? 'your location' : city}
                    </p>
                    {city == USE_LOCAL_LOCATION || (
                        <button
                            onClick={() => {
                                this.props.onSubmit(USE_LOCAL_LOCATION)
                            }}
                        >
                            Use Your Location
                        </button>
                    )}
                </div>
            </div>
        )
    }
}
