import React from "react";

const MoreConditions = () => {
  const airData = {
    feelsLike: "31°",
    wind: "4.61 km/h",
    chanceOfRain: "17%",
    uvIndex: "3",
  };

  return (
    <section className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl md:h-[300px] shadow-lg">
      <h2 className="text-xl font-semibold mb-4">More Conditions</h2>
      <div className="space-y-2 text-sm">
        <p>
          Feels Like: <span className="font-bold">{airData.feelsLike}</span>
        </p>
        <p>
          Wind: <span className="font-bold">{airData.wind}</span>
        </p>
        <p>
          Chance of Rain: <span className="font-bold">{airData.chanceOfRain}</span>
        </p>
        <p>
          UV Index: <span className="font-bold">{airData.uvIndex}</span>
        </p>
      </div>
    </section>
  );
};

export default MoreConditions;
