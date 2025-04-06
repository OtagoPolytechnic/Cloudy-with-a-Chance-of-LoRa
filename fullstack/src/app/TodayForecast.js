import React from "react";

const TodayForecast = () => {
  const forecastData = [
    { time: "6 AM", temp: "25°", icon: "☀️" },
    { time: "9 AM", temp: "28°", icon: "☀️" },
    { time: "12 PM", temp: "33°", icon: "☀️" },
    { time: "3 PM", temp: "34°", icon: "☀️" },
    { time: "6 PM", temp: "32°", icon: "☀️" },
    { time: "9 PM", temp: "14°", icon: "🌙" },
  ];

  return (
    <section className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Today's Forecast</h2>
      <div className="grid grid-cols-6 gap-4 text-center">
        {forecastData.map((hour, i) => (
          <div key={i} className="flex flex-col items-center bg-white/10 p-2 rounded-lg shadow-md">
            <span className="text-lg">{hour.icon}</span>
            <span>{hour.time}</span>
            <span>{hour.temp}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodayForecast;
