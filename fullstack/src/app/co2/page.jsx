'use client';

import { useState } from 'react';

import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LocationDetails from '../LandingPageComponents/LocationDetails';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import Widget from '@/components/widget';
import LineChartComponent from '@/components/graphs/LineChartComponent';
import BarChartComponent from '@/components/graphs/BarChartComponent';

export default function CO2Page() {
  // Track the currently selected metric
  const [selectedMetric, setSelectedMetric] = useState('CO2');

  // Track the selected time granularity (can be expanded later)
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Hourly');

  // Configurations for each graph type and its unit
  const graphOptions = {
    CO2: {
      dataKey: 'co2',
      unit: 'ppm',
      GraphComponent: BarChartComponent,
    },
    Gas: {
      dataKey: 'gas',
      unit: 'ppm',
      GraphComponent: BarChartComponent,
    },
    Dust: {
      dataKey: 'dust',
      unit: 'µg/m³',
      GraphComponent: LineChartComponent,
    },
    Pressure: {
      dataKey: 'pressure',
      unit: 'hPa',
      GraphComponent: LineChartComponent,
    },
  };

  // Get selected graph settings
  const selectedOption = graphOptions[selectedMetric];

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans text-white"
      style={{
        backgroundImage:
          "url('https://hub.op.ac.nz/assets/newsandevents/DUNEDIN-CAMPUS-HUB_100123_6__ScaleMaxWidthWzEwMDBd.jpg')",
      }}
    >
      {/* Blurred overlay for improved readability */}
      <div className="fixed inset-0 z-0 backdrop-blur-lg bg-blue-500/30" />

      {/* Main layout wrapper */}
      <div className="relative z-10 w-full min-h-screen max-w-[2800px] mx-auto flex flex-col">
        {/* Sticky navigation bar at top */}
        <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
          <NavigationBar />
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-7 sm:px-6 pb-6 space-y-6">
          {/* Search bar for location-based data */}
          <SearchHeader />

          {/* Metric selection buttons (CO2, Gas, Dust, Pressure) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {Object.keys(graphOptions).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-2.5 rounded-full font-semibold text-sm transition duration-300 ${
                  selectedMetric === metric
                    ? 'bg-black text-white shadow' // Active button
                    : 'bg-gray-300 text-black hover:bg-gray-400' // Inactive button
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Chart display card */}
          <div className="bg-white/80 text-black p-6 sm:p-8 rounded-2xl shadow-xl max-w-6xl mx-auto w-full border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedMetric} Over Time ({selectedOption.unit})
            </h2>

            {/* Render dynamic chart based on selected metric */}
            <Widget
              name={selectedMetric}
              dataKey={selectedOption.dataKey}
              unit={selectedOption.unit}
              GraphComponent={selectedOption.GraphComponent}
              timeFilter={selectedTimeFilter}
            />
          </div>

          {/* Extra environmental details (desktop only) */}
          <div className="hidden md:block text-white max-w-6xl mx-auto space-y-5">
            <LocationDetails />
            <SunriseSunset />
          </div>
        </div>
      </div>
    </div>
  );
}
