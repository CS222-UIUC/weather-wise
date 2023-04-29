export enum WeatherType {
    Cloudy,
    PartlyCloudy,
    Rainy,
    Snowy,
    Stormy,
    Sunny,
}

export const WeatherTypeData = {
    [WeatherType.Cloudy]: {
        src: 'images/cloudy.png',
        words: ['cloud'],
    },
    [WeatherType.PartlyCloudy]: {
        src: 'images/partly_cloudy.png',
        words: ['part cloud', 'partly cloud', 'some cloud'],
    },
    [WeatherType.Rainy]: {
        src: 'images/rainy.png',
        words: ['rain'],
    },
    [WeatherType.Snowy]: {
        src: 'images/snowy.png',
        words: ['snow', 'blizzard'],
    },
    [WeatherType.Stormy]: {
        src: 'images/stormy.png',
        words: ['storm', 'lightning'],
    },
    [WeatherType.Sunny]: {
        src: 'images/sunny.png',
        words: ['sunny', 'clear'],
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

export function GetImageSrcFor(forecast: string): string {
    for (const weatherType of WeatherTypePriority) {
        const weatherTypeData = WeatherTypeData[weatherType]
        for (const word of weatherTypeData.words) {
            if (forecast.toLowerCase().includes(word)) {
                return weatherTypeData.src
            }
        }
    }

    return WeatherTypeData[WeatherType.Sunny].src
}
