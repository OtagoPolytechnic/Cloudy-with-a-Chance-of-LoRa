'use client';

import Link from 'next/link';
import NavigationBar from '../LandingPageComponents/NavigationBar';
import Image from 'next/image';

//AboutPage component displays project information and FAQs
export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-blue-200/40 backdrop-blur-xl">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-xl"
        style={{
          backgroundImage: `url('/images/OP-pic.jpg')`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* fixed nav bar on the left side of page */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavigationBar />
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Blue card section */}
        <div className=" w-full flex flex-col md:flex-row items-center justify-center gap-6 px-8 py-10">
          <h1 className="text-2xl font-bold text-black text-center">
            About Us
          </h1>
          <div className="w-40 h-40 md:w-48 md:h-48 relative">
            <Image
              src="/images/OP_shield_2009.gif"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-32">
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-8">
            {/* Project description box */}
            <div className="bg-black/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-white md:w-[835px] p-8 pt-4 text-justify leading-relaxed">
              <p className="first-letter:text-2xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                This project was a student-built weather station designed to
                meet the requirements outlined by our lecturer. It showcases the
                integration of LoRaWAN technology and the Internet of Things
                (IoT) to collect and transmit real-time environmental data.
              </p>
              <p className="mt-4">
                Our weather station uses various sensors to measure key
                conditions such as:
              </p>

              {/* List of sensor types */}
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li> Temperature</li>
                <li> Humidity</li>
                <li> Wind speed</li>
                <li> And more...</li>
              </ul>

              {/* Description of data transmission using LoRaWAN */}
              <p className="mt-4">
                Using LoRaWAN (Long Range Wide Area Network), this data is sent
                wire lessly over long distances to a central server where it can
                be processed, stored, and visualized. This approach allows for
                low-power, long-range communication, making the system ideal for
                remote or outdoor locations.
              </p>

              {/* Project goals */}
              <p className="mt-4">
                The primary goal of this project is not only to meet technical
                criteria, but to deepen our understanding of modern
                communication protocols, IoT infrastructure, and environmental
                monitoring through hands-on development and testing.
              </p>
            </div>

            {/* FAQ Section */}
            {/* Using 'details' for collapsable questions */}
            <div className="w-full md:max-w-md space-y-4">
              <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
                <summary className="cursor-pointer font-semibold">
                  What sensors are used in the system?
                </summary>
                <p className="mt-2 text-sm leading-relaxed">
                  XC3702 Barometric Pressure Sensor, XC3780 Duinotech Arduino
                  Compatible Dust Sensor, Duinotech Arduino Compatible Air
                  Quality Sensor
                </p>
              </details>

              <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
                <summary className="cursor-pointer font-semibold">
                  How often is the data updated?
                </summary>
                <p className="mt-2 text-sm leading-relaxed">
                  The data is updated constantly in real time.
                </p>
              </details>

              <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
                <summary className="cursor-pointer font-semibold">
                  What does it mean to be a part of this platform?
                </summary>
                <p className="mt-2 text-sm leading-relaxed">
                  Being part of our platform means you can remotely monitor,
                  analyze, and receive insights from real-world weather and
                  environmental data.
                </p>
              </details>

              <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
                <summary className="cursor-pointer font-semibold">
                  What if I have more questions?
                </summary>
                <p className="mt-2 text-sm leading-relaxed">
                  Feel free to talk to our development team or refer to the FAQ
                  section on the website.
                </p>
              </details>

              <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
                <summary className="cursor-pointer font-semibold">
                  Where is the weather sensor device located?
                </summary>
                <p className="mt-2 text-sm leading-relaxed">
                  It is located on the roof of the Polytech's D-Block.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
