import requests

URL = 'https://api.weather.gov/zones/forecast/MNZ060/forecast' # Minneapolis, Minnesota

response = requests.get(URL)
forecast = response.json()['properties']

print('Forecast updated:', forecast['updated'])
print('')

for period in forecast['periods']:
    print(period['name'])
    print(period['detailedForecast'])
    print('')

# Run: py .\backend\weather.py in Terminal
# Add Test Cases