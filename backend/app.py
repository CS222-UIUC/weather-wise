import requests
import json
from datetime import datetime, timedelta
import pytz
from flask import Flask, jsonify, Response
from geopy.location import Location
from geopy.geocoders import Nominatim

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


# Generates the weather report from the properties and forecasts
def generate_response(properties, dailyForecast, hourlyForecast):
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

    return generate_response(properties, dailyForecast, hourlyForecast)


if __name__ == "__main__":  # Run app
    app.run()
