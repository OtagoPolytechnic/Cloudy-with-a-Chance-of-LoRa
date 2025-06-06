'use client';

import NavigationBar from './LandingPageComponents/NavigationBar';
import SearchHeader from './LandingPageComponents/SearchHeader';
import TodayForecast from './LandingPageComponents/TodayForecast';
import MoreConditions from './LandingPageComponents/MoreConditions';
import SevenDayForecast from './LandingPageComponents/SevenDayForecast';
import SunriseSunset from './LandingPageComponents/SunriseSunset';
import LocationDetails from './LandingPageComponents/LocationDetails';
import ClothingSuggestionIcons from './LandingPageComponents/ClothingSuggestionIcons';

export default function WeatherDashboard() {
  return (
    <div
      // Fullscreen container with gradient and background image
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white relative font-sans bg-cover bg-center z-0"
      style={{
        backgroundImage:
          "url('https://living-future.org/wp-content/uploads/2022/10/2-5-scaled.jpg')",
      }}
    >
      {/* Blurred overlay for softening the background image */}
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg z-0" />

      {/* Main wrapper container for layout with max width */}
      <div className="relative z-10 w-full min-h-screen max-w-[2800px] mx-auto overflow-auto flex flex-col lg:pr-10">
        {/* NavigationBar only shown on large screens */}
        <div className="pt -20">
          <NavigationBar />
        </div>

        {/* Main content container */}
        <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-10 sm:pt-3 sm:px-6 pb-6 -mt-6 space-y-6">
          {/* Search bar positioned with spacing compensation for overlapping sections */}
          <div className="-mt-10 sm:mt-0 pt-10">
            <SearchHeader />
          </div>

          {/* Main layout split into two vertical sections on large screens */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section: Today's Weather and Conditions */}
            <div className="flex-1 flex flex-col gap-3 pb-0 lg:pb-40">
              <TodayForecast />
              <MoreConditions />
            </div>

            {/* Right Section: Clothing Suggestions and 7-Day Forecast */}
            <div className="flex flex-col sm:flex-row lg:flex-row xl:flex-row gap-6">
              {/* Clothing suggestions shown only on medium screens and up */}
              <div className="hidden sm:block flex-1">
                <ClothingSuggestionIcons />
              </div>
              {/* 7-Day forecast component */}
              <div className="flex-1 sm:pb-0">
                <SevenDayForecast />
              </div>
            </div>
          </div>

          {/* Bottom section: Location details and sunrise/sunset */}
          <div className="mt-auto flex flex-col sm:flex-row gap-6 pt-4">
            <div className="w-full sm:flex-1">
              <LocationDetails />
            </div>
            <div className="w-full sm:flex-1">
              <SunriseSunset />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
