import React, { useState, useEffect, useMemo } from 'react';
import RemoveUserPopup from './RemoveUserPopup';
import UserRemovalCompletePopup from './UserRemovalCompletePopup';
import EditUserModal from './EditUserModal';
import { Edit, Trash2, User, Mail, Calendar } from 'lucide-react';
import { adminApi } from '../../services/api';
import { handleApiError, showSuccessToast } from '../../services/utils/errorHandler';
import { useAuth } from '../../services/auth/authContext';

function AllUsers() {
  const { user: currentUser, refreshUser } = useAuth();
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#1A5632] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="geist text-4xl font-bold mb-8 text-[#00A819]">All Users</h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Filter by username..."
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
            aria-label="Filter by username"
          />
        </div>
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Filter by user ID..."
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
            aria-label="Filter by user ID"
          />
        </div>
      </div>

      {/* User Cards - Detailed View */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {displayUsers.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-[#00A819] transition-all duration-300 animate-fade-in">
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
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setUserToEdit(user)}
                  className="bg-[#1A5632] text-white text-sm py-2 px-4 rounded-lg hover:bg-[#00A819] hover:scale-105 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
                  aria-label={`Edit ${user.name}`}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveClick(user)}
                  className="bg-red-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Remove ${user.name}`}
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
          onSuccess={async () => {
            await fetchUsers();
            // If admin edited their own account, refresh current user data
            if (userToEdit.id === currentUser?.id || userToEdit._id === currentUser?._id || userToEdit.id === currentUser?._id) {
              await refreshUser();
              console.log('✅ Refreshed current user data after self-edit');
            }
          }}
        />
      )}
    </div>
  );
}

export default AllUsers;