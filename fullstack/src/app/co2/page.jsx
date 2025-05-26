'use client';

import { useState } from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LineChartComponent from '../Dummy Data/LineChartComponent';
import dummyWeatherData from '../Dummy Data/dummyWeatherData';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import LocationDetails from '../LandingPageComponents/LocationDetails';

export default function CO2Page() {
  const [selectedMetric, setSelectedMetric] = useState('CO2');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Hourly');

  const graphOptions = {
    CO2: { dataKey: 'co2', unit: 'ppm' },
    Gas: { dataKey: 'gas', unit: 'ppm' },
    Dust: { dataKey: 'dust', unit: 'µg/m³' },
    Pressure: { dataKey: 'pressure', unit: 'hPa' },
  };

  const timeFilters = ['Hourly', '7 Days', '30 Days', 'Statistics'];
  const dataKey = graphOptions[selectedMetric].dataKey;
  const unit = graphOptions[selectedMetric].unit;
  const chartData = dummyWeatherData?.['CO2 Data']?.[selectedTimeFilter] || [];

  return (
    <div
      className="flex flex-col min-h-screen text-white font-sans relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://hub.op.ac.nz/assets/newsandevents/DUNEDIN-CAMPUS-HUB_100123_6__ScaleMaxWidthWzEwMDBd.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-md z-0" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation - common to all screen sizes */}
        <nav>
          {/* Small Screen Nav: fixed top with shadow and bg-opacity for readability */}
          <div className="relative lg:hidden top-0 left-0 w-full z-40 bg-white bg-opacity-90 shadow-md top-0.5 ">
            <NavigationBar />
          </div>

          {/* Large Screen Nav: relative or fixed, styled differently if needed */}
          <div className="hidden lg:block relative top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
            <NavigationBar />
          </div>
        </nav>

        {/* Content */}
        <main className=" lg:mt-[5.5rem] flex flex-col lg:flex-row flex-1 w-full overflow-y-auto">
          {/* Main Chart Section */}
          <section className="flex-1 p-4 sm:p-6 lg:ml-28">
            <div className="mb-6">
              <SearchHeader />
            </div>

            {/* Metric Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 px-2">
              {Object.keys(graphOptions).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`transition duration-300 rounded-full font-semibold text-sm
                    px-3 py-2
                    sm:px-5 sm:py-2.5
                    ${
                      selectedMetric === metric
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-300 text-black hover:bg-gray-400'
                    }
                    min-w-[40px] sm:min-w-[110px]
                    text-center
                  `}
                  aria-pressed={selectedMetric === metric}
                >
                  {metric}
                </button>
              ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white/80 backdrop-blur-md text-black rounded-2xl p-4 sm:p-8 shadow-xl w-full max-w-6xl mx-auto border border-gray-300">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                Air Quality Statistics
              </h2>

              {/* Time Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6 px-2 ">
                {timeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedTimeFilter(filter)}
                    className={`px-2 py-2 rounded-full transition font-medium text-xs ${
                      selectedTimeFilter === filter
                        ? 'bg-black text-white'
                        : 'bg-gray-300 text-black hover:bg-gray-400'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Line Chart */}
              <div className="bg-white/70 backdrop-blur-md rounded-2xl h-[20rem] sm:h-[32rem] p-4 sm:p-6 text-black font-semibold shadow-md border border-gray-200">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
                  {selectedMetric} Over Time ({unit})
                </h3>

                {dataKey ? (
                  <div className="flex justify-center items-center h-[20rem] sm:h-[27rem]">
                    <LineChartComponent
                      data={chartData}
                      dataKey={dataKey}
                      unit={unit}
                    />
                  </div>
                ) : (
                  <p className="text-center">
                    Select a metric to view the graph.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Side Info Section (Shown below content on mobile) */}
          <aside className="hidden lg:flex flex-col gap-6 p-4 sm:p-6 lg:w-[22rem]">
            <LocationDetails />
            <SunriseSunset />
          </aside>
        </main>
      </div>
    </div>
  );
}
