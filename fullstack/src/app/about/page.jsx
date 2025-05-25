'use client';

import Link from "next/link";
import NavigationBar from "../LandingPageComponents/NavigationBar";
import Image from "next/image";


export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-blue-200/40 backdrop-blur-xl">
      <div className="absolute inset-0 -z-10 bg-cover bg-center blur-xl"
           style={{ 
            backgroundImage: `url('/images/OP-pic.jpg')`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            }}>
      </div>
      <div className="fixed top-0 left-0 w-full z-50">
        <NavigationBar />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Blue card section */}
        <div className=" w-full flex flex-col md:flex-row items-center justify-center gap-6 px-8 py-10">
          <h1 className="text-2xl font-bold text-black text-center">About Us</h1>
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
        <div className="bg-black/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-white md:h-[280px] md:w-[835px] p-8 pt-4 text-justify leading-relaxed">
        <p className="first-letter:text-2xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
        The goal of this project is to build a weather station that fits the requirements set out by our lecturer. We are ustilising the LoRaWAN and Internet of Things to collect and send our sensor data to somewhere we can process the data. 
        </p>
        </div>

      <div className="md:w-1/2 space-y-4">
      <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
        <summary className="cursor-pointer font-semibold">How do you read the weather?</summary>
        <p className="mt-2 text-sm leading-relaxed">You will have access to a personalized dashboard where you can track data, make updates, and manage your sensor configurations.</p>
      </details>

      <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
        <summary className="cursor-pointer font-semibold">Is the content on this website available in other languages?</summary>
        <p className="mt-2 text-sm leading-relaxed">We currently support English but plan to add more language options in future updates.</p>
      </details>

      <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
        <summary className="cursor-pointer font-semibold">What does it mean to be a part of our platform?</summary>
        <p className="mt-2 text-sm leading-relaxed">Being part of our platform means you can remotely monitor, analyze, and receive insights from real-world weather and environmental data.</p>
      </details>

      <details className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white">
        <summary className="cursor-pointer font-semibold">What if I have more questions?</summary>
        <p className="mt-2 text-sm leading-relaxed">Feel free to contact our support team or refer to the FAQ section in your dashboard for more guidance.</p>
      </details>
      </div>
        </div>
      </div>
    </div>
    </div>
  );
}
// bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl md:h-[280px] md:w-[835px] shadow-lg pt-4 mt-8"