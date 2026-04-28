import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Admin from './Page/Admin';
import AddProduct from './Page/AddProduct';
import ManageProducts from './Page/ManageProducts';
import Navbar from './components/Navbar';
import CategoryButtons from './components/CategoryButtons';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import './App.css';

import img1 from './assets/image1.jpeg';
import img2 from './assets/image2.jpeg';
import img3 from './assets/image3.jpeg';
import img4 from './assets/image4.png';
import myVideo from './assets/video.mp4';

const baseProducts = [
  { 
    id: 1, 
    category: 'Sunglasses', 
    name: 'Premium Rectangle Sunglasses', 
    price: 2401, 
    originalPrice: 10001, 
    image: img4, // Main image set ki
    gallery: [
      img1,    // Image 1
      img2,    // Image 2
      img3,    // Image 3
      img4,    // Image 4
      myVideo  // 1 Video (5th position)
    ] 
  },
  { 
    id: 2, 
    category: 'Mens Watch', 
    name: 'Rolex Oyster Perpetual', 
    price: 5500, 
    originalPrice: 15000, 
    image: 'https://m.media-amazon.com/images/I/61-vRq2ulOL._SX679_.jpg', 
    gallery: [
      'https://m.media-amazon.com/images/I/61-vRq2ulOL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71ZpTfBCHEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/618S0y7pPEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61t7qK6N-YL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 3, 
    category: 'Ladies Sunglasses', 
    name: 'Prada Luxury Shades', 
    price: 2101, 
    originalPrice: 10001, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pafV04OVQbmAbZwpUdwf2Yj9sYHTdE-e6A&s', 
    gallery: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pafV04OVQbmAbZwpUdwf2Yj9sYHTdE-e6A&s',
      'https://m.media-amazon.com/images/I/51p6y-xQ9UL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51zX-J6eTFL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51GzS0F+5HL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 4, 
    category: 'Premium sunglass', 
    name: 'Dior Gold Edition', 
    price: 2401, 
    originalPrice: 10001, 
    image: 'https://www.chokore.com/cdn/shop/files/CHKSM_28_1.jpg?v=1711109272', 
    gallery: [
      'https://www.chokore.com/cdn/shop/files/CHKSM_28_1.jpg?v=1711109272',
      'https://m.media-amazon.com/images/I/51p6y-xQ9UL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51zX-J6eTFL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51GzS0F+5HL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 5, 
    category: 'Mens Watch', 
    name: 'Titan Neo Classic', 
    price: 851, 
    originalPrice: 10001, 
    image: 'https://www.titan.co.in/on/demandware.static/-/Sites-titan-master-catalog/default/dw051612ee/images/Titan/Catalog/1825KM03_1.jpg', 
    gallery: [
      'https://www.titan.co.in/on/demandware.static/-/Sites-titan-master-catalog/default/dw051612ee/images/Titan/Catalog/1825KM03_1.jpg',
      'https://m.media-amazon.com/images/I/71ZpTfBCHEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/618S0y7pPEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61t7qK6N-YL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 6, 
    category: 'Sunglasses', 
    name: 'Premium Rectangle Sunglasses', 
    price: 2401, 
    originalPrice: 10001, 
    image: img4, // Main image set ki
    gallery: [
      img1,    // Image 1
      img2,    // Image 2
      img3,    // Image 3
      img4,    // Image 4
      myVideo  // 1 Video (5th position)
    ] 
  },
  { 
    id: 7, 
    category: 'Mens Watch', 
    name: 'Rolex Oyster Perpetual', 
    price: 5500, 
    originalPrice: 15000, 
    image: 'https://m.media-amazon.com/images/I/61-vRq2ulOL._SX679_.jpg', 
    gallery: [
      'https://m.media-amazon.com/images/I/61-vRq2ulOL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71ZpTfBCHEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/618S0y7pPEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61t7qK6N-YL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 8, 
    category: 'Ladies Sunglasses', 
    name: 'Prada Luxury Shades', 
    price: 2101, 
    originalPrice: 10001, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pafV04OVQbmAbZwpUdwf2Yj9sYHTdE-e6A&s', 
    gallery: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pafV04OVQbmAbZwpUdwf2Yj9sYHTdE-e6A&s',
      'https://m.media-amazon.com/images/I/51p6y-xQ9UL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51zX-J6eTFL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51GzS0F+5HL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 9, 
    category: 'Premium sunglass', 
    name: 'Dior Gold Edition', 
    price: 2401, 
    originalPrice: 10001, 
    image: 'https://www.chokore.com/cdn/shop/files/CHKSM_28_1.jpg?v=1711109272', 
    gallery: [
      'https://www.chokore.com/cdn/shop/files/CHKSM_28_1.jpg?v=1711109272',
      'https://m.media-amazon.com/images/I/51p6y-xQ9UL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51zX-J6eTFL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/51GzS0F+5HL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
  { 
    id: 10, 
    category: 'Mens Watch', 
    name: 'Titan Neo Classic', 
    price: 851, 
    originalPrice: 10001, 
    image: 'https://www.titan.co.in/on/demandware.static/-/Sites-titan-master-catalog/default/dw051612ee/images/Titan/Catalog/1825KM03_1.jpg', 
    gallery: [
      'https://www.titan.co.in/on/demandware.static/-/Sites-titan-master-catalog/default/dw051612ee/images/Titan/Catalog/1825KM03_1.jpg',
      'https://m.media-amazon.com/images/I/71ZpTfBCHEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/618S0y7pPEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61t7qK6N-YL._SX679_.jpg',
      'https://www.w3schools.com/html/mov_bbb.mp4' // 1 Video
    ] 
  },
];

const dummyData = Array.from({ length: 100 }, (_, index) => {
  const base = baseProducts[index % baseProducts.length];
  return {
    ...base,
    id: index + 1,
    name: `${base.name} - Model ${index + 1}`
  };
});

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
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <CategoryButtons activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <div className="text-center mt-12 mb-10 px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Trending Products</h2>
        <p className="text-gray-500 text-sm italic">Our trends that customers love!</p>
      </div>

      <main className="max-w-[95%] md:max-w-[80%] mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {displayedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)} 
            />
          ))}
        </div>
        
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

      <footer className="text-center mt-12 py-10 bg-black">
        <p className='text-white text-sm'>© 2026 ChoiceStore. All rights reserved.</p>
        <p className='text-white text-sm'>Made with ❤️ by ChoiceStore</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('storeProducts');
    return saved ? JSON.parse(saved) : dummyData;
  });

  useEffect(() => {
    localStorage.setItem('storeProducts', JSON.stringify(products));
  }, [products]);

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