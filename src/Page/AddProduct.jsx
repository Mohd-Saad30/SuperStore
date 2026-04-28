import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const categories = [
  'Sunglasses',
  'Mens Watch',
  'Ladies Sunglasses',
  'Premium sunglass'
];

const AddProduct = ({ setProducts }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: categories[0],
    name: '',
    price: '',
    originalPrice: '',
  });

  const [previewUrls, setPreviewUrls] = useState({
    image: null,
    galleryImg1: null,
    galleryImg2: null,
    galleryImg3: null,
    galleryImg4: null,
    galleryVideo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate Random ID
    const generatedId = Math.floor(10000 + Math.random() * 90000);

    const newProduct = {
      id: generatedId,
      category: formData.category,
      name: formData.name,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      image: previewUrls.image || 'https://via.placeholder.com/300?text=No+Image',
      gallery: [
        previewUrls.galleryImg1 || previewUrls.image,
        previewUrls.galleryImg2,
        previewUrls.galleryImg3,
        previewUrls.galleryImg4,
        previewUrls.galleryVideo
      ].filter(Boolean) // Filter out nulls
    };

    if (setProducts) {
      setProducts(prev => [newProduct, ...prev]);
    }
    
    alert('Product Added Successfully!');
    navigate('/admin');
  };

  const renderFileInput = (name, label, accept = "image/*", isVideo = false) => (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex-1 relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors text-center cursor-pointer">
          <input 
            type="file" 
            name={name} 
            accept={accept}
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            required={name === 'image'}
          />
          <span className="text-gray-500 text-sm">{previewUrls[name] ? 'File Selected - Click to change' : 'Click to upload file'}</span>
        </div>
        {previewUrls[name] && (
          <div className="w-16 h-16 shrink-0 rounded-lg border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
            {isVideo ? (
              <video src={previewUrls[name]} className="w-full h-full object-cover" />
            ) : (
              <img src={previewUrls[name]} alt="preview" className="w-full h-full object-cover" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black py-6 px-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
            <p className="text-gray-400 text-sm mt-1">Upload images and details for the new product.</p>
          </div>
          <Link to="/admin" className="text-white hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors">
            <span>←</span> Back to Admin
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* General Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">General Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  placeholder="e.g. Premium Aviator"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required
                  min="0"
                  placeholder="2401"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                <input 
                  type="number" 
                  name="originalPrice" 
                  value={formData.originalPrice} 
                  onChange={handleChange} 
                  required
                  min="0"
                  placeholder="10001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Media Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Media (File Uploads)</h3>
            
            {renderFileInput('image', 'Main Product Image (Front)', 'image/*')}

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4 mt-4">
              <h4 className="text-sm font-bold text-gray-700">Gallery Items</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFileInput('galleryImg1', 'Gallery Image 1', 'image/*')}
                {renderFileInput('galleryImg2', 'Gallery Image 2', 'image/*')}
                {renderFileInput('galleryImg3', 'Gallery Image 3', 'image/*')}
                {renderFileInput('galleryImg4', 'Gallery Image 4', 'image/*')}
              </div>

              <div className="pt-4 border-t border-gray-200 mt-4">
                {renderFileInput('galleryVideo', 'Gallery Video', 'video/*', true)}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex justify-center items-center gap-2 text-lg"
            >
              Add Product to Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
