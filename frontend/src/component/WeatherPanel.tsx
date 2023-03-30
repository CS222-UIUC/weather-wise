import React, { PropsWithChildren } from 'react'

import './WeatherPanel.css'

interface WeatherPanelProps {
    className?: string
}

export default function WeatherPanel({
    className,
    children,
}: PropsWithChildren<WeatherPanelProps>) {
    const finalClassName =
        'WeatherPanel' + (className == undefined ? '' : ' ' + className)

    return <div className={finalClassName}>{children}</div>
}
