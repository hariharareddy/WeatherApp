// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = '8ba9b73993cd752541cb6438c5880d2c';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
