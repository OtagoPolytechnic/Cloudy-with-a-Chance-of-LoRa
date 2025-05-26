// Import necessary hooks from React
import React, { useEffect, useState } from 'react';

// LocationDetails Component
export default function LocationDetails() {
  // Local state to store the location info (city, country, and datetime)
  const [location, setLocation] = useState({
    city: 'Loading...',     // Default message while fetching
    country: '',
    datetime: ''
  });

  // useEffect hook runs on component mount (empty dependency array [])
  useEffect(() => {
    // Async function to reverse geocode coordinates using OpenStreetMap's Nominatim API
    const fetchLocation = async (lat, lon) => {
      try {
        // Fetch location info from OpenStreetMap's reverse geocoding API
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json(); // Parse JSON response

        // Try to extract city/town/village name from the response
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown"; // fallback if all fields are missing

        // Extract country name
        const country = data.address.country || "";

        // Format current date and time (in NZ locale, adjust as needed)
        const now = new Date();
        const dateTimeStr = now.toLocaleString('en-NZ', {
          month: 'long',   // Full month name
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        });

        // Update state with fetched location and formatted datetime
        setLocation({
          city,
          country,
          datetime: dateTimeStr,
        });
      } catch (error) {
        // If reverse geocoding fails, show fallback data
        setLocation({
          city: 'Unavailable',
          country: '',
          datetime: new Date().toLocaleString(), // fallback local time
        });
      }
    };

    // Request the user's current position using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords; // Destructure lat/lon
        fetchLocation(latitude, longitude); // Reverse geocode the location
      },
      (error) => {
        // If location access is blocked/denied, show fallback message
        setLocation({
          city: 'Location Blocked',
          country: '',
          datetime: new Date().toLocaleString(), // fallback local time
        });
      }
    );
  }, []); // Runs only once on initial render

  // Render the location info in a styled container
  return (
    <div
      className="
        bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg
        sm:absolute sm:bottom-6 sm:left-6 sm:w-[300px] sm:h-[95px]
        relative w-full
      "
    >
      {/* Heading */}
      <h3 className="text-sm text-gray-300">Current Location</h3>
      {/* City and Country */}
      <p className="text-lg font-bold">
        {location.city}, {location.country}
      </p>
      
      {/* Date and Time */}
      <p className="text-sm text-gray-300">{location.datetime}</p>
    </div>
  );
}
