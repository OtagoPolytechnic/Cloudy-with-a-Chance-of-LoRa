import { useState, useEffect } from 'react';

export default function ClothingSuggestionIcons({ currentTemp = 22 }) {
  const suggestions = [
    {
      icon: '🧥',
      label: 'Jacket',
      tempRange: '0°–10°C',
      bg: 'bg-blue-400/30', // Soft blue background with more opacity for inactive state
      isMatch: (temp) => temp <= 10,
    },
    {
      icon: '🧣',
      label: 'Layer Up',
      tempRange: '10°–18°C',
      bg: 'bg-purple-400/30', // Soft purple background for inactive state
      isMatch: (temp) => temp > 10 && temp <= 18,
    },
    {
      icon: '👕',
      label: 'Light Wear',
      tempRange: '18°–26°C',
      bg: 'bg-yellow-400/30', // Soft yellow background for inactive state
      isMatch: (temp) => temp > 18 && temp <= 26,
    },
    {
      icon: '🩳',
      label: 'Relaxing',
      tempRange: '26°C+',
      bg: 'bg-orange-400/30', // Soft orange background for inactive state
      isMatch: (temp) => temp > 26,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = suggestions.findIndex((s) => s.isMatch(currentTemp));
    setActiveIndex(index !== -1 ? index : 0);
  }, [currentTemp]);

  return (
    <div className="grid grid-cols-2 gap-4 p-6 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg w-[640px] h-[557px]">
      {suggestions.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 transition-all duration-300 ${
              isActive
                ? 'bg-white/80 text-black border border-white/20 shadow-xl scale-105' // Active state: white background, black text, and "glass" effect (backdrop blur)
                : `${item.bg} text-white opacity-60 border border-white/20` // Inactive state: soft background color with reduced opacity and subtle border
            }`}
          >
            <span className="text-4xl mb-2">{item.icon}</span>
            <span className="text-sm font-semibold">{item.label}</span>
            <span className="text-xs">{item.tempRange}</span>
          </div>
        );
      })}
    </div>
  );
}
