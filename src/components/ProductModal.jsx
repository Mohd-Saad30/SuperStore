import React, { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
  
  const media = product.gallery && product.gallery.length >= 5 
    ? product.gallery 
    : [...Array(4).fill(product.image), "https://www.w3schools.com/html/mov_bbb.mp4"]; 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) {
      setQuantity(1);
    } else {
      setQuantity(val);
    }
  };

  const buyOnWhatsApp = () => {
    const msg = `*New Order*\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice: ₹${product.price}\nMedia: ${media[currentIndex]}`;
    window.open(`https://wa.me/9905763301?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Video check helper
  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/) || url.includes('video') || url.includes('mov_bbb');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-2 md:p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto relative rounded-sm shadow-2xl flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-8">
        
        <button onClick={onClose} className="absolute top-1 right-3 text-3xl md:text-4xl font-light text-gray-400 hover:text-black z-20">×</button>
        
        {/* LEFT: Media Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="relative bg-white aspect-square rounded-sm overflow-hidden flex items-center justify-center border border-gray-100 group">
            <button onClick={prevMedia} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <span className="text-xl">❮</span>
            </button>

            {isVideo(media[currentIndex]) ? (
              <video src={media[currentIndex]} controls autoPlay muted className="w-full h-full object-contain transition-all duration-500" />
            ) : (
              <img src={media[currentIndex]} alt="product" loading="lazy" className="w-full h-full object-contain transition-all duration-500" />
            )}

            <button onClick={nextMedia} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <span className="text-xl">❯</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-start md:justify-center">
            {media.map((item, i) => (
              <div key={i} onClick={() => setCurrentIndex(i)} className="relative shrink-0 cursor-pointer">
                {isVideo(item) ? (
                  <div className={`w-14 h-14 md:w-20 md:h-20 bg-gray-100 border-2 flex items-center justify-center ${currentIndex === i ? 'border-blue-500' : 'border-gray-100'}`}>
                    <span className="text-[9px] font-bold">VIDEO</span>
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                       <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <div className="border-t-[3px] border-t-transparent border-l-[6px] border-l-black border-b-[3px] border-b-transparent ml-1"></div>
                       </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item} 
                    alt="thumb"
                    loading="lazy"
                    className={`w-14 h-14 md:w-20 md:h-20 object-cover border-2 transition-all 
                      ${currentIndex === i ? 'border-blue-500' : 'border-gray-100 hover:opacity-60'}`} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="w-full md:w-1/2 flex flex-col pt-4">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 leading-tight">{product.name}</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#1a73e8] font-bold text-2xl md:text-3xl">₹ {product.price}</span>
            <span className="text-gray-400 line-through text-lg">₹ {product.originalPrice}</span>
            <span className="text-blue-500 text-sm font-semibold">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</span>
          </div>
          
          <p className="text-gray-500 text-sm mb-6">Availability: <span className="text-[#1a73e8] font-semibold">In Stock</span></p>
          
          <div className="mb-6">
            <p className="font-bold text-xs mb-3 uppercase tracking-wider text-gray-600">Small</p>
            {/* <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button key={size} className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 flex items-center justify-center text-sm hover:border-black transition-all">{size}</button>
              ))}
            </div> */}
          </div>

          <div className="mb-8">
            <p className="font-bold text-xs mb-2 uppercase text-gray-600">Quantity</p>
            <input 
              type="number" min="1" value={quantity} onChange={handleQuantityChange}
              className="w-20 h-10 border border-gray-300 text-center focus:outline-none font-medium" 
            />
          </div>

          <button 
            onClick={buyOnWhatsApp} 
            className="w-full bg-black text-white py-4 px-2 flex items-center justify-center gap-4 font-bold uppercase tracking-widest hover:bg-green-600 transition-all duration-300 shadow-lg"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-7 h-7 md:w-6 md:h-6 shrink-0" alt="wa" />
            <span className="text-sm md:text-base">Buy on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;