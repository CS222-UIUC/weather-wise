import React from 'react'
import { APP_NAME } from '../constants'
import logo from '../svgs/logo.svg'

import './Header.sass'

export default function Header() {
    return (
        <header className="Header">
            <img src={logo} className="Header-logo"></img>
            <h1 className="Header-title">{APP_NAME}</h1>
        </header>
    )
}
