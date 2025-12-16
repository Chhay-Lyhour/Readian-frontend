 import React from 'react';

function UserRemovalCompletePopup({ user, reason, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md text-center animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">✅ Removal Complete</h2>
        <p className="mb-6 text-gray-700">
          User <strong className="text-[#1A5632]">{user.username || user.name}</strong> has been successfully removed.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="text-sm font-semibold text-gray-700 mb-1">Reason:</p>
          <p className="text-sm text-gray-600">{reason}</p>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full bg-[#1A5632] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#00A819] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default UserRemovalCompletePopup;