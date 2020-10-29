"""
NAME: Janit Sriganeshaelankovan 
CREATED: Thu Oct 29 12:31:04 2020
GOAL: Format the location data and get logitude and latitude.
LAST UPDATE: Thu Oct 29 12:31:04 2020
"""

import pandas as pd
import requests
import json
import secret_key


# MapQuest API KEY
# https://developer.mapquest.com/
MAPQUEST_KEY = secret_key.MAPQUEST_KEY 

loc_data = pd.read_excel('locations.xlsx', sheet_name='Sheet1')
loc_data.columns


# Get the latitude and longitude for the locations using MapQuest Geocoding API
# mongoose; longitude comes first in a GeoJSON coordinate array, then latitude
loc_data['Latitude'] = ''
loc_data['Longitude'] = ''
for idx, row in loc_data.iterrows():
    print(f'On {idx}')
    location = (row['Address'] + " Mississauga, Ontario, Canada" + row['PostalCode']).replace(" ", "%20")
    res = requests.get(f'http://www.mapquestapi.com/geocoding/v1/address?key={MAPQUEST_KEY}&location={location}')
    data = res.json()
    loc_results = data['results'][0]['locations'][0]['latLng']
    loc_data.at[idx, 'Longitude'], loc_data.at[idx, 'Latitude'] = loc_results['lng'], loc_results['lat']
    
    
loc_data.to_csv('locations_formatted.csv', index=False)



# Output to format to load into MongoDB
output = [] 

for idx, row in loc_data.iterrows():
    output.append({
        "name": str(row['Name']),
        "naics_code": int(row['NAICSCode']),
        "web_address": str(row['WebAddress']),
        "address": {
                "street": str(row['Address']),
                "postal_code": str(row['PostalCode']),
                "building_number": str(row['BldgNo']),
                "unit_number": str(row['UnitNo']),
            },
        "location": {
                "type": "Point",
                "coordinates": [float(row['Longitude']),float(row['Latitude'])]
            }
        })


with open('location_data.txt', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=4)





















