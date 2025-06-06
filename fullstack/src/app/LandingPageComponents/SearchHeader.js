'use client';

import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useSummarySensorData } from '@/components/useSummarySensorData';

export default function SearchHeader() {
  const { humidity, temperature, rainChance } = useSummarySensorData();

  // Fallback defaults if data is missing or null/undefined
  const rainChanceStr = rainChance ?? 'Unlikely'; // default to 'Unlikely'
  const rainPercent = rainChanceStr === 'Likely' ? 70 : 0; // default 0% rain if no data

  const tempValue = temperature !== null && temperature !== undefined ? Math.round(temperature) : 20; // default 20°C
  const humidityValue = humidity !== null && humidity !== undefined ? Math.round(humidity) : 5; // default 5%

const condition =
  tempValue < 5
    ? 'Snowing'
    : rainChanceStr === 'Likely'
    ? 'Rain'
    : tempValue >= 30
    ? 'Hot'
    : tempValue >= 22
    ? 'Warm'
    : tempValue >= 15
    ? 'Clear'
    : 'Clear';

  const conditionIconMap = {
    Clear: '☀️',
    Rain: '🌧️',
    Warm: '🌤️',
    Hot: '🔥',
    Snowing: '❄️',
  };

  const icon = conditionIconMap[condition] || '🌦️';

  return (
    <div className="text-white">
      {/* Mobile layout */}
      <div className="block sm:hidden w-full p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-[180px] h-[33px] p-2 pl-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white focus:outline-none mb-4 ml-14"
        />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>Otago Polytechnic</span>
              <FaMapMarkerAlt className="text-xs" />
            </div>
            <p className="text-sm">Chance of rain: {rainPercent}%</p>
            <p className="text-sm">Humidity: {humidityValue}%</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-[#2F2C5D] text-3xl font-bold">{icon}</span>
              </div>
              <div>
                <span className="text-5xl font-bold">{tempValue}°</span>
                <p className="text-sm">{condition}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex w-full justify-between items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 h-[300px] shadow-lg">
        <div className="w-2/5 space-y-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-[70%] max-w-sm p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white focus:outline-none"
          />
          <div>
            <h1 className="text-3xl font-semibold tracking-wide">Otago Polytechnic</h1>
            <p className="text-sm">Chance of rain: {rainPercent}%</p>
            <p className="text-sm">Humidity: {humidityValue}%</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#2F2C5D] text-4xl font-bold">{icon}</span>
            </div>
            <div>
              <span className="text-6xl font-bold">{tempValue}°</span>
              <p className="text-sm">{condition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
