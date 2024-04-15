// App.js

import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/weather', { city });
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      setWeatherData('');
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter city name Ex: Tirupati" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="temperature">{weatherData.main.temp} °C</p>
          <div className="details">
            <div className="weather-info-section">
              <p><strong>Coordinates:</strong> {weatherData.coord.lon}, {weatherData.coord.lat}</p>
              <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
              <p><strong>Feels Like:</strong> {weatherData.main.feels_like} °C</p>
              <p><strong>Min Temperature:</strong> {weatherData.main.temp_min} °C</p>
              <p><strong>Max Temperature:</strong> {weatherData.main.temp_max} °C</p>
              <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
              <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            </div>
            <div className="weather-info-section">
              <p><strong>Visibility:</strong> {weatherData.visibility / 1000} km</p>
              <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
              <p><strong>Clouds:</strong> {weatherData.clouds.all}%</p>
              <p><strong>Date:</strong> {new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
              <p><strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p><strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              <p><strong>Timezone:</strong> {weatherData.timezone / 3600} hrs</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
