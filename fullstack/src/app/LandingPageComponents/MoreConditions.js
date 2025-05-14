import React from "react";
import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";

const MoreConditions = () => {
  const router = useRouter(); 

  const airData = [
    { label: "Feels Like", value: "31°" },
    { label: "Wind", value: "4.61 km/h" },
    { label: "Chance of Rain", value: "17%" },
    { label: "UV Index", value: "3" },
  ];

  return (
    <section className="relative bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl md:h-[340px] md:w-[835px] shadow-lg mt-8">
      {/* Top-right button */}
      <button
        onClick={() => router.push("/weather")}
        className="absolute top-4 right-4 flex items-center gap-1 text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-xs transition"
        title="More Info"
      >
        <Cloud className="w-4 h-4" />
        More Info
      </button>

      <div className="flex items-center justify-between space-x-4">
        {/* Left side with title and extra info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">More Conditions</h2>
          <p className="text-gray-300 text-sm">Details about weather conditions</p>
        </div>

        {/* Right side with temperature info */}
        <div className="flex flex-col items-center justify-center text-center">
          </div>
        </div>
     

      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {airData.map((item, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md text-white rounded-xl p-4 shadow-lg flex flex-col items-center justify-center text-center"
          >
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-lg font-bold mt-1">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreConditions;
