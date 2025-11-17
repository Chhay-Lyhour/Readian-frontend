import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// 1. Import your new modal component
import EditProfileModal from '../components/profile/EditProfileModal';

function ProfilePage({ currentUser, onLogout }) { // onLogout from App.jsx
  const [isEditing, setIsEditing] = useState(false);

  // --- Route Protection ---
  if (!currentUser) {
    return <Navigate to="/" replace />; // Redirect if not logged in
  }

  // Dummy function for updating profile (for now)
  const handleUpdateProfile = (updatedData) => {
    console.log("Profile updated:", updatedData);
    // In a real app:
    // 1. Send updatedData to your API.
    // 2. If successful, update the currentUser state in App.jsx
    //    (App.jsx would need a `setCurrentUser` prop passed down)
    // For now, we'll just log and close the modal.
    setIsEditing(false);
    alert("Profile changes saved (console log only)");
  };

  return (
    <div className="flex min-h-svh">
      {/* Sidebar (as seen in Image 1) */}
      <aside className="w-[320px] bg-[#C0FFB3] flex flex-col py-[50px] gap-[30px] min-h-svh">
        <h1 className="geist text-[36px] font-semibold text-center">Settings</h1>
        <div className="bg-white p-4 w-full ">
          <p className="text-[24px] font-bold text-center">My Account</p>
        </div>
      </aside>

      {/* Main Content (My Account details) */}
      <main className="w-[1500px]  p-[50px] bg-white ">
        <h1 className="geist text-4xl font-bold mb-8">My Account</h1>
        
        <div className="flex items-center gap-12">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center self-start">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              {currentUser.profileImage ? (
                <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs text-center">No Photo</span>
              )}
            </div>
            <p className="text-sm text-gray-600">Joined: {currentUser.joinedDate}</p>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-lg">
            <p className="font-semibold">Username:</p>
            <p>{currentUser.username}</p>
            
            <p className="font-semibold">Email:</p>
            <p>{currentUser.email}</p>
            
            <p className="font-semibold">Date of Birth:</p>
            <p>{currentUser.dob}</p>
            
            <p className="font-semibold">Subscribed:</p>
            <p>{currentUser.isSubscribed ? 'Yes' : 'No'}</p>

            {currentUser.isSubscribed ? (
              <p className='font-semibold'>Subscription Tier:</p>
            ) : (
              <div></div>
            )}
            {currentUser.isSubscribed ? (
              <p>{currentUser.subscriptionTier}</p>
            ) : (
              <div></div>
            )}
            
            <p className="font-semibold col-span-2">About Me:</p>
            <div
              className="col-span-2 w-full p-2 border rounded bg-gray-50 min-h-[6rem] whitespace-pre-line"
            >
              {currentUser.aboutMe || 'No description provided.'}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-gray-200 rounded-[15px] font-semibold hover:bg-gray-300"
          >
            Edit
          </button>
          <button 
            onClick={onLogout} // This comes from App.jsx
            className="px-6 py-2 bg-[#FFD7DF] text-[#FF0000] rounded-[15px] font-semibold hover:bg-[#FF0000] hover:text-white"
          >
            Logout
          </button>
        </div>
      </main>

      {/* The Edit Profile Modal */}
      {isEditing && (
        <EditProfileModal
          currentUser={currentUser}
          onClose={() => setIsEditing(false)}
          onSave={handleUpdateProfile} // Pass the save handler
        />
      )}
    </div>
  );
}

export default ProfilePage;