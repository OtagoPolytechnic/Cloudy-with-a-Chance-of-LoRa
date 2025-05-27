'use client';

import { useState, useEffect } from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LocationDetails from '../LandingPageComponents/LocationDetails';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
 
import Widget from '@/components/widget';
import LineChartComponent from '@/components/graphs/LineChartComponent';
import BarChartComponent from '@/components/graphs/BarChartComponent';
 
export default function WeatherDetails() {
  const [selectedGraph, setSelectedGraph] = useState('Temperature');
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
 
  const metricKeys = Object.keys(graphOptions);
  // const timeFilters = ['Hourly', '7 Days', '30 Days', 'Statistics'];
 
  const selectedOption = graphOptions[selectedGraph];
 
  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans relative text-white"
      style={{
        backgroundImage:
          "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-md z-0" />
 
      <div className="relative z-10 w-full max-w-[2800px] mx-auto flex flex-col min-h-screen">
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
          <NavigationBar />
        </div>
 
        {/* Main Content */}
        <div className="pt-24 px-4 sm:px-6 space-y-6">
          <SearchHeader />
 
          {/* Metric Selection */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {metricKeys.map((metric) => (
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
 
          {/* Time Filter Selection */}
          {/* <div className="flex justify-center gap-3 sm:gap-4">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedTimeFilter(filter)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedTimeFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-gray-300 text-black hover:bg-gray-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
  */}
          {/* Widget Display */}
          <div className="bg-white/80 text-black p-6 sm:p-8 rounded-2xl shadow-xl max-w-6xl mx-auto w-full border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedGraph} Over Time ({selectedOption?.unit})
            </h2>
 
            {selectedOption && (
              <Widget
                name={selectedGraph}
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
 