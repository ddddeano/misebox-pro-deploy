// server/api/countries.js
export default defineEventHandler(() => {
  return {
    "UK": [
      { "name": "Greater Manchester", "lat": 53.483959, "lng": -2.244644 },
      { "name": "Merseyside", "lat": 53.4084, "lng": -2.9916 },
      { "name": "West Midlands", "lat": 52.4862, "lng": -1.8904 },
      { "name": "Yorkshire and the Humber", "lat": 53.8008, "lng": -1.5491 },
      { "name": "London", "lat": 51.5074, "lng": -0.1278 },
      { "name": "South East England", "lat": 51.2465, "lng": 0.5600 },
      { "name": "South West England", "lat": 50.7192, "lng": -2.1312 },
      { "name": "East of England", "lat": 52.3555, "lng": 0.2543 },
      { "name": "North East England", "lat": 54.9783, "lng": -1.6178 }
    ],
    "Switzerland": [
      { "name": "Aargau", "lat": 47.4647, "lng": 8.2190 },
      { "name": "Basel-Stadt", "lat": 47.5667, "lng": 7.6000 },
      { "name": "Bern", "lat": 46.9480, "lng": 7.4474 },
      { "name": "Geneva", "lat": 46.2044, "lng": 6.1432 },
      { "name": "Ticino", "lat": 46.3167, "lng": 8.9167 }
    ],
    "France": [
      { "name": "Île-de-France", "lat": 48.8, "lng": 2.3 },
      { "name": "Provence-Alpes-Côte d'Azur", "lat": 43.9, "lng": 6.1 },
      { "name": "Nouvelle-Aquitaine", "lat": 45.0, "lng": -0.5 },
      { "name": "Occitanie", "lat": 43.6, "lng": 3.0 }
    ]
  };
});
