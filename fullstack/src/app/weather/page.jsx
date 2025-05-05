'use client';
import Link from "next/link";

export default function WeatherPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white p-6 bg-gray-900">
      <div className="border-2 border-black bg-white text-black rounded-xl p-8 text-center max-w-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4">🚧 Weather Details In Maintenance</h1>
        <p className="mb-6">Please return later.</p>
        <Link href="/">
          <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Return Home
          </button>
        </Link>
      </div>
    </main>
  );
}
