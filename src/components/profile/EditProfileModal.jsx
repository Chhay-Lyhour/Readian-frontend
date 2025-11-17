import React, { useState, useEffect } from 'react';

function EditProfileModal({ currentUser, onClose, onSave }) {
  // --- Form State (initialized with current user data) ---
  const [username, setUsername] = useState(currentUser.username || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [dob, setDob] = useState(currentUser.dob || '');
  const [aboutMe, setAboutMe] = useState(currentUser.aboutMe || '');
  const [profileImage, setProfileImage] = useState(currentUser.profileImage || null); // Can be URL or File object

  // For password, you usually don't pre-fill it for security
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle image upload (very basic for now)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For mock data, we can convert it to a URL
      setProfileImage(URL.createObjectURL(file)); 
      // In a real app, you'd upload this file to a server
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const updatedData = {
      username,
      email,
      dob,
      aboutMe,
      profileImage, // This could be a new URL or base64 string
      // Only include password if it was changed
      ...(password && { password }) 
    };
    onSave(updatedData); // Send data to parent to handle actual saving
  };

  return (
    // Overlay for the modal
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full">
      <div className="bg-white px-8 py-4 rounded-lg shadow-xl w-[600px] relative">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit My Account</h2>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-800"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} >
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs text-center">Upload Photo</span>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
              id="profile-pic-upload"
            />
            <label 
              htmlFor="profile-pic-upload" 
              className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Upload Photo
            </label>
            <p className="text-sm text-gray-600 mt-2">Joined: {currentUser.joinedDate}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
              <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} // Changed to text for easy mock date format
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password (optional):</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">About Me:</label>
              <textarea id="aboutMe" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none" />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 text-center">
            <button type="submit" className="px-8 py-3 bg-[#1A5632] text-[#FFD7DF] rounded-[15px] font-bold hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;