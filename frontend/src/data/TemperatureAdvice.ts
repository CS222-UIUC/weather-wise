export default function TemperatureAdvice(
    temperature: number
): string | undefined {
    if (temperature <= 0) {
        return "Be careful, it's really cold out! Make sure to wear lots of layers!"
    } else if (temperature <= 40) {
        return "It's a bit chilly out, bring your coat!"
    } else if (temperature <= 60) {
        return 'Consider bringing a light jacket'
    } else if (temperature <= 80) {
        return 'Enjoy the nice weather, no need for a coat today!'
    } else if (temperature <= 100) {
        return "It's hot out! Make sure to drink lots of water!"
    } else if (temperature > 100) {
        return 'Be careful of the high temperatures! Consider staying indoors and be sure to stay hydrated!'
    }
}
