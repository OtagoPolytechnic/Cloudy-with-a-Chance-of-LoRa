'use client';

import { useState, useEffect } from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LineChartComponent from '../Dummy Data/LineChartComponent';
import dummyWeatherData from '../Dummy Data/dummyWeatherData';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import LocationDetails from '../LandingPageComponents/LocationDetails';

export default function WeatherDetails() {
  // State for selected weather metric (e.g., Temperature, Humidity)
  const [selectedGraph, setSelectedGraph] = useState('Temperature');
  // State for selected time range (e.g., Hourly, 7 Days)
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Hourly');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size for responsive rendering
  useEffect(() => {
    function checkScreen() {
      setIsSmallScreen(window.innerWidth < 768); // Tailwind md breakpoint
    }

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const graphOptions = {
    Temperature: { dataKey: 'temperature', unit: '°C' },
    Humidity: { dataKey: 'humidity', unit: '%' },
    Rain: { dataKey: 'rain', unit: 'mm' },
    Wind: { dataKey: 'wind', unit: 'km/h' },
  };

  // Extract chart-specific data key and unit based on selected metric
  const dataKey = graphOptions[selectedGraph]?.dataKey;
  const unit = graphOptions[selectedGraph]?.unit;
  // Get dataset from dummyWeatherData based on selected time range
  const chartData = dummyWeatherData[selectedTimeFilter] || [];
  const timeFilters = ['Hourly', '7 Days', '30 Days', 'Statistics'];

  if (isSmallScreen) {
    // === MOBILE / SMALL SCREEN LAYOUT ===
    return (
      <div
        className="flex min-h-screen text-black font-sans relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-md z-0" />

        <div className="relative flex flex-col flex-1 z-10 w-full min-h-screen">
          <div className="relative top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
            <NavigationBar />
          </div>

          <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-10 sm:px-6 pb-6 -mt-6 space-y-6">
            <SearchHeader />
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 px-4 pb-16">
            <div className="w-full overflow-x-auto flex-nowrap flex gap-2 sm:gap-4 justify-start sm:justify-center pb-2 px-1 ml-5">
              {Object.keys(graphOptions).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedGraph(metric)}
                  className={`min-w-max px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm rounded-full font-semibold transition duration-300 ${
                    selectedGraph === metric
                      ? 'bg-black text-white shadow-md'
                      : 'bg-gray-300 text-black hover:bg-gray-400'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-md text-black rounded-2xl px-4 py-6 sm:p-8 shadow-xl w-full max-w-[95vw] sm:max-w-6xl border border-gray-300 mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Weather Statistics</h2>

              <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
                {timeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedTimeFilter(filter)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm rounded-full transition font-medium ${
                      selectedTimeFilter === filter
                        ? 'bg-black text-white'
                        : 'bg-gray-300 text-black hover:bg-gray-400'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl h-[18rem] sm:h-[32rem] p-4 sm:p-6 font-semibold shadow-md border border-gray-200 ">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {selectedGraph} Over Time ({unit})
                </h3>

                {dataKey ? (
                  <div className="w-full h-full">
                    <LineChartComponent data={chartData} dataKey={dataKey} unit={unit} />
                  </div>
                ) : (
                  <p className="text-center">Select a metric to view the graph.</p>
                )}
              </div>
            </div>

            <div className="hidden sm:block text-white w-full max-w-6xl space-y-4">
              <LocationDetails />
              <SunriseSunset />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === LARGE SCREEN LAYOUT ===
return (
  <div
    className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white relative font-sans bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
    }}
  >
    {/* Blurred Overlay */}
    <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-md z-0" />

    {/* Max Size Wrapper */}
    <div className="relative z-10 w-full h-full max-w-[2800px] mx-auto overflow-auto flex flex-col">
      
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
        <NavigationBar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 sm:px-6 pb-10 space-y-6">
        
        {/* Search Header */}
        <div className="rounded-xl text-white">
          <SearchHeader />
        </div>

        {/* Metric Selection */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(graphOptions).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedGraph(metric)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition duration-300 ${
                selectedGraph === metric
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-300 text-black hover:bg-gray-400'
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
                    ? 'bg-black text-white'
                    : 'bg-gray-300 text-black hover:bg-gray-400'
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
                <LineChartComponent
                  data={chartData}
                  dataKey={dataKey}
                  unit={unit}
                  timeFilter={selectedTimeFilter}
                />
              </div>
            ) : (
              <p className="text-center">Select a metric to view the graph.</p>
            )}
          </div>
        </div>

        {/* Footer Details */}
        <div className="text-white w-full max-w-6xl mx-auto space-y-4">
          <LocationDetails />
          <SunriseSunset />
        </div>
      </div>
    </div>
  </div>
);
}