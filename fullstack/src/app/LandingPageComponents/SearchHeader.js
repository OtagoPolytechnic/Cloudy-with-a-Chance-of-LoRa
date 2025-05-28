import React, { useEffect, useState } from 'react';
import dummyWeatherData from '../Dummy Data/dummyWeatherData';
import { FaBars, FaMapMarkerAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import NavigationBar from '../LandingPageComponents/NavigationBar';
// import { fetchHumidityData } from '@/components/widget'; // Update the path as needed

export default function SearchHeader() {
  /*
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const getHumidity = async () => {
      try {
        const humidityValue = await fetchHumidityData();
        setHumidity(humidityValue);
      } catch (error) {
        console.error('Error fetching humidity:', error);
      }
    };

    getHumidity();
    const interval = setInterval(getHumidity, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

*/
  const hourlyData = dummyWeatherData['Hourly'];
  const latestData = hourlyData.slice(-1)[0];
  const temperature = latestData?.temperature ?? 0;

  const rainCount = hourlyData.filter((data) => data.rain > 0).length;
  const rainChance = Math.round((rainCount / hourlyData.length) * 100);

  const condition =
    temperature >= 30
      ? 'Hot'
      : temperature >= 22
      ? 'Warm'
      : temperature >= 15
      ? 'Clear'
      : temperature >= 5
      ? 'Rain'
      : 'Snowing';

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
          placeholder="Search for Locations..."
          className="w-full max-w-[200px] h-[33px] p-3 pl-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white focus:outline-none mb-4 ml-14"
        />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>Otago Polytechnic</span>
              <FaMapMarkerAlt className="text-xs" />
            </div>
            <p className="text-sm">Chance of rain: {rainChance}%</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-[#2F2C5D] text-3xl font-bold">
                  {icon}
                </span>
              </div>
              <div>
                <span className="text-5xl font-bold">{temperature}°</span>
                <p className="text-sm">{condition}</p>
                 {/*  <p className="text-sm">Humidity: {humidity ?? 'Loading...'}%</p> */}
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
            placeholder="Search for Locations..."
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white focus:outline-none"
          />
          <div>
            <h1 className="text-3xl font-semibold tracking-wide">
              Otago Polytechnic
            </h1>
            <p className="text-sm">Chance of rain: {rainChance}%</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#2F2C5D] text-4xl font-bold">{icon}</span>
            </div>
            <div>
              <span className="text-6xl font-bold">{temperature}°</span>
              <p className="text-sm">{condition}</p>
            {/*   <p className="text-sm">Humidity: {humidity ?? 'Loading...'}%</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
