import requests
from flask import Flask

def parse(forecast):
    parsed = []
    for period in forecast['periods']:
        if period['name'] == 'Tonight':
            parsed.append(period['name'])
            parsed.append(period['detailedForecast'])
        if period['name'] == 'Rest Of Today':
            parsed.append(period['name'])
            parsed.append(period['detailedForecast'])
    weather = ",".join((str(parsed).split(','))[1:])[:-1]
    return weather

app = Flask(__name__)

@app.route("/<path:url>", methods = ["GET"])
def weather(url):
    response = requests.get(str(url))
    forecast = parse(response.json()['properties'])
    return forecast

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5000)
