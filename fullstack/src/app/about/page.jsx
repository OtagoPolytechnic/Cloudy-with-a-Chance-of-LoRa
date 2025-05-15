'use client';

import Link from "next/link";
import NavigationBar from "../LandingPageComponents/NavigationBar";

export default function AboutPage() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1E1B47] to-[#2F2C5D] text-white font-sans bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/background-aboutpage.jpg")`,
      }}
    >

      {/* <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-lg z-0"></div> */}


      <div className="z-10 w-full">
        <NavigationBar />
      </div>

      <main className="z-10 flex flex-col items-center justify-center flex-1 p-6">
        <section>
          
        </section>
        <div className="border-2 border-black bg-white text-black rounded-xl p-8 text-center max-w-md shadow-lg">
          <h1 className="text-2xl font-bold mb-4">🚧 About In Maintenance</h1>
          <p className="mb-6">Please return later.</p>
          <Link href="/">
            <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Return Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
