import React from 'react';

function UserRemovalCompletePopup({ user, reason, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Removal complete</h2>
        <p className="mb-4">
          User Done
          <strong>{user.username}</strong> has been successfully removed for: <strong>{reason}</strong>.
        </p>
        
        <button 
          onClick={onConfirm}
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-black/10 hover:text-black transition-all duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default UserRemovalCompletePopup;