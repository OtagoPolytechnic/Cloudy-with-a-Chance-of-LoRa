import React from "react";
import dummyWeatherData from "../Dummy Data/dummyWeatherData";

const SevenDayForecast = () => {
  const weeklyData = dummyWeatherData["7 Days"];

  const getConditionIcon = (temp, rain) => {
    if (rain > 1.5) return "⛈️";
    if (rain > 0.5) return "🌧️";
    if (temp >= 30) return "🔥";
    if (temp >= 22) return "☀️";
    return "☁️";
  };

  return (
    <section className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl w-full md:w-[400px] md:h-[488px] shadow-lg">
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      <ul className="space-y-3 text-sm">
        {weeklyData.map((day, i) => {
          const icon = getConditionIcon(day.temperature, day.rain);
          const high = `${Math.round(day.temperature)}°`;
          const low = `${Math.round(day.temperature - 3)}°`; // Simulated low temp
          return (
            <li
              key={i}
              className="flex justify-between px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition duration-200"
            >
              <span>{day.time}</span>
              <span>{`${icon} ${high}/${low}`}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SevenDayForecast;
