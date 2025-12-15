import React, { useState, useEffect, useMemo } from 'react';
import RemoveUserPopup from './RemoveUserPopup';
import UserRemovalCompletePopup from './UserRemovalCompletePopup';
import EditUserModal from './EditUserModal';
import { Edit, Trash2, User, Mail, Calendar } from 'lucide-react';
import { adminApi } from '../../services/api';
import { handleApiError, showSuccessToast } from '../../services/utils/errorHandler';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [userToRemove, setUserToRemove] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [reason, setReason] = useState('');
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllUsers();
      // Transform backend data to match frontend expectations
      const transformedUsers = (response.data.data || response.data.users || []).map(user => ({
        ...user,
        id: user._id || user.id, // Map _id to id
        subscriptionPlan: user.plan, // Map plan to subscriptionPlan
        publishedBooksCount: user.publishedBooksCount || 0
      }));
      setUsers(transformedUsers);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const displayUsers = useMemo(() => {
    return users
      .filter(user =>
        (user.name || "").toLowerCase().includes(usernameFilter.toLowerCase())
      )
      .filter(user =>
        (user.id || "").toString().toLowerCase().includes(idFilter.toLowerCase())
      );
  }, [users, usernameFilter, idFilter]);

  // --- Handler Functions ---
  const handleRemoveClick = (user) => {
    setUserToRemove(user);
  };

  const handleCancelRemove = () => {
    setUserToRemove(null);
    setReason('');
  };

  const handleConfirmRemove = async () => {
    if (!reason) {
      alert("Please provide a reason for removal.");
      return;
    }

    try {
      await adminApi.deleteUser(userToRemove.id, { reason });
      showSuccessToast('User removed successfully');
      setShowComplete(true);
      await fetchUsers(); // Refresh the user list
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleFinalConfirm = () => {
    setShowComplete(false);
    setUserToRemove(null);
    setReason('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-2xl">Loading users...</div>
      </div>
    );
  }

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

      {/* User Cards - Detailed View */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 2xl:gap-2 w-full place-items-center space-y-4">
        {displayUsers.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* User ID */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">User ID</p>
                <p className="text-sm font-mono">{user.id}</p>
              </div>

              {/* Username */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Username</p>
                <p className="text-sm font-semibold">{user.name}</p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                <p className="text-sm">{user.email}</p>
              </div>

              {/* Age */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Age</p>
                <p className="text-sm">{user.age || 'N/A'}</p>
              </div>

              {/* Join Date */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Join Date</p>
                <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Role */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Role</p>
                <p className="text-sm font-semibold text-purple-600 capitalize">{user.role}</p>
              </div>

              {/* Subscription Plan */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Subscription Plan</p>
                <p className="text-sm font-semibold text-blue-600 capitalize">
                  {user.subscriptionPlan || 'Free'}
                </p>
              </div>

              {/* Subscription Status */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Subscription Status</p>
                {user.subscriptionStatus === 'active' ? (
                  <span className="text-sm font-semibold text-green-600 capitalize">Active</span>
                ) : (
                  <span className="text-sm text-gray-500 capitalize">{user.subscriptionStatus || 'Inactive'}</span>
                )}
              </div>

              {/* Subscription Duration */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Subscription Duration (days)</p>
                <p className="text-sm">{user.subscriptionDuration || 'N/A'}</p>
              </div>

{/*                */}{/* Works */}
{/*               <div> */}
{/*                 <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Published Works</p> */}
{/*                 <p className="text-sm font-semibold">{user.publishedBooksCount || 0}</p> */}
{/*               </div> */}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Actions</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setUserToEdit(user)}
                  className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveClick(user)}
                  className="bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {displayUsers.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-300 text-center">
            <p className="text-gray-500">No users match your criteria.</p>
          </div>
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

      {userToEdit && (
        <EditUserModal
          user={userToEdit}
          onClose={() => setUserToEdit(null)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
}

export default AllUsers;