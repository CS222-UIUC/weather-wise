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
def get_daily_forecast(properties):
    dailyForecastResponse = requests.get(properties["forecast"])

    if 200 >= dailyForecastResponse.status_code >= 299:
        return None

    try:
        return dailyForecastResponse.json()["properties"]["periods"]
    except:
        return None


# Gets the hourly forecast from properties
def get_hourly_forecast(properties):
    hourlyForecastResponse = requests.get(properties["forecastHourly"])

    if 200 >= hourlyForecastResponse.status_code >= 299:
        return None

    try:
        return hourlyForecastResponse.json()["properties"]["periods"]
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
        "min": minTemp,
        "current": currentTemp,
    }


# Generates the weather report from the properties and forecasts
def generate_response(properties, dailyForecast, hourlyForecast, last24Hours):
    # High and low temperature
    highTemperature = ""
    lowTemperature = ""
    for period in dailyForecast:
        if period["number"] == 1:
            highTemperature = str(period["temperature"])
            otherWeatherInformation = str(
                period["detailedForecast"]
            )  # Other weather information
        if period["number"] == 2:
            lowTemperature = str(period["temperature"])
    # Current temperature
    currentTemperature = ""
    timezone = properties["timeZone"]
    now = datetime.now(pytz.timezone(timezone))
    currentDateTime = now.strftime("%Y-%m-%dT%H:%M:%S%z")
    currentDateTime = currentDateTime[:-2] + ":" + currentDateTime[-2:]
    currentDateTime = currentDateTime[:-11] + "00:00-05:00"
    for period in hourlyForecast:
        if currentDateTime == str(period["startTime"]):
            currentTemperature = period["temperature"]
            break
    # Hourly temperature
    hourlyTemperatures = []
    for period in hourlyForecast:
        if period["number"] <= 6:
            hourlyTemperatures.append(period["temperature"])
    now = datetime.now()
    rounded = now.replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)
    futureHours = []
    for time in range(1, 7):
        hour = (rounded + timedelta(hours=time)).strftime("%I:%M %p")
        futureHours.append(hour)
    # Daily temperature
    days = []
    dailyTemperatures = []
    for period in dailyForecast:
        if period["number"] <= 6:
            days.append(period["name"])
            dailyTemperatures.append(period["temperature"])
    print(days)
    print(dailyTemperatures)
    dictionary = {
        "current": currentTemperature,
        "other": otherWeatherInformation,
        "today": {"high": highTemperature, "low": lowTemperature},
        "hourly": {
            "0": {"time": futureHours[0], "weather": hourlyTemperatures[0]},
            "1": {"time": futureHours[1], "weather": hourlyTemperatures[1]},
            "2": {"time": futureHours[2], "weather": hourlyTemperatures[2]},
            "3": {"time": futureHours[3], "weather": hourlyTemperatures[3]},
            "4": {"time": futureHours[4], "weather": hourlyTemperatures[4]},
            "5": {"time": futureHours[5], "weather": hourlyTemperatures[5]},
        },
        "daily": {
            "0": {"day": days[0], "weather": dailyTemperatures[0]},
            "1": {"day": days[1], "weather": dailyTemperatures[1]},
            "2": {"day": days[2], "weather": dailyTemperatures[2]},
            "3": {"day": days[3], "weather": dailyTemperatures[3]},
            "4": {"day": days[4], "weather": dailyTemperatures[4]},
            "5": {"day": days[5], "weather": dailyTemperatures[5]},
        },
    }

    return jsonify(dictionary)  # Return as a JSON


# Based on location, find:
@app.route("/<location>")
def weather(location):
    # Define latitude and longitude using coordinates(location) function
    geolocation = location_to_geolocation(location)

    if not geolocation:
        return Response(status=404)

    properties = get_properties(geolocation)

    if not properties:
        return Response(status=500)

    timezone = properties["timeZone"]

    dailyForecast = get_daily_forecast(properties)

    if not dailyForecast:
        return Response(status=500)

    hourlyForecast = get_hourly_forecast(properties)

    if not hourlyForecast:
        return Response(status=500)

    last24Hours = get_last_24_hours(properties, dailyForecast, geolocation)

    return generate_response(properties, dailyForecast, hourlyForecast, last24Hours)


if __name__ == "__main__":  # Run app
    app.run()
