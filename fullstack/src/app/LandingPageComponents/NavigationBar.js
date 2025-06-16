'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Cloud, Settings, Info, Menu, Bot } from 'lucide-react'; // ✅ Import icons

// Define navigation items with icon components and paths
const navItems = [
  { icon: Home, path: '/' },
  { icon: Cloud, path: '/weather' },
  { icon: Settings, path: '/co2' },
  { icon: Bot, path: '/cloudAi' },
  { icon: Info, path: '/about' },
];

export default function NavigationBar() {
  const pathname = usePathname(); // Get current path for active link detection
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu open/close

  // Handle link click: delay closing menu to allow animation to complete before unmount
  const handleLinkClick = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <>
      {/* Desktop Full Nav (visible on md and larger screens) */}
      <nav className="hidden md:flex fixed top-6 left-6 w-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl flex-col items-center py-3 space-y-4 h-[700px] z-20">
        {navItems.map(({ icon: Icon, path }, i) => {
          // Determine if nav item is active based on current pathname
          const isActive =
            pathname === path || (pathname === '/' && path === '/');
          return (
            <Link href={path} key={i}>
              {/* Button styled as icon container, highlighting active state */}
              <button
                className={`p-2 rounded-lg transition duration-300 ease-in-out ${
                  isActive ? 'bg-white/65 text-black' : 'hover:bg-white/30'
                }`}
                aria-current={isActive ? 'page' : undefined} // Accessibility: mark active page
              >
                {/* Render icon with color depending on active state */}
                <Icon
                  size={16}
                  className={isActive ? 'text-black' : 'text-white'}
                />
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Mobile toggle button (visible below md, hidden when menu open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)} // Open mobile menu on click
          className="md:hidden absolute top-10 ml-5 left-6 z-40 p-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-xl text-white hover:bg-white/40 transition"
          aria-label="Open menu" // Accessibility label
        >
          <Menu size={14} /> {/* Hamburger icon */}
        </button>
      )}

      {/* Overlay behind the mobile menu, click closes the menu */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } z-25`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile sliding menu */}
      <nav
        className={`
          md:hidden fixed top-0 left-0 h-full w-48 bg-blue-900/10 backdrop-blur-lg border-r border-blue-700/20 shadow-lg flex flex-col items-start py-6 px-6 space-y-6 z-30 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
        `}
      >
        {navItems.map(({ icon: Icon, path }, i) => {
          // Determine if nav item is active based on current pathname
          const isActive =
            pathname === path || (pathname === '/' && path === '/');
          return (
            <Link href={path} key={i} onClick={handleLinkClick}>
              {/* Button styled as full width menu item */}
              <button
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition duration-300 ease-in-out ${
                  isActive
                    ? 'bg-white/80 text-black'
                    : 'hover:bg-white/30 text-white'
                }`}
                aria-current={isActive ? 'page' : undefined} // Accessibility: mark active page
              >
                {/* Icon container with background color based on active state */}
                <span
                  className={`flex items-center justify-center rounded-full ${
                    isActive ? 'bg-white' : 'bg-white/90'
                  }`}
                  style={{ width: 28, height: 28 }}
                >
                  {/* Render icon with color depending on active state */}
                  <Icon
                    size={16}
                    className={isActive ? 'text-black' : 'text-gray-800'}
                  />
                </span>
                {/* Text label for the nav item, capitalizes first letter of path */}
                <span className="text-base font-semibold select-none">
                  {path === '/'
                    ? 'Home'
                    : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </span>
              </button>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
