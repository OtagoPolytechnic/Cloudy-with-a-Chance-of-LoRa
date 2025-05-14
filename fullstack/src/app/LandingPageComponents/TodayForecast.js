import React from "react";
import dummyWeatherData from "../Dummy Data/dummyWeatherData";

const TodayForecast = () => {
  const hourlyData = dummyWeatherData["Hourly"];

  const getConditionIcon = (temp) => {
    if (temp >= 30) return "🔥";
    if (temp >= 22) return "🌤️";
    if (temp >= 15) return "☀️";
    if (temp >= 5) return "🌧️";
    return "❄️";
  };

  return (
    <section className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg md:w-[830px]">
      <h2 className="text-xl font-semibold mb-4">Today's Forecast</h2>
      <div className="grid grid-cols-6 gap-4 text-center">
        {hourlyData.map((hour, i) => (
          <div key={i} className="flex flex-col items-center bg-white/10 p-2 rounded-lg shadow-md">
            <span className="text-lg">{getConditionIcon(hour.temperature)}</span>
            <span>{hour.time}</span>
            <span>{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayForecast;
