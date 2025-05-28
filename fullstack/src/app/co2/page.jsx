'use client';

import { useState, useEffect } from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LineChartComponent from '../Dummy Data/LineChartComponent';
import dummyWeatherData from '../Dummy Data/dummyWeatherData';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import LocationDetails from '../LandingPageComponents/LocationDetails';
import Widget from '@/components/widget';
import BarChartComponent from '@/components/graphs/BarChartComponent';

export default function CO2Page() {
  const [selectedMetric, setSelectedMetric] = useState('CO2');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Hourly');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const graphOptions = {
    CO2: {
      dataKey: 'co2',
      unit: 'ppm',
      GraphComponent: LineChartComponent,
    },
    Gas: {
      dataKey: 'gas',
      unit: 'ppm',
      GraphComponent: LineChartComponent,
    },
    Dust: {
      dataKey: 'dust',
      unit: 'µg/m³',
      GraphComponent: BarChartComponent,
    },
    Pressure: {
      dataKey: 'pressure',
      unit: 'hPa',
      GraphComponent: LineChartComponent,
    },
  };

  const metricKeys = Object.keys(graphOptions);
  const selectedOption = graphOptions[selectedMetric];

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans relative text-white"
      style={{
        backgroundImage:
          "url('https://hub.op.ac.nz/assets/newsandevents/DUNEDIN-CAMPUS-HUB_100123_6__ScaleMaxWidthWzEwMDBd.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-md z-0" />

      <div className="relative z-10 w-full min-h-screen max-w-[2800px] mx-auto overflow-auto flex flex-col lg:pr-10">
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
          <NavigationBar />
        </div>

        {/* Main Content */}
          <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-7 sm:px-6 pb-6 space-y-6">
          <SearchHeader />

          {/* Metric Selection */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {metricKeys.map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition duration-300 ${
                  selectedMetric === metric
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-300 text-black hover:bg-gray-400'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Chart Display */}
          <div className="bg-white/80 text-black p-6 sm:p-8 rounded-2xl shadow-xl max-w-6xl mx-auto w-full border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedMetric} Over Time ({selectedOption?.unit})
            </h2>

            {selectedOption && (
              <Widget
                name={selectedMetric}
                dataKey={selectedOption.dataKey}
                unit={selectedOption.unit}
                GraphComponent={selectedOption.GraphComponent}
                timeFilter={selectedTimeFilter}
              />
            )}
          </div>

          {/* Extra Info */}
          <div className="text-white w-full max-w-6xl mx-auto space-y-4">
            <LocationDetails />
            <SunriseSunset />
          </div>
        </div>
      </div>
    </div>
  );
}
