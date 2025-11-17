// src/components/PaymentSuccessPopup.jsx
import React from 'react';

function PaymentSuccessPopup({ onConfirm }) {
  return (
    // Full-screen overlay
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* Popup box (matches image_f87aee.png) */}
      <div className="bg-white p-8 rounded-lg shadow-xl text-center" style={{ backgroundColor: '#F0EBE6' }}>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'monospace' }}>
          Payment Complete!
        </h1>
        <p className="text-lg mb-6">
          Your payment was successful!
        </p>
        <button
          onClick={onConfirm}
          className="bg-white text-black font-bold py-2 px-8 rounded-lg shadow hover:bg-gray-100"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessPopup;