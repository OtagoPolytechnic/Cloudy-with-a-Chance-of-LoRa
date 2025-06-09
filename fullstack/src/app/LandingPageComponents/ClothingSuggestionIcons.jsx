import { useState, useEffect } from 'react';
import { useSummarySensorData } from '@/components/useSummarySensorData';

export default function ClothingSuggestionIcons() {
  const { temperature, isLoading, error, rainChance } = useSummarySensorData();

 
  const temp = typeof temperature === 'number' ? temperature : 22;

  const suggestions = [
    {
      icon: '🧥',
      label: 'Jacket',
      tempRange: '0°–10°C',
      bg: 'bg-blue-400/30',
      isMatch: (t) => t <= 10,
    },
    {
      icon: '🧣',
      label: 'Layer Up',
      tempRange: '10°–18°C',
      bg: 'bg-purple-400/30',
      isMatch: (t) => t > 10 && t <= 18,
    },
    {
      icon: '👕',
      label: 'Light Wear',
      tempRange: '18°–26°C',
      bg: 'bg-yellow-400/30',
      isMatch: (t) => t > 18 && t <= 26,
    },
    {
      icon: '🩳',
      label: 'Relaxing',
      tempRange: '26°C+',
      bg: 'bg-orange-400/30',
      isMatch: (t) => t > 26,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = suggestions.findIndex((s) => s.isMatch(temp));
    return idx !== -1 ? idx : 0;
  });

  useEffect(() => {
    if (!isLoading && !error) {
      if (rainChance === 'Likely') {
        setActiveIndex(0); 
      } else {
        const index = suggestions.findIndex((s) => s.isMatch(temp));
        setActiveIndex(index !== -1 ? index : 0);
      }
    }
  }, [temp, isLoading, error, rainChance]);

  return (
    <div className="grid grid-cols-2 gap-4 p-6 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg w-[640px] h-[557px]">
      {suggestions.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 transition-all duration-300 ${
              isActive
                ? 'bg-white/80 text-black border border-white/20 shadow-xl scale-105'
                : `${item.bg} text-white opacity-60 border border-white/20`
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
