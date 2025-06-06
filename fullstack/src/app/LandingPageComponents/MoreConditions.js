'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Cloud } from 'lucide-react';
import { useSummarySensorData } from '@/components/useSummarySensorData'; 

const MoreConditions = () => {
  const router = useRouter();

  // Live data from hook
  const { temperature, windSpeed, rainChance, uvIndex } = useSummarySensorData() ?? {};

  // Default values
  const defaultTemperature = 20;
  const defaultWindSpeed = 5;
  const defaultRainChance = 0;
  const defaultUvIndex = 3;

  // Calculate values with fallback
  const tempValue = temperature ?? defaultTemperature;
  const windValue = windSpeed ?? defaultWindSpeed;
  const rainPercent = rainChance ?? defaultRainChance;
  const uvValue = uvIndex ?? defaultUvIndex;

  // Prepare display data
  const airData = [
    { label: 'Feels Like', value: `${tempValue}°` },
    { label: 'Wind', value: `${windValue} km/h` },
    { label: 'Chance of Rain', value: `${rainPercent}` },
    { label: 'UV Index', value: `${uvValue}` },
  ];

  return (
    <section className="relative bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl md:h-[320px] md:w-[835px] shadow-lg mt-8">
      <button
        onClick={() => router.push('/weather')}
        className="absolute top-4 right-4 flex items-center gap-1 text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-xs transition"
        title="More Info"
      >
        <Cloud className="w-4 h-4" />
        More Info
      </button>

      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">More Conditions</h2>
          <p className="text-gray-300 text-sm">Details about weather conditions</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center"></div>
      </div>

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
