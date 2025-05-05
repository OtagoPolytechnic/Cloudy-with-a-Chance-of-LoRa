import React from "react";

const SevenDayForecast = () => {
  const forecastData = [
    { day: "Mon", icon: "☀️", high: "33°", low: "22°" },
    { day: "Tue", icon: "☁️", high: "20°", low: "18°" },
    { day: "Wed", icon: "☁️", high: "22°", low: "21°" },
    { day: "Thu", icon: "🌧️", high: "16°", low: "12°" },
    { day: "Fri", icon: "🌧️", high: "10°", low: "8°" },
    { day: "Sat", icon: "⛈️", high: "8°", low: "5°" },
    { day: "Sun", icon: "☁️", high: "14°", low: "12°" },
  ];

  return (
    <section className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl w-full md:w-[400px] md:h-[488px] shadow-lg">
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      <ul className="space-y-3 text-sm">
        {forecastData.map((day, i) => (
          <li
            key={i}
            className="flex justify-between px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition duration-200"
          >
            <span>{day.day}</span>
            <span>{`${day.icon} ${day.high}/${day.low}`}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SevenDayForecast;
