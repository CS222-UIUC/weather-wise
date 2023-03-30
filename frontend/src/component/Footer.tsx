import React from 'react'
import { APP_NAME } from '../constants'

const CURRENT_YEAR = new Date().getFullYear()

import './Footer.css'

export default function Footer() {
    return (
        <footer className="Footer">
            <p>
                ©️2023-{CURRENT_YEAR} {APP_NAME}, all rights reserved
            </p>
        </footer>
    )
}
