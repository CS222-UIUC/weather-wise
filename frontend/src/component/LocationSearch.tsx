import React from 'react'

import styles from './LocationSearch.module.sass'
type MyProps = { city: string; onSubmit: (params: string) => string }
export default class LocationSearch extends React.Component<MyProps> {
    render() {
        return (
            <div>
                <input
                    className={styles.LocationSearch}
                    placeholder='Search for weather at...'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.props.onSubmit(e.currentTarget.value)
                            e.currentTarget.value = ''
                        }
                    }}
                ></input>
                <p>{this.props.city}</p>
            </div>
        )
    }
}
