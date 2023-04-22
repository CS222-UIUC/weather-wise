import requests
import json
from datetime import datetime, timedelta
import pytz
from flask import Flask, jsonify, Response
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="weather-app", timeout=10)
app = Flask(__name__)


# Convert location to latitude and longitude coordinates using geopy
def location_to_geolocation(location):
    return geolocator.geocode(query=location, exactly_one=True)


# Based on location, find:
@app.route("/<location>")
def weather(location):
    # Define latitude and longitude using coordinates(location) function
    geolocation = location_to_geolocation(location)

    if not geolocation:
        return Response(status=404)

    baseUrl = (
        f"https://api.weather.gov/points/{geolocation.latitude},{geolocation.longitude}"
    )
    baseResponse = requests.get(baseUrl)
    highLowResponse = requests.get(str(baseResponse.json()["properties"]["forecast"]))
    # High and low temperature
    highTemperature = ""
    lowTemperature = ""
    for period in highLowResponse.json()["properties"]["periods"]:
        if period["number"] == 1:
            highTemperature = str(period["temperature"]) 
            otherWeatherInformation = str(period["detailedForecast"]) # Other weather information
        if period["number"] == 2:
            lowTemperature = str(period["temperature"])
    # Current temperature
    currentResponse = requests.get(str(baseResponse.json()["properties"]["forecastHourly"]))
    currentTemperature = ""
    tz = pytz.timezone('America/New_York') 
    now = datetime.now(tz)
    currentDateTime = now.strftime('%Y-%m-%dT%H:%M:%S%z')
    currentDateTime = currentDateTime[:-2] + ':' + currentDateTime[-2:]
    currentDateTime = currentDateTime[:-11] + "00:00-05:00"
    for period in currentResponse.json()["properties"]["periods"]:
        if currentDateTime == str(period["startTime"]):
            currentTemperature = period["temperature"]
            break
    # Hourly temperature
    hourlyResponse = requests.get(str(baseResponse.json()["properties"]["forecastHourly"]))
    hourlyTemperatures = []
    for period in hourlyResponse.json()["properties"]["periods"]:
        if period["number"] <= 6:
            hourlyTemperatures.append(period["temperature"])
    now = datetime.now()
    rounded = now.replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)
    futureHours = []
    for time in range(1, 7):
        hour = (rounded + timedelta(hours = time)).strftime("%I:%M %p")
        futureHours.append(hour)
    # Daily temperature
    days = []
    dailyTemperatures = []
    dailyResponse = requests.get(str(baseResponse.json()["properties"]["forecast"]))
    for period in dailyResponse.json()["properties"]["periods"]:
        if period["number"] <= 6:
            days.append(period["name"])
            dailyTemperatures.append(period["temperature"])
    print(days)
    print(dailyTemperatures)
    dictionary = {
        "current" : currentTemperature,
        "other" : otherWeatherInformation,
        "today": {"high": highTemperature , "low" : lowTemperature},
        "hourly": {
            "0":  {"time": futureHours[0], "weather": hourlyTemperatures[0]},
            "1":  {"time": futureHours[1], "weather": hourlyTemperatures[1]},
            "2":  {"time": futureHours[2], "weather": hourlyTemperatures[2]},
            "3":  {"time": futureHours[3], "weather": hourlyTemperatures[3]},
            "4":  {"time": futureHours[4], "weather": hourlyTemperatures[4]},
            "5":  {"time": futureHours[5], "weather": hourlyTemperatures[5]},
        },
        "daily": {
            "0":  {"day": days[0], "weather": dailyTemperatures[0]},
            "1":  {"day": days[1], "weather": dailyTemperatures[1]},
            "2":  {"day": days[2], "weather": dailyTemperatures[2]},
            "3":  {"day": days[3], "weather": dailyTemperatures[3]},
            "4":  {"day": days[4], "weather": dailyTemperatures[4]},
            "5":  {"day": days[5], "weather": dailyTemperatures[5]},
        }
    }
    return jsonify(dictionary) # Return as a JSON

if __name__ == "__main__": # Run app
    app.run()