import React from 'react';

function RemoveBookPopup({ book, reason, setReason, onConfirm, onAbort }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">⚠️ Confirm Removal</h2>
        <p className="text-center mb-6 text-gray-700">
          You are about to remove <strong className="text-red-600">"{book.title}"</strong>.
          This action cannot be undone. Please provide a reason.
        </p>
        
        <label htmlFor="reason" className="block mb-2 text-sm font-semibold text-gray-800">
          Reason for Removal *
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg h-24 mb-6 resize-none focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-all"
          placeholder="Enter reason for removal..."
          required
        />
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            disabled={!reason.trim()}
            className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Confirm Removal
          </button>
          <button 
            onClick={onAbort}
            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveBookPopup;