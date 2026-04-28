

import React from 'react';

const Navbar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-[95%] md:max-w-[80%] mx-auto py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="bg-[#e67e22] text-white px-3 py-2 font-bold text-xl leading-none">
            LH
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10">
          <li><button className="text-blue-600 font-bold text-sm uppercase">HOME</button></li>
          <li><button className="text-gray-800 font-bold text-sm uppercase">MY ORDER</button></li>
        </ul>

        {/* Icons & Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6 text-gray-700">
          <button className="text-xl">🔍</button>
          <button className="text-xl hidden md:block">👤</button>
          <div className="relative">
            <button className="text-2xl">🛒</button>
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </div>
          {/* Mobile Hamburger Icon */}
          <button className="md:hidden border p-1 rounded text-2xl">☰</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;