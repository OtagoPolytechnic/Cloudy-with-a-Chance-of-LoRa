import React, { useEffect, useState } from 'react';

const SunriseSunset = () => {
  const [sunTimes, setSunTimes] = useState({
    sunrise: 'Loading...',
    sunset: 'Loading...',
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setSunTimes({
        sunrise: 'Geolocation unsupported',
        sunset: 'Geolocation unsupported',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`,
          );
          const data = await res.json();

          if (data.status === 'OK') {
            const sunrise = new Date(data.results.sunrise);
            const sunset = new Date(data.results.sunset);
            const options = { hour: 'numeric', minute: '2-digit' };

            setSunTimes({
              sunrise: sunrise.toLocaleTimeString([], options),
              sunset: sunset.toLocaleTimeString([], options),
            });
          } else {
            setSunTimes({ sunrise: 'Unavailable', sunset: 'Unavailable' });
          }
        } catch (error) {
          console.error('Sunrise/Sunset fetch error:', error);
          setSunTimes({ sunrise: 'Fetch error', sunset: 'Fetch error' });
        }
      },
      (geoError) => {
        console.error('Geolocation error:', geoError);
        setSunTimes({
          sunrise: 'Permission denied',
          sunset: 'Permission denied',
        });
      },
    );
  }, []);

  return (
    <section
      aria-label="Sunrise and Sunset times"
      className="
        bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg
        sm:absolute sm:bottom-6 sm:right-6 sm:w-[300px] sm:h-[95px]
        relative w-full
      "
    >
      <h3 className="text-sm text-gray-300">Sunrise &amp; Sunset</h3>
      <p className="text-lg font-bold" aria-live="polite">
        <span role="img" aria-label="Sunrise">🌅</span>{' '}
        {sunTimes.sunrise} &nbsp;&nbsp;&nbsp;
        <span role="img" aria-label="Sunset">🌇</span>{' '}
        {sunTimes.sunset}
      </p>
    </section>
  );
};

export default SunriseSunset;
