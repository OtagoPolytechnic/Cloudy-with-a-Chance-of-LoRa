'use client';

import { useState } from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LocationDetails from '../LandingPageComponents/LocationDetails';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import Widget from '@/components/widget';
import LineChartComponent from '@/components/graphs/LineChartComponent';

export default function WeatherDetails() {
  // Track selected metric (e.g. Temperature, Humidity)
  const [selectedMetric, setSelectedMetric] = useState('Temperature');

  // Track selected time filter (could be extended with daily, weekly, etc.)
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Hourly');

  // Configuration map for each metric
  const graphOptions = {
    Temperature: {
      dataKey: 'temperature',
      unit: '°C',
      GraphComponent: LineChartComponent,
    },
    Humidity: {
      dataKey: 'humidity',
      unit: '%',
      GraphComponent: LineChartComponent,
    },
    Rain: {
      dataKey: 'rain',
      unit: 'mm',
      GraphComponent: LineChartComponent,
    },
    Wind: {
      dataKey: 'wind',
      unit: 'km/h',
      GraphComponent: LineChartComponent,
    },
  };

  const selectedOption = graphOptions[selectedMetric];

  return (
    <div
      // Background with a weather-campus image
      className="min-h-screen bg-cover bg-center font-sans text-white"
      style={{
        backgroundImage:
          "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
      }}
    >
      {/* Blurred translucent overlay for better text readability */}
      <div
        className="fixed inset-0 z-0 backdrop-blur-lg bg-blue-500/30"
        style={{ height: '100vh', width: '100vw' }}
      />

      {/* Main content wrapper with max width and padding */}
      <div className="z-10 w-full min-h-screen max-w-[2800px] mx-auto flex flex-col lg:pr-10">
        {/* Sticky/fixed top NavigationBar with translucent background */}
        <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
          <NavigationBar />
        </div>

        {/* Main content container */}
        <div
          className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-7 sm:px-6 pb-20 space-y-6"
          style={{ minHeight: 'calc(100vh - 30px)', overflow: 'visible' }}
        >
          {/* Search bar for location input */}
          <SearchHeader />

          {/* Metric selection buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {Object.keys(graphOptions).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition duration-300 ${
                  selectedMetric === metric
                    ? 'bg-black text-white shadow' // Active style
                    : 'bg-gray-300 text-black hover:bg-gray-400' // Inactive style
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Widget Graph Card */}
          <div className="bg-white/80 text-black px-4 py-5 sm:p-8 rounded-2xl shadow-xl max-w-6xl mx-auto w-full border border-gray-300 overflow-visible">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              {selectedMetric} Over Time ({selectedOption.unit})
            </h2>

            {/* Widget graph rendering dynamic metric and time filter */}
            <Widget
              name={selectedMetric}
              dataKey={selectedOption.dataKey}
              unit={selectedOption.unit}
              GraphComponent={selectedOption.GraphComponent}
              timeFilter={selectedTimeFilter}
            />
          </div>

          {/* Additional info only shown on medium screens and up */}
          <div className="hidden md:block text-white max-w-6xl mx-auto space-y-5">
            <LocationDetails />
            <SunriseSunset />
          </div>
        </div>
      </div>
    </div>
  );
}
