import React from 'react';

function RemoveBookPopup({ book, reason, setReason, onConfirm, onAbort }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Are you sure?</h2>
        <p className="text-center mb-4">
          You are about to remove <strong>{book.title}</strong>. 
          Please provide a reason before confirming.
        </p>
        
        <label htmlFor="reason" className="block mb-2 font-semibold">Reason</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded-lg h-24 mb-4"
          placeholder="Enter reason for removal..."
        />
        
        <div className="flex justify-between">
          <button 
            onClick={onConfirm}
            className="bg-red-500 text-[#FFD7DF] font-bold py-2 px-6 rounded-lg hover:bg-[#FFD7DF] hover:text-[#FF0000] transition-all duration-300"
          >
            Confirm
          </button>
          <button 
            onClick={onAbort}
            className="bg-gray-200 text-black font-bold py-2 px-6 rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            Abort
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveBookPopup;