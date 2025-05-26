'use client';
import NavigationBar from "./LandingPageComponents/NavigationBar";
import SearchHeader from "./LandingPageComponents/SearchHeader";
import TodayForecast from "./LandingPageComponents/TodayForecast";
import MoreConditions from "./LandingPageComponents/MoreConditions";
import SevenDayForecast from "./LandingPageComponents/SevenDayForecast";
import SunriseSunset from "./LandingPageComponents/SunriseSunset";
import LocationDetails from "./LandingPageComponents/LocationDetails";
import ClothingSuggestionIcons from "./LandingPageComponents/ClothingSuggestionIcons";

export default function WeatherDashboard() {
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white relative font-sans bg-cover bg-center"
      style={{
        backgroundImage: "url('https://living-future.org/wp-content/uploads/2022/10/2-5-scaled.jpg')",
      }}
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg z-0" />

      {/* Max Size Wrapper */}
      <div className="relative z-10 w-full h-full max-w-[2800px] mx-auto overflow-auto flex flex-col">
   {/* Only show NavigationBar on large screens and up */}
<div className="pt -20">
  <NavigationBar />
</div>


        {/* Main Content */}
        <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-10 sm:px-6 pb-6 -mt-6 space-y-6">
          <SearchHeader />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side */}
            <div className="flex-1 flex flex-col gap-3 pb-0 lg:pb-40">
              <TodayForecast />
              <MoreConditions />
            </div>

            {/* Right side */}
            <div className="flex flex-col sm:flex-row lg:flex-row xl:flex-row gap-6">
              <div className="hidden sm:block flex-1">
                <ClothingSuggestionIcons />
              </div>
              <div className="flex-1 sm:pb-0">
                <SevenDayForecast />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
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


