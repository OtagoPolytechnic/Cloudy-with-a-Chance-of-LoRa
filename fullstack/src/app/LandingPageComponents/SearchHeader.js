import dummyWeatherData from "../Dummy Data/dummyWeatherData";

export default function SearchHeader() {
  const hourlyData = dummyWeatherData["Hourly"];
  const latestData = hourlyData.slice(-1)[0]; // get last hourly data point
  const temperature = latestData?.temperature ?? 0;
  
  // Calculate the chance of rain
  const rainCount = hourlyData.filter((data) => data.rain > 0).length;
  const rainChance = Math.round((rainCount / hourlyData.length) * 100); // rounded percentage of hours with rain
  
  // Derive condition from temperature value
  const condition =
    temperature >= 30
      ? "Hot"
      : temperature >= 22
      ? "Warm"
      : temperature >= 15
      ? "Clear"
      : temperature >= 5
      ? "Rain"
      : "Snowing";

  // Weather condition icon mapping
  const conditionIconMap = {
    Clear: "☀️",
    Rain: "🌧️",
    Warm: "🌤️",
    Hot: "🔥",
    Snowing: "❄️",
  };

  const icon = conditionIconMap[condition] || "🌦️";

  return (
    <header className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 h-[300px] flex items-center justify-between shadow-lg">
      <div className="w-2/5 space-y-4">
        <input
          type="text"
          placeholder="Search for Locations..."
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-wide">
            Otago Polytechnic
          </h1>
          <p className="text-gray-300 text-sm">Chance of rain: {rainChance}%</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-[#2F2C5D] text-4xl font-bold">{icon}</span>
          </div>
          <div>
            <span className="text-6xl font-bold">{temperature}°</span>
            <p className="text-gray-200 text-sm">{condition}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
