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
    <section className="absolute bottom-6 right-6 w-[300px] bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg">
      <h3 className="text-sm font-semibold mb-2">Sunrise & Sunset</h3>
      <p>🌅 Sunrise: {sunTimes.sunrise}</p>
      <p>🌇 Sunset: {sunTimes.sunset}</p>
    </section>
  );
};

export default SunriseSunset;
