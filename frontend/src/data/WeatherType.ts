export enum WeatherType {
    Cloudy,
    PartlyCloudy,
    Rainy,
    Snowy,
    Stormy,
    Sunny,
}

export type WeatherTypeMetadata = {
    src: string
    words: string[]
    cc_src: string
    advice?: string
}

export const WeatherTypeToMetadata: Record<WeatherType, WeatherTypeMetadata> = {
    [WeatherType.Cloudy]: {
        src: 'images/cloudy.png',
        words: ['cloud'],
        cc_src: 'images/climate-change-co2.png',
    },
    [WeatherType.PartlyCloudy]: {
        src: 'images/partly_cloudy.png',
        words: ['part cloud', 'partly cloud', 'some cloud'],
        cc_src: 'images/climate-change-partly-sunny.png',
        advice: '',
    },
    [WeatherType.Rainy]: {
        src: 'images/rainy.png',
        words: ['rain', 'shower'],
        cc_src: 'images/climate-change-rainy.png',
        advice: 'It is a bit rainy today, bring an umbrella!',
    },
    [WeatherType.Snowy]: {
        src: 'images/snowy.png',
        words: ['snow', 'blizzard'],
        cc_src: 'images/climate-change-snowy.png',
        advice: 'Brrrrr, make sure to wear a heavy coat, and maybe get yourself some hot chocolate!',
    },
    [WeatherType.Stormy]: {
        src: 'images/stormy.png',
        words: ['storm', 'lightning', 'thunder', 'thunderstorm'],
        cc_src: 'images/climate-change-methane.png',
        advice: 'Be careful! Bring an umbrella and some rainboots!',
    },
    [WeatherType.Sunny]: {
        src: 'images/sunny.png',
        words: ['sunny', 'clear'],
        cc_src: 'images/climate-change-sunny.png',
        advice: 'Enjoy the sunny weather!',
    },
}

export const WeatherTypePriority = [
    WeatherType.Snowy,
    WeatherType.Stormy,
    WeatherType.Rainy,
    WeatherType.PartlyCloudy,
    WeatherType.Cloudy,
    WeatherType.Sunny,
]

export function GetWeatherTypeFor(forecast: string): WeatherType {
    for (const weatherType of WeatherTypePriority) {
        const weatherTypeMetadata = WeatherTypeToMetadata[weatherType]
        for (const word of weatherTypeMetadata.words) {
            if (forecast.toLowerCase().includes(word)) {
                return weatherType
            }
        }
    }

    return WeatherTypePriority[WeatherTypePriority.length - 1]
}
