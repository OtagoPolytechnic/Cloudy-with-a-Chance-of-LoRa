'use client';

import Link from "next/link";
import NavigationBar from "../LandingPageComponents/NavigationBar";
import SearchHeader from "../LandingPageComponents/SearchHeader";  // Import SearchHeader

export default function WeatherDetails() {
  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white relative font-sans bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://auckland.op.ac.nz/assets/newsandevents/CORP_campus_CampusBuildings_009-v3__FillWzcxNSw0NTRd.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg z-0" />

      {/* Left-side Navigation Bar */}
      <div className="sticky top-0 z-20">
        <NavigationBar />
      </div>

      {/* Main Page Content */}
      <div className="flex flex-col flex-1 ml-28 p-6  z-10 overflow-y-auto max-h-screen">
        {/* Search Header (Sticky) */}
        <div className="rounded-xl sticky top-0 z-10 mb-8">
          <SearchHeader />
        </div>

         {/* Content Container*/}
        <div className="bg-white/70 text-black rounded-xl p-8 shadow-lg w-full h-[43vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Weather Details</h2>
        </div>
      </div>
    </div>
  );
}
