const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-[95%] md:max-w-[80%] mx-auto py-4 flex justify-between items-center">
      
        <div className="flex items-center gap-4">
          <div className="bg-[#e67e22] text-white px-3 py-2 font-bold text-xl leading-none">
            LH
          </div>
        </div>

        
        <ul className="hidden md:flex gap-10">
          <li><button className="text-blue-600 font-bold text-sm uppercase">HOME</button></li>
          <li><button className="text-gray-800 font-bold text-sm uppercase">MY ORDER</button></li>
        </ul>

     
      </nav>
    </header>
  );
};

export default Navbar;