import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';
import Admin from './Page/Admin';
import AddProduct from './Page/AddProduct';
import ManageProducts from './Page/ManageProducts';
import Navbar from './components/Navbar';
import CategoryButtons from './components/CategoryButtons';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import './App.css';

const Home = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory]);

  const filteredProducts = activeCategory === 'All Categories' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  return (
  
  <div className="bg-white min-h-screen font-sans flex flex-col">
    <Navbar />
    <CategoryButtons activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

    <div className="text-center mt-6 mb-10 px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-2">Trending Products</h2>
      <p className="text-gray-500 text-sm italic">Our trends that customers love!</p>
    </div>

 
    <main className="max-w-[95%] md:max-w-[80%] mx-auto px-2 flex-grow">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {displayedProducts.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onClick={() => setSelectedProduct(product)} 
          />
        ))}
      </div>
      
    
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-red-600  font-bold">
          No products available in this category.
        </div>
      )}

      {filteredProducts.length > visibleCount && (
        <div className="mt-12 mb-8 flex justify-center">
          <button 
            onClick={handleViewMore}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-md"
          >
            View More
          </button>
        </div>
      )}
    </main>
    
    {selectedProduct && (
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    )}

    
    <footer className="text-center mt-12 py-10 bg-black text-white w-full">
      <p className='text-sm'>© 2026 ChoiceStore. All rights reserved.</p>
    </footer>
  </div>
);
};

const App = () => {
  const [products, setProducts] = useState([]); // Initialized as empty

  // Fetch real data from DB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://super-store-backend.vercel.app/api/v1/products/all");
        // Your backend returns res.status(200).json(products), so res.data is the array
        setProducts(res.data); 
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home products={products} />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/add-product" element={<AddProduct setProducts={setProducts} />} />
      <Route path="/manage-products" element={<ManageProducts products={products} setProducts={setProducts} />} />
    </Routes>
  );
};

export default App;