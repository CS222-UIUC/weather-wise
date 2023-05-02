export interface HourForecast {
    hour: number
    temperature: number
    shortForecast: string
}

export interface DayForecast {
    day: string
    high: number
    low: number
    shortForecast: string
    detailedForecast: string
}

export interface TodayData {
    current: number
    high: number
    low: number
    shortForecast: string
    detailedForecast: string
}

export interface WeatherReport {
    today: TodayData
    daily: Array<HourForecast>
    weekly: Array<DayForecast>
    unit: string
}

export default WeatherReport
