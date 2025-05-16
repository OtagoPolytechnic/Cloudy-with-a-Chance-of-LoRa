'use client';

import { useState } from "react";
import NavigationBar from "../LandingPageComponents/NavigationBar";
import SearchHeader from "../LandingPageComponents/SearchHeader";

import LineChartComponent from "../Dummy Data/LineChartComponent";
import dummyWeatherData from "../Dummy Data/dummyWeatherData";

export default function WeatherDetails() {
  // State for selected weather metric (e.g., Temperature, Humidity)
  const [selectedGraph, setSelectedGraph] = useState("Temperature");

  // State for selected time range (e.g., Hourly, 7 Days)
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Hourly");

  // Configuration mapping for metrics to chart props
  const graphOptions = {
    Temperature: { dataKey: "temperature", unit: "°C" },
    Humidity: { dataKey: "humidity", unit: "%" },
    Rain: { dataKey: "rain", unit: "mm" },
    Wind: { dataKey: "wind", unit: "km/h" },
  };

  // Extract chart-specific data key and unit based on selected metric
  const dataKey = graphOptions[selectedGraph]?.dataKey;
  const unit = graphOptions[selectedGraph]?.unit;

  // Get dataset from dummyWeatherData based on selected time range
  const chartData = dummyWeatherData[selectedTimeFilter] || [];

  const timeFilters = ["Hourly", "7 Days", "30 Days", "Statistics"];

  return (
    <div
      className="flex min-h-screen text-black font-sans relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-md z-0" />
      <div className="relative flex flex-col flex-1 z-10 min-h-screen w-full">
        <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
          <NavigationBar />
        </div>

        <div className="flex flex-col flex-1 ml-28 p-6 z-10 overflow-y-auto max-h-screen">
          <div className="rounded-xl sticky top-0 z-10 mb-8 text-white">
            <SearchHeader />
          </div>

          {/* Metric Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.keys(graphOptions).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedGraph(metric)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition duration-300 ${
                  selectedGraph === metric
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-300 text-black hover:bg-gray-400"
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Chart Container */}
          <div className="bg-white/80 backdrop-blur-md text-black rounded-2xl p-8 shadow-xl w-full max-w-6xl mx-auto border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">Weather Statistics</h2>

            {/* Time Filter Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedTimeFilter(filter)}
                  className={`px-4 py-2 rounded-full transition font-medium ${
                    selectedTimeFilter === filter
                      ? "bg-black text-white"
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Line Chart Component */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl h-[32rem] p-6 text-black font-semibold shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-center">
                {selectedGraph} Over Time ({unit})
              </h3>

              {dataKey ? (
                <div className="flex justify-center items-center h-[27rem]">
                  <LineChartComponent data={chartData} dataKey={dataKey} unit={unit} />
                </div>
              ) : (
                <p className="text-center">Select a metric to view the graph.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
