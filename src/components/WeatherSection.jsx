// src/components/WeatherSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
/**
 * WeatherSection Component
 * Fetches and displays current, hourly, and 7-day forecast using OpenWeatherMap One Call API.
 */
const WeatherSection = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                const lat = 40.7128;        // TODO: replace with dynamic value
                const lon = -74.0060;       // TODO: replace with dynamic value
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${apiKey}`;
                const response = await axios.get(url);
                setWeatherData(response.data);
            } catch (e) {
                console.error(e);
                setError('Failed to load weather data.');
            }
        };
        fetchWeather();
    }, []);

    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!weatherData) return <div className="p-4">Loading weather...</div>;

    const { current, daily, hourly } = weatherData;
    const hourlyData = hourly.slice(0, 24).map(h => ({
        time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: h.temp,
    }));
    const dailyData = daily.slice(0, 7).map(d => ({
        day: new Date(d.dt * 1000).toLocaleDateString([], { weekday: 'short' }),
        min: d.temp.min,
        max: d.temp.max,
    }));

    return (
        <section id="weather" className="p-6 bg-white rounded-lg shadow-md my-8">
            <h2 className="text-2xl font-semibold mb-4">Weather Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Weather */}
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">Current</h3>
                    <p>Temperature: {current.temp}°C</p>
                    <p>Feels like: {current.feels_like}°C</p>
                    <p>Humidity: {current.humidity}%</p>
                    <p>Conditions: {current.weather[0].description}</p>
                </div>

                {/* Hourly Chart */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">Next 24h Temp</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={hourlyData}>
                            <XAxis dataKey="time" />
                            <YAxis unit="°C" />
                            <Tooltip />
                            <Line type="monotone" dataKey="temp" stroke="#3182ce" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 7-Day Chart */}
                <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
                    <h3 className="text-xl font-medium mb-2">7-Day Forecast</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={dailyData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="min" name="Min Temp" />
                            <Line type="monotone" dataKey="max" name="Max Temp" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default WeatherSection;

/*
=== Detailed Step-by-Step Integration Guide ===

Project structure (relevant):

  agriconnect_3441/
  ├── .env                 # create here
  ├── package.json
  ├── vite.config.js       # Vite project
  ├── tailwind.config.js   # Tailwind setup
  └── src/
      ├── App.jsx          # main app entry
      ├── routes.jsx       # React Router setup (if exists)
      ├── pages/           # optional pages folder
      │   └── Home.jsx     # home page component
      └── components/      # create this folder
          └── WeatherSection.jsx  # weather component

1. **Install Dependencies**
   In project root (`agriconnect_3441/`):
   ```bash
   npm install axios recharts
   ```

2. **Configure Environment Variable**
   - In `agriconnect_3441/`, create (or update) `.env`:
     ```env
     VITE_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_KEY_HERE
     ```
   - Vite automatically loads `.env`. No further config needed.

3. **Create Component File**
   - In `src/components/`, create `WeatherSection.jsx` and paste this code.

4. **Import & Render in App.jsx**
   - Open `src/App.jsx` and locate main JSX return (usually inside `<BrowserRouter>`).
   - Add at top:
     ```js
     import WeatherSection from './components/WeatherSection';
     ```
   - Inside render (e.g., in `<Routes>` or below header):
     ```jsx
     <WeatherSection />
     ```

5. **Alternatively, Add a New Route**
   - If using `src/routes.jsx`, open it and add:
     ```js
     import WeatherSection from './components/WeatherSection';

     const routes = [
       // existing routes
       { path: '/weather', element: <WeatherSection /> },
     ];
     ```

6. **Dynamic Coordinates (Optional)**
   - To request geolocation in `WeatherSection.jsx`, replace hardcoded lat/lon:
     ```js
     const [coords, setCoords] = useState({ lat: 0, lon: 0 });

     useEffect(() => {
       navigator.geolocation.getCurrentPosition(({ coords }) => {
         setCoords({ lat: coords.latitude, lon: coords.longitude });
       });
     }, []);
     // Use coords.lat and coords.lon in API URL
     ```

7. **Tailwind Styling**
   - Tailwind classes are included. Ensure `tailwind.config.js` and CSS imports in `main.css` are correctly set up.

8. **Run & Verify**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000/` (or your configured port).
   - If added as route, go to `http://localhost:3000/weather`.
   - Verify the current weather, 24h, 7-day charts load correctly.
*/
