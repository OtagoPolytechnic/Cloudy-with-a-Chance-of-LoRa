import React from 'react';
import dummyWeatherData from '../Dummy Data/dummyWeatherData';

const SevenDayForecast = () => {
  const weeklyData = dummyWeatherData['7 Days'];

  const getConditionIcon = (temp, rain) => {
    if (rain > 1.5) return '⛈️';
    if (rain > 0.5) return '🌧️';
    if (temp >= 30) return '🔥';
    if (temp >= 22) return '☀️';
    return '☁️';
  };

  // Get current day abbreviation like "Mon", "Tue", etc.
  const currentDayAbbrev = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
  });

  return (
    <section className="bg-white/20 backdrop-blur-md border border-white/30 p-4 sm:p-6 rounded-2xl w-full sm:w-[400px] sm:h-[557px] shadow-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        7-Day Forecast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-3 gap-x-3 text-xs sm:text-sm">
        {weeklyData.map((day, i) => {
          const icon = getConditionIcon(day.temperature, day.rain);
          const high = `${Math.round(day.temperature)}°`;
          const low = `${Math.round(day.temperature - 3)}°`; // Simulated low temp

          // Compare current day with data day (abbreviated)
          const isToday = day.time === currentDayAbbrev;

          return (
            <div
              key={i}
              className={`flex justify-between items-center px-4 py-3 rounded-lg transition duration-200
                ${isToday ? 'bg-white/30 border border-white text-black font-bold shadow-md' : 'bg-white/10 hover:bg-white/20'}
              `}
            >
              <span className="font-medium">{day.time}</span>
              <span className="font-semibold">{`${icon} ${high}/${low}`}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SevenDayForecast;
