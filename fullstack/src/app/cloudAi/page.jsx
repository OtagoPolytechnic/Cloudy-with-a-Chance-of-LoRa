'use client';

import React from 'react';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import CloudDetails from '@/components/cloud';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import LocationDetails from '../LandingPageComponents/LocationDetails';

export default function AIPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white relative font-sans bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://living-future.org/wp-content/uploads/2022/10/2-5-scaled.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg z-0" />

      <div className="relative z-10 w-full min-h-screen max-w-[2800px] mx-auto overflow-auto flex flex-col lg:pr-10">
        <div className="pt-4">
          <NavigationBar />
        </div>

        <div className="relative z-10 flex flex-col flex-1 ml-0 lg:ml-28 px-4 pt-3 sm:px-6 pb-6 space-y-6">
          <SearchHeader />

          {/* Responsive container that stacks vertically on mobile */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cloud Analysis Widget */}
            <div className="w-full lg:max-w-xl bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
              <CloudDetails />
            </div>



            {/* About Section */}
            <div className="w-full lg:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl text-white/90 space-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <h2 className="text-xl font-bold tracking-tight text-white mb-2">
                🔍 About Cloud Details
              </h2>

              <p className="text-sm leading-relaxed">
                This AI-powered cloud recognition tool uses a deep learning model to analyze images and classify cloud types such as{' '}
                <span className="font-medium text-white">cumulus</span>,{' '}
                <span className="font-medium text-white">stratus</span>,{' '}
                <span className="font-medium text-white">cirrus</span>, and{' '}
                <span className="font-medium text-white">nimbostratus</span>.
              </p>

              <p className="text-sm leading-relaxed">
                Just drag and drop a cloud image, or use the provided test image. The model will analyze and return the predicted cloud type, often accompanied by a short explanation.
              </p>

              <p className="text-sm leading-relaxed text-white/80 italic">
                Note: This tool is experimental and intended for educational or exploratory use. Results may not always be precise — consider verifying with official meteorological resources.
              </p>
            </div>
              <div className="text-white w-full max-w-6xl mx-auto space-y-4">
            <LocationDetails />
            <SunriseSunset />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
