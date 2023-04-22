import React from 'react'

import styles from './LocationSearch.module.sass'

export default function LocationSearch() {
    return (
        <input
            className={styles.LocationSearch}
            placeholder="Search for weather at..."
        ></input>
    )
}
