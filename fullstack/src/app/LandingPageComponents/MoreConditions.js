import React from "react";
import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";
import dummyWeatherData from "../Dummy Data/dummyWeatherData";

const MoreConditions = () => {
  const router = useRouter();

  // Use the latest hourly data point
  const hourlyData = dummyWeatherData["Hourly"];
  const latest = hourlyData[hourlyData.length - 1];

  // Compute rain chance
  const rainCount = hourlyData.filter((d) => d.rain > 0).length;
  const rainChance = Math.round((rainCount / hourlyData.length) * 100);

  const airData = [
    { label: "Feels Like", value: latest?.temperature ? `${latest.temperature}°` : "N/A" },
    { label: "Wind", value: latest?.wind ? `${latest.wind} km/h` : "N/A" },
    { label: "Chance of Rain", value: isNaN(rainChance) ? "N/A" : `${rainChance}%` },
    { label: "UV Index", value: "3" }, // placeholder
  ];

  return (
    <section className="relative bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl md:h-[340px] md:w-[835px] shadow-lg mt-8">
      <button
        onClick={() => router.push("/weather")}
        className="absolute top-4 right-4 flex items-center gap-1 text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-xs transition"
        title="More Info"
      >
        <Cloud className="w-4 h-4" />
        More Info
      </button>

      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">More Conditions</h2>
          <p className="text-gray-300 text-sm">Details about weather conditions</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {airData.map((item, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md text-white rounded-xl p-4 shadow-lg flex flex-col items-center justify-center text-center"
          >
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-lg font-bold mt-1">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreConditions;
