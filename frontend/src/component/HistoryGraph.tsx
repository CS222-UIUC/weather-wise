import React from 'react'

import styles from './HistoryGraph.module.sass'

export default function HistoryGraph() {
    return (
        <div className={styles.HistoryGraph}>
            <h1>Graph Title</h1>
            <p>In theory, a graph. Instead, some cats.</p>
            <img src='res/cats.jpg'></img>
        </div>
    )
}
