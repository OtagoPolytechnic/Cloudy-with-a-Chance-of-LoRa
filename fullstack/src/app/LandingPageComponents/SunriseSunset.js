import React, { useEffect, useState } from "react";

const SunriseSunset = () => {
  const [sunTimes, setSunTimes] = useState({
    sunrise: "Loading...",
    sunset: "Loading...",
  });

  useEffect(() => {
    // Fetch user's geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Call the Sunrise-Sunset API
          const res = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
          );
          const data = await res.json();

          if (data.status === "OK") {
            // Convert UTC to local time
            const sunrise = new Date(data.results.sunrise);
            const sunset = new Date(data.results.sunset);

            const options = {
              hour: "numeric",
              minute: "2-digit",
            };

            setSunTimes({
              sunrise: sunrise.toLocaleTimeString([], options),
              sunset: sunset.toLocaleTimeString([], options),
            });
          } else {
            setSunTimes({
              sunrise: "Unavailable",
              sunset: "Unavailable",
            });
          }
        } catch (error) {
          setSunTimes({
            sunrise: "Error",
            sunset: "Error",
          });
        }
      },
      () => {
        setSunTimes({
          sunrise: "Permission denied",
          sunset: "Permission denied",
        });
      }
    );
  }, []);

  return (
    <div
      className="
        bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg
        sm:absolute sm:bottom-6 sm:right-6 sm:w-[300px] sm:h-[95px]
        relative w-full
      "
    >
      <h3 className="text-sm text-gray-300">Sunrise & Sunset</h3>
      <p className="text-lg font-bold">
        🌅 {sunTimes.sunrise} &nbsp;&nbsp;&nbsp; 🌇 {sunTimes.sunset}
      </p>
    </div>
  );
};

export default SunriseSunset;
