
export default function SearchHeader() {
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
            <p className="text-gray-300 text-sm">Chance of rain 17%</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#2F2C5D] text-4xl font-bold">☀️</span>
            </div>
            <span className="text-6xl font-bold">31°</span>
          </div>
        </div>
      </header>
    );
  }
  