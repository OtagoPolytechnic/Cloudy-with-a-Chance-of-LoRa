'use client';

import Link from "next/link";
import NavigationBar from "../LandingPageComponents/NavigationBar";
import Image from "next/image";


export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-blue-200/40 backdrop-blur-xl">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavigationBar />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Blue card section */}
        <div className="bg-[#c7e4f5] w-full flex flex-col md:flex-row items-center justify-center gap-6 px-8 py-10">
          <h1 className="text-2xl font-bold text-black text-center">About Us</h1>
          <div className="w-40 h-40 md:w-48 md:h-48 relative">
            <Image
              src="/images/OP-logo.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-32">
        <div className="bg-white text-black rounded-xl p-8 shadow-lg text-justify leading-relaxed text-base">
        <p className="first-letter:text-2xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
            About text here. 
        </p>
        </div>
        </div>
      </div>
    </div>
  );
}
