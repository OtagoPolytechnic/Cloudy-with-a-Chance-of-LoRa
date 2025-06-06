import React from 'react';
import dummyWeatherData from '../Dummy Data/dummyWeatherData';

const TodayForecast = () => {
  const hourlyData = dummyWeatherData['Hourly'];

  // Returns a weather emoji based on temperature
  const getConditionIcon = (temp) => {
    if (temp >= 30) return '🔥';     // Very hot
    if (temp >= 22) return '🌤️';    // Warm, partly sunny
    if (temp >= 15) return '☀️';     // Mild sunny
    if (temp >= 5) return '🌧️';      // Cool, rainy
    return '❄️';                     // Cold, snowy
  };

  return (
    <section
      aria-label="Today's weather forecast"
      className="bg-white/20 backdrop-blur-md border border-white/30 p-4 sm:p-6 rounded-2xl shadow-lg w-full md:w-[830px]"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Today's Forecast</h2>

      {/* Responsive grid for hourly forecast */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 text-center text-xs sm:text-sm">
        {hourlyData.map((hour, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/10 p-2 rounded-lg shadow-md"
            role="group"
            aria-label={`Forecast for ${hour.time}: ${hour.temperature} degrees`}
          >
            <span className="text-lg" aria-hidden="true">
              {getConditionIcon(hour.temperature)}
            </span>
            <span>{hour.time}</span>
            <span>{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayForecast;
