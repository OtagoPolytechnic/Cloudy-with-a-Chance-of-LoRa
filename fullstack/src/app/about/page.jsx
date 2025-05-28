'use client';

import Image from 'next/image';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import SearchHeader from '../LandingPageComponents/SearchHeader';
import SunriseSunset from '../LandingPageComponents/SunriseSunset';
import LocationDetails from '../LandingPageComponents/LocationDetails';

export default function AboutPage() {
  const crewImages = ['crew1.jpg', 'crew2.jpg', 'crew3.jpg', 'crew4.jpg'];

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

          {/* 3-column responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About Project */}
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg text-white leading-relaxed text-justify space-y-4">
              <h1 className="text-2xl font-bold mb-2">🌦️ About Our Weather Station</h1>
              <p>
                This project was a student-built weather station designed to meet the
                requirements outlined by our lecturer. It showcases the integration of
                LoRaWAN technology and the Internet of Things (IoT) to collect and
                transmit real-time environmental data.
              </p>
              <p>
                Our weather station uses various sensors to measure key conditions such as:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Temperature</li>
                <li>Humidity</li>
                <li>Wind speed</li>
                <li>And more...</li>
              </ul>
              <p>
                Using LoRaWAN, this data is sent wirelessly over long distances to a
                central server where it can be processed and visualized.
              </p>
              <p>
                The goal is to deepen understanding of communication protocols, IoT, and
                environmental monitoring through hands-on development and testing.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl text-white/90 space-y-4">
              <h2 className="text-xl font-bold mb-2">❓ FAQ</h2>
              {[
                {
                  q: 'What sensors are used?',
                  a: 'XC3702 Barometric, XC3780 Dust Sensor, Duinotech Air Quality Sensor',
                },
                {
                  q: 'How often is data updated?',
                  a: 'The data is updated constantly in real time.',
                },
                {
                  q: 'What does the platform offer?',
                  a: 'Remote monitoring, analysis, and insights from real-world data.',
                },
                {
                  q: 'More questions?',
                  a: 'Talk to our team or visit the FAQ section online.',
                },
                {
                  q: 'Device location?',
                  a: 'On the roof of the Polytech’s D-Block.',
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-4"
                >
                  <summary className="cursor-pointer font-semibold text-white">
                    {q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{a}</p>
                </details>
              ))}
            </div>

           <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg space-y-4">
  <h2 className="text-xl font-bold text-white text-center mb-2">
    📸 Highlights
  </h2>
  <div className="grid grid-cols-2 gap-3">
    {crewImages.map((img, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-xl border border-white/20 group aspect-[4/3]"
      >
        <div className="relative w-full h-0 pb-[75%]"> {/* 4:3 aspect ratio */}
          <Image
            src={`/images/Crew/${img}`}
            alt={`Crew member ${i + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-xl"
          />
        </div>
      </div>
      
    ))}
  </div>
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
