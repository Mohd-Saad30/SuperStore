import React from 'react';

const ProductCard = ({ product, onClick }) => {
  const sendWhatsApp = (e) => {
    e.stopPropagation(); // Image click ko rokne ke liye
    const msg = `*Order Inquiry*\nProduct: ${product.name}\nPrice: ₹${product.price}\nImage: ${product.image}`;
    window.open(`https://wa.me/9905763301?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div onClick={onClick} className="bg-white border border-gray-100 p-4 flex flex-col group transition-all hover:shadow-2xl cursor-pointer">
      <div className="bg-[#fcfcfc] aspect-square flex items-center justify-center mb-4 overflow-hidden relative">
        <img src={product.image} alt={product.name} loading="lazy" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 text-[13px] font-medium mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-black font-bold text-lg">₹ {product.price}.00</span>
          <span className="text-gray-400 line-through text-xs">₹ {product.originalPrice}.00</span>
        </div>
        <p className="text-gray-400 text-[11px] mb-4 uppercase">Small </p>
        <button onClick={sendWhatsApp} className="w-full bg-[#1a73e8] hover:bg-green-600 text-white text-[10px] font-bold py-3 uppercase tracking-widest transition-all">
          Inquiry on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;