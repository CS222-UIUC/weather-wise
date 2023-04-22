import React from 'react'
import { APP_NAME } from '../constants'
import logo from '../svgs/logo.svg'

import styles from './Header.module.sass'

export default function Header() {
    return (
        <header className={styles.Header}>
            <img src={logo} className={styles.logo}></img>
            <h1 className={styles.title}>{APP_NAME}</h1>
        </header>
    )
}
