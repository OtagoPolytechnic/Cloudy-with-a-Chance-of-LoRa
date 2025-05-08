// LocationDetails.js
import React from 'react';

export default function LocationDetails() {
  return (
    <div className="absolute bottom-6 left-6 w-[300px] bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg">
      <h3 className="text-sm text-gray-300">Current Location</h3>
      <p className="text-lg font-bold">Dunedin, NZ</p>
      <p className="text-sm text-gray-300">April 6, 2025 — 3:21 PM</p>
    </div>
  );
}
