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
    return parsed

app = Flask(__name__)

@app.route("/", methods=["GET"])
def weather(url):
    response = requests.get(url)
    parse(response.json()['properties'])
    return "Hello, World!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001)
