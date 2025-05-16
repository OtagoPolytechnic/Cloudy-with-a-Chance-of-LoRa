'use client';

import { useState } from "react";
import NavigationBar from "../LandingPageComponents/NavigationBar";
import SearchHeader from "../LandingPageComponents/SearchHeader";
import LineChartComponent from "../Dummy Data/LineChartComponent";
import dummyWeatherData from "../Dummy Data/dummyWeatherData";
import SunriseSunset from "../LandingPageComponents/SunriseSunset";
import LocationDetails from "../LandingPageComponents/LocationDetails";

export default function CO2Page() {
  const [selectedMetric, setSelectedMetric] = useState("CO2");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("1 Day");

  const graphOptions = {
    CO2: { dataKey: "co2", unit: "ppm" },
    Gas: { dataKey: "gas", unit: "ppm" },
    Dust: { dataKey: "dust", unit: "µg/m³" },
    Pressure: { dataKey: "pressure", unit: "hPa" },
  };

  const timeFilters = ["1 Day", "7 Days", "30 Days", "Statistics"];

  const dataKey = graphOptions[selectedMetric].dataKey;
  const unit = graphOptions[selectedMetric].unit;

  const chartData =
    dummyWeatherData?.["CO2 Data"]?.[selectedTimeFilter] || [];

  return (
    <div
      className="flex min-h-screen text-white font-sans relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://hub.op.ac.nz/assets/newsandevents/DUNEDIN-CAMPUS-HUB_100123_6__ScaleMaxWidthWzEwMDBd.jpg')",
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

          {/* Metric Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.keys(graphOptions).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition duration-300 ${
                  selectedMetric === metric
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-300 text-black hover:bg-gray-400"
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white/80 backdrop-blur-md text-black rounded-2xl p-8 shadow-xl w-full max-w-6xl mx-auto border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">Air Quality Statistics</h2>

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

            {/* Line Chart */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl h-[32rem] p-6 text-black font-semibold shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-center">
                {selectedMetric} Over Time ({unit})
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
      <div className="text-white">
  <LocationDetails />
  <SunriseSunset />
</div>
    </div>
  );
}
