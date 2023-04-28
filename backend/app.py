import requests
import json
from datetime import datetime, timedelta
import pytz
from flask import Flask, jsonify, Response
from geopy.location import Location
from geopy.geocoders import Nominatim
from pytemp import pytemp
import math

geolocator = Nominatim(user_agent="weather-app", timeout=10)
app = Flask(__name__)


# Convert location to latitude and longitude coordinates using geopy
def location_to_geolocation(location):
    return geolocator.geocode(query=location, exactly_one=True)


# Get weather properties, used to request other data such as forecasts
def get_properties(geolocation: Location):
    propertiesUrl = (
        f"https://api.weather.gov/points/{geolocation.latitude},{geolocation.longitude}"
    )
    propertiesResponse = requests.get(propertiesUrl)

    if 200 >= propertiesResponse.status_code >= 299:
        return None

    try:
        return propertiesResponse.json()["properties"]
    except:
        return None


# Gets daily forecast from properties
def get_weekly_forecast(properties):
    weeklyForecastResponse = requests.get(properties["forecast"])

    if 200 >= weeklyForecastResponse.status_code >= 299:
        return None

    try:
        return weeklyForecastResponse.json()["properties"]["periods"]
    except:
        return None


# Gets the hourly forecast from properties
def get_daily_forecast(properties):
    dailyForecastResponse = requests.get(properties["forecastHourly"])

    if 200 >= dailyForecastResponse.status_code >= 299:
        return None

    try:
        return dailyForecastResponse.json()["properties"]["periods"]
    except:
        return None


# Gets current weather data from properties, this is incredibly long because
# weather data is not well centralized, and we chose to use a free service
def get_last_24_hours(properties, dailyForecast, location: Location):
    # Get all observation stations
    observationStationsResponse = requests.get(properties["observationStations"])

    if 200 >= observationStationsResponse.status_code >= 299:
        return None

    observationStations = None

    try:
        observationStations = observationStationsResponse.json()["features"]
    except:
        return None

    # Get the observation station closest to us
    best = None
    best_dist = None

    for observationStation in observationStations:
        [long, lat] = observationStation["geometry"]["coordinates"]
        dist = math.sqrt(
            (lat - location.latitude) ** 2 + (long - location.longitude) ** 2
        )

        if not best or dist < best_dist:
            best = observationStation["properties"]["stationIdentifier"]
            best_dist = dist

    if not best:
        return None

    # Get observations for the past day
    now = datetime.now(pytz.timezone(properties["timeZone"]))
    startOfDay = now.strftime("%Y-%m-%dT00:00:00%z")

    observationsResponse = requests.get(
        f"https://api.weather.gov/stations/{best}/observations/",
        params={"start": startOfDay},
    )

    observations = None

    if 200 >= observationsResponse.status_code >= 299:
        return None

    try:
        observations = observationsResponse.json()["features"]
    except:
        return None

    # Handle edge case where there hasn't been on yet (like if we are at 12AM)
    # by getting latest observation
    if len(observations) <= 0:
        latestObservationsResponse = requests.get(
            f"https://api.weather.gov/stations/{best}/observations/latest/"
        )

        if 200 >= latestObservationsResponse.status_code >= 299:
            return None

        try:
            observations = [latestObservationsResponse.json()]
        except:
            return None

    # Remap observations to their properties
    observations = list(map(lambda x: x["properties"], observations))

    currentTemp = None
    minTemp = None

    for observation in observations:
        # Parse the units out
        inUnit = observation["temperature"]["unitCode"].split(":")[1].replace("deg", "")
        toUnit = dailyForecast[0]["temperatureUnit"]

        thisTemp = pytemp(observation["temperature"]["value"], inUnit, toUnit)
        if not minTemp or thisTemp < minTemp:
            minTemp = thisTemp

        if not currentTemp:
            currentTemp = thisTemp

    return {
        "low": math.floor(minTemp),
        "current": math.floor(currentTemp),
    }


# Generates the weather report from the properties and forecasts
def generate_response(properties, weeklyForecast, dailyForecast, last24Hours):
    startIndex = 0
    if not weeklyForecast[0]["isDaytime"]:
        # Ignore first result if it is not daytime
        startIndex = 1

    firstPeriodOfWeek = weeklyForecast[startIndex]
    unit = firstPeriodOfWeek["temperatureUnit"]

    # Generate today part
    today = {
        "high": firstPeriodOfWeek["temperature"],
        "low": min(firstPeriodOfWeek["temperature"], last24Hours["low"]),
        "current": last24Hours["current"],
        "shortForecast": firstPeriodOfWeek["shortForecast"],
        "detailedForecast": firstPeriodOfWeek["detailedForecast"],
    }

    # Generate weekly part
    weekly = []

    # We iterate in pairs, since the way this forecast is set up, it goes
    # day -> night -> day...
    for i in range(startIndex, len(weeklyForecast) - 1, 2):
        day = weeklyForecast[i]
        night = weeklyForecast[i + 1]

        weekly.append(
            {
                "day": day["name"],
                "high": day["temperature"],
                "low": night["temperature"],
                "shortForecast": day["shortForecast"],
                "detailedForecast": day["detailedForecast"],
            }
        )

    # Generate daily part
    daily = []

    for i in range(len(dailyForecast)):
        hour = dailyForecast[i]
        hourN = datetime.fromisoformat(hour["startTime"]).hour
        daily.append(
            {
                "hour": hourN,
                "temperature": hour["temperature"],
                "shortForecast": hour["shortForecast"],
            }
        )

        if i >= 23:
            break

    # Jsonify final result
    return jsonify(
        {
            "unit": unit,
            "today": today,
            "daily": daily,
            "weekly": weekly,
        }
    )


@app.route("/")
def status():
    return Response(
        json.dumps(
            {
                "status": 200,
                "message": "OK",
            }
        ),
        200,
    )


# Requests weather data for a location
@app.route("/weather/<location>")
def weather(location):
    # Define latitude and longitude using coordinates(location) function
    geolocation = location_to_geolocation(location)

    if not geolocation:
        return Response(status=404)

    properties = get_properties(geolocation)

    if not properties:
        return Response(status=500)

    timezone = properties["timeZone"]

    weeklyForecast = get_weekly_forecast(properties)

    if not weeklyForecast:
        return Response(status=500)

    dailyForecast = get_daily_forecast(properties)

    if not dailyForecast:
        return Response(status=500)

    last24Hours = get_last_24_hours(properties, weeklyForecast, geolocation)

    return generate_response(properties, weeklyForecast, dailyForecast, last24Hours)


if __name__ == "__main__":  # Run app
    app.run()
