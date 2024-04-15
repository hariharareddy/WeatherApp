// server.js
require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = process.env.API_KEY;

// Connect to MongoDB
mongoose.connect('mongodb+srv://hariharareddyg9:Weatherapp@weatherapp.ujxzepj.mongodb.net/weatherData?retryWrites=true&w=majority&appName=weatherApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for weather data
const weatherSchema = new mongoose.Schema({
  
  coord: {
    lon: Number,
    lat: Number
  },
  weather: [{
    id: Number,
    main: String,
    description: String,
    icon: String
  }],
  base: String,
  main: {
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    pressure: Number,
    humidity: Number,
    sea_level: Number,
    grnd_level: Number
  },
  visibility: Number,
  wind: {
    speed: Number,
    deg: Number,
    gust: Number
  },
  clouds: {
    all: Number
  },
  dt: Number,
  sys: {
    country: String,
    sunrise: Number,
    sunset: Number
  }
  
});

// Create a model from the schema
const Weather = mongoose.model('Weather', weatherSchema);

app.use(express.json());
app.use(cors());


app.post('/weather', async (req, res) => {
  const { city } = req.body;

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch weather data." });
  }
});

// Route to save weather data to MongoDB
app.post('/save-weather', async (req, res) => {
  try {
    const weatherData = req.body;
    const savedWeather = await Weather.create(weatherData);
    res.status(200).json({ message: 'Weather data saved to MongoDB successfully!' });
  } catch (error) {
    console.error('Error saving weather data to MongoDB:', error);
    res.status(500).json({ message: 'Error saving weather data to MongoDB.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
