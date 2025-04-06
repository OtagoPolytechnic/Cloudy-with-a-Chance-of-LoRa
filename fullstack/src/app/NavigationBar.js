// NavigationBar.js
'use client'; 
import { Home, Cloud, Settings, Info } from "lucide-react";

export default function NavigationBar() {
  return (
    <nav className="absolute top-6 left-6 w-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl flex flex-col items-center py-4 space-y-6 h-[815px]">
      {[Home, Cloud, Settings, Info].map((Icon, i) => (
        <button key={i} className="p-3 rounded-xl hover:bg-white/30 transition duration-300 ease-in-out">
          <Icon size={20} className="text-white" />
        </button>
      ))}
    </nav>
  );
}
