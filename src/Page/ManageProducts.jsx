import React, { useState } from 'react';
import { Link } from 'react-router';

const ManageProducts = ({ products, setProducts }) => {
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const categories = ['All Categories', 'Sunglasses', 'Mens Watch', 'Ladies Sunglasses', 'Premium sunglass'];

  const filteredProducts = activeCategory === 'All Categories' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-red-600 py-6 px-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Delete Products</h2>
            <p className="text-red-100 text-sm mt-1">Manage and remove products from your store.</p>
          </div>
          <Link to="/admin" className="text-white hover:text-red-200 font-medium text-sm flex items-center gap-2 transition-colors">
            <span>←</span> Back to Admin
          </Link>
        </div>

        {/* Category Filters */}
        <div className="p-6 border-b bg-gray-50 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? 'bg-black text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product List */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm relative group">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-40 object-contain mb-4" />
                <h3 className="font-bold text-gray-800 text-center text-sm mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{product.category}</p>
                <div className="flex items-center gap-2 mb-4">
                   <span className="font-bold">₹{product.price}</span>
                </div>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="w-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-lg font-semibold transition-colors mt-auto"
                >
                  Delete Product
                </button>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                No products found in this category.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageProducts;
