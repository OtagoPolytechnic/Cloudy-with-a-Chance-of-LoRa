'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Cloud } from 'lucide-react';
import { useSummarySensorData } from '@/components/useSummarySensorData';

const MoreConditions = () => {
  const router = useRouter(); // Next.js router for navigation

  // Destructure sensor data using custom hook, fallback to empty object if undefined
  const {
    temperature,
    wind,
    rainChance,
    humidity,
    uvIndex,
  } = useSummarySensorData() ?? {};

  // Default fallback values for data in case sensor data is unavailable
  const defaultTemperature = 20;
  const defaultWind = 5;
  const defaultRainChance = 'Unlikely';
  const defaultUVIndex = 3;

  // Use sensor values or fallbacks
  const tempValue = temperature ?? defaultTemperature;
  const windValue = wind ?? defaultWind;
  const rainStr = rainChance ?? defaultRainChance;
  const uvValue = uvIndex ?? defaultUVIndex;

  // Data array for easier rendering of weather conditions
  const airData = [
    { label: 'Feels Like', value: `${tempValue}°` },
    { label: 'Wind', value: `${windValue} km/h` },
    { label: 'Chance of Rain', value: rainStr },
    { label: 'UV Index', value: `${uvValue}` },
  ];

  return (
    <section className="relative bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl md:h-[320px] md:w-[835px] shadow-lg mt-8">
      {/* Button to navigate to detailed weather page */}
      <button
        onClick={() => router.push('/weather')}
        className="absolute top-4 right-4 flex items-center gap-1 text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-xs transition"
        title="More Info"
      >
        <Cloud className="w-4 h-4" />
        More Info
      </button>

      {/* Header section */}
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">More Conditions</h2>
          <p className="text-gray-300 text-sm">Details about weather conditions</p>
        </div>
        {/* Empty div for potential future content or alignment */}
        <div className="flex flex-col items-center justify-center text-center"></div>
      </div>

      {/* Grid layout for weather details */}
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
