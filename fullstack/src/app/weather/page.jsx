'use client';

import { useState } from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import LocationDetails from '../LandingPageComponents/LocationDetails';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import Widget from '@/components/widget';
import LineChartComponent from '@/components/graphs/LineChartComponent';

export default function WeatherDetails() {
  const [selectedMetric, setSelectedMetric] = useState('Temperature');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Hourly');

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
      className="min-h-screen bg-cover bg-center font-sans text-white"
      style={{
        backgroundImage:
          "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
      }}
    >

      <div
        className="fixed inset-0 z-0 backdrop-blur-lg bg-blue-500/30"
        style={{ height: '100vh', width: '100vw' }}
      />

        <div className="z-10 w-full min-h-screen max-w-[2800px] mx-auto flex flex-col lg:pr-10">

        
        <div className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 shadow">
          <NavigationBar />
        </div>

   
        <div
          className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-7 sm:px-6 pb-20 space-y-6"
          style={{ minHeight: 'calc(100vh - 30px)', overflow: 'visible' }}
        >
          <SearchHeader />

          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {Object.keys(graphOptions).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition duration-300 ${
                  selectedMetric === metric
                    ? 'bg-black text-white shadow'
                    : 'bg-gray-300 text-black hover:bg-gray-400'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          
          <div className="bg-white/80 text-black px-4 py-5 sm:p-8 rounded-2xl shadow-xl max-w-6xl mx-auto w-full border border-gray-300 overflow-visible">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              {selectedMetric} Over Time ({selectedOption.unit})
            </h2>

            <Widget
              name={selectedMetric}
              dataKey={selectedOption.dataKey}
              unit={selectedOption.unit}
              GraphComponent={selectedOption.GraphComponent}
              timeFilter={selectedTimeFilter}
            />
          </div>

          {/* Location Details and Sunrise/Sunset — Hidden on Mobile */}
          <div className="hidden md:block text-white max-w-6xl mx-auto space-y-5">
            <LocationDetails />
            <SunriseSunset />
          </div>
        </div>
      </div>
    </div>
  );
}
