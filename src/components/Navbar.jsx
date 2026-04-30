const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-[95%] md:max-w-[80%] mx-auto py-4 flex justify-between items-center">
      
        <div className="flex items-center gap-4">
         <div className="h-12 w-16 flex items-center justify-center overflow-hidden">
    <img 
      src="src\assets\LOGO.jpeg"
      alt="Choice Store Logo" 
      className="max-h-full max-w-full object-contain" 
    />
  </div>
        </div>




      </nav>
    </header>
  );
};

export default Navbar;