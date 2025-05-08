'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Cloud, Settings, Info } from "lucide-react";

const navItems = [
  { icon: Home, path: "/" },
  { icon: Cloud, path: "/weather" },
  { icon: Settings, path: "/co2" },
  { icon: Info, path: "/about" },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="absolute top-6 left-6 w-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl flex flex-col items-center py-4 space-y-6 h-[815px]">
      {navItems.map(({ icon: Icon, path }, i) => {
        const isActive = pathname === path || (pathname === "/" && path === "/");

        return (
          <Link href={path} key={i}>
            <button
              className={`p-3 rounded-xl transition duration-300 ease-in-out ${
                isActive ? "bg-white/65 text-black" : "hover:bg-white/30"
              }`}
            >
              <Icon size={20} className={isActive ? "text-black" : "text-white"} />
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
