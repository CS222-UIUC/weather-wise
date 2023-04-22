import React, { PropsWithChildren } from 'react'

import styles from './WeatherPanel.module.sass'

interface WeatherPanelProps {
    className?: string
}

export default function WeatherPanel({
    className,
    children,
}: PropsWithChildren<WeatherPanelProps>) {
    const finalClassName =
        styles.WeatherPanel + (className == undefined ? '' : ' ' + className)

    return <div className={finalClassName}>{children}</div>
}
