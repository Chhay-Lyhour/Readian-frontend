import React, { useState } from 'react';
import { X } from 'lucide-react';
import { adminApi } from '../../services/api';
import { handleApiError, showSuccessToast } from '../../services/utils/errorHandler';

const EditUserModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'READER',
    plan: user.plan || user.subscriptionPlan || 'free',
    subscriptionStatus: user.subscriptionStatus || 'inactive',
    age: user.age || '',
    subscriptionDuration: user.subscriptionDuration || '',
    bio: user.bio || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Use id or _id, whichever is available
      const userId = user.id || user._id;

      // Prepare data with proper types
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        plan: formData.plan,
        subscriptionStatus: formData.subscriptionStatus,
        age: formData.age ? parseInt(formData.age) : null,
        subscriptionDuration: formData.subscriptionDuration ? parseInt(formData.subscriptionDuration) : null,
        bio: formData.bio
      };

      console.log('Sending update data:', dataToSend);
      await adminApi.updateUser(userId, dataToSend);
      showSuccessToast('User updated successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                min="1"
                max="120"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="READER">Reader</option>
                <option value="AUTHOR">Author</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Subscription Plan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subscription Plan
              </label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* Subscription Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subscription Status
              </label>
              <select
                value={formData.subscriptionStatus}
                onChange={(e) => setFormData({ ...formData, subscriptionStatus: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Subscription Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subscription Duration (days)
              </label>
              <input
                type="number"
                value={formData.subscriptionDuration}
                onChange={(e) => setFormData({ ...formData, subscriptionDuration: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                min="0"
                placeholder="e.g., 30, 365"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for no duration</p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                rows="3"
                placeholder="User bio..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#1A5632] text-white rounded-lg hover:bg-[#00A819] hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

