'use client';
import { useState, useEffect } from "react";
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white relative font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('https://living-future.org/wp-content/uploads/2022/10/2-5-scaled.jpg')" }}>

      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg"></div>

      <NavigationBar />
      <div className="flex flex-col flex-1 ml-28 p-6 space-y-6">
        <SearchHeader />

        <div className="flex flex-row space-x-6">
          <div className="flex-1">
            <TodayForecast />
            <MoreConditions />
          </div>

        <ClothingSuggestionIcons />
            <SevenDayForecast />
   
        </div>

      </div>

      <LocationDetails />
      <SunriseSunset />
    </div>
  );
}
