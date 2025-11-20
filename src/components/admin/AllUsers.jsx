import React, { useState, useMemo } from 'react';
import { allUsersData } from '../../data/mockUser';
import { allBooksData } from '../../data/mockData';

// Import your new popup components
import RemoveUserPopup from './RemoveUserPopup';
import UserRemovalCompletePopup from './UserRemovalCompletePopup';

function AllUsers() {
  // --- Filter State ---
  const [usernameFilter, setUsernameFilter] = useState('');
  const [idFilter, setIdFilter] = useState('');

  // --- Popup State ---
  const [userToRemove, setUserToRemove] = useState(null);
  const [reason, setReason] = useState('');
  const [showComplete, setShowComplete] = useState(false);

  // 1. Process and filter the user data
  const displayUsers = useMemo(() => {
    // First, map users to include their work count
    const usersWithWorkCount = allUsersData.map(user => {
      // Find all books where the authorId matches this user's id
      const workCount = allBooksData.filter(
        book => book.authorId === user.id
      ).length;
      return { ...user, workCount }; // Return a new object
    });

    // Now, apply the filters
    return usersWithWorkCount
      .filter(user =>
        (user.username || "").toLowerCase().includes(usernameFilter.toLowerCase())
      )
      .filter(user =>
        (user.id || "").toLowerCase().includes(idFilter.toLowerCase())
      );
  }, [usernameFilter, idFilter]);

  // --- Handler Functions ---
  const handleRemoveClick = (user) => {
    setUserToRemove(user);
  };

  const handleCancelRemove = () => {
    setUserToRemove(null);
    setReason('');
  };

  const handleConfirmRemove = () => {
    if (!reason) {
      alert("Please provide a reason for removal.");
      return;
    }
    console.log(`Removing user: ${userToRemove.username} for reason: ${reason}`);
    setShowComplete(true);
  };

  const handleFinalConfirm = () => {
    setShowComplete(false);
    setUserToRemove(null);
    setReason('');
    // In a real app, re-fetch data here
  };

  return (
    <div>
      <h1 className="geist text-5xl font-bold mb-8 text-[#00A819]">All Users</h1>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Filter by username..."
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          className="p-2 border rounded-lg w-1/2"
        />
        <input 
          type="text" 
          placeholder="Filter by user ID..."
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          className="p-2 border rounded-lg w-1/2"
        />
      </div>

      {/* User Table */}
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-700">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="p-2">User ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Join Date</th>
              <th className="p-2">Subscription</th>
              <th className="p-2">Works</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.joinedDate}</td>
                <td className="p-2">
                  {user.isSubscribed ? (
                    <span className="font-semibold text-green-600">{user.subscriptionTier || 'Subscribed'}</span>
                  ) : (
                    <span className="text-gray-500">Not Subscribed</span>
                  )}
                </td>
                <td className="p-2">{user.workCount}</td>
                <td className="p-2 text-center">
                  <button 
                    onClick={() => handleRemoveClick(user)}
                    className="bg-red-500 text-[#FFD7DF] text-sm py-1 px-3 rounded hover:bg-[#FFD7DF] hover:text-red-500 transition-all duration-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayUsers.length === 0 && (
          <p className="text-center p-4">No users match your criteria.</p>
        )}
      </div>

      {/* --- Popups --- */}
      {userToRemove && !showComplete && (
        <RemoveUserPopup
          user={userToRemove}
          reason={reason}
          setReason={setReason}
          onConfirm={handleConfirmRemove}
          onAbort={handleCancelRemove}
        />
      )}

      {userToRemove && showComplete && (
        <UserRemovalCompletePopup
          user={userToRemove}
          reason={reason}
          onConfirm={handleFinalConfirm}
        />
      )}
    </div>
  );
}

export default AllUsers;