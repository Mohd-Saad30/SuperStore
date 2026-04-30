import React, { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
  // Use the main image as the first item, then add the gallery
  const media = [product.image, ...(product.gallery || [])];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextMedia = () => setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  const prevMedia = () => setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  const buyOnWhatsApp = () => {
    const msg = `*New Order*\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice: ₹${product.price}\nLink: ${window.location.origin}`;
    window.open(`https://wa.me/9905763301?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const isVideo = (url) => {
    if (!url) return false;
    // Cloudinary video URLs usually contain /video/upload/ or end in video extensions
    return url.includes('/video/upload/') || url.match(/\.(mp4|webm|mov|ogg)$/);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 md:p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto relative rounded-sm shadow-2xl flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-8">
        
        <button onClick={onClose} className="absolute top-1 right-3 text-3xl font-light text-gray-400 hover:text-black z-20">×</button>
        
        {/* Media Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="relative bg-white aspect-square rounded-sm overflow-hidden flex items-center justify-center border border-gray-100 group">
            {media.length > 1 && (
              <>
                <button onClick={prevMedia} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md z-10">❮</button>
                <button onClick={nextMedia} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md z-10">❯</button>
              </>
            )}

            {isVideo(media[currentIndex]) ? (
              <video src={media[currentIndex]} controls autoPlay muted className="w-full h-full object-contain object-cover" />
            ) : (
              <img src={media[currentIndex]} alt="product" className="w-full h-full object-contain object-cover" />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {media.map((item, i) => (
              <div key={i} onClick={() => setCurrentIndex(i)} className={`relative shrink-0 cursor-pointer border-2 ${currentIndex === i ? 'border-blue-500' : 'border-transparent'}`}>
                {isVideo(item) ? (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-[10px] font-bold">VIDEO</div>
                ) : (
                  <img src={item} alt="thumb" className="w-16 h-16 object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col pt-4">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#1a73e8] font-bold text-2xl">₹ {product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-gray-400 line-through">₹ {product.originalPrice}</span>
                <span className="text-blue-500 text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>
          
          <p className="text-gray-500 text-sm mb-6">Availability: <span className="text-green-600 font-semibold">In Stock</span></p>

          <div className="mb-8">
            <p className="font-bold text-xs mb-2 uppercase text-gray-600">Quantity</p>
            <input 
              type="number" min="1" value={quantity} onChange={handleQuantityChange}
              className="w-20 h-10 border border-gray-300 text-center focus:outline-none" 
            />
          </div>

          <button 
            onClick={buyOnWhatsApp} 
            className="w-full bg-black text-white py-4 flex items-center justify-center gap-4 font-bold uppercase hover:bg-green-600 transition-all shadow-lg"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="wa" />
            <span>Buy on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;