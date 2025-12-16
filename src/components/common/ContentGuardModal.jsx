import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, Crown } from 'lucide-react';

/**
 * ContentGuardModal Component
 * Unified modal for age verification and subscription checks
 * Shows at bottom-left corner when user clicks "Start Reading"
 */
const ContentGuardModal = ({ type, onClose, bookTitle, onContinue }) => {
  const navigate = useNavigate();

  const handleAction = (path) => {
    onClose();
    if (path) {
      navigate(path, { state: { from: window.location.pathname } });
    }
  };

  // Age restriction - Not logged in
  if (type === 'age_not_logged_in') {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
        <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-red-500 max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Shield size={32} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-600 mb-2">
                Age Restricted Content (18+)
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                You must be signed in and 18 years or older to access this content.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('/signin')}
                  className="flex-1 bg-[#1A5632] text-white px-4 py-2 rounded-lg hover:bg-[#2d7a51] transition-all text-sm font-semibold"
                >
                  Sign In
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Age not set in profile
  if (type === 'age_not_set') {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
        <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-yellow-500 max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle size={32} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-600 mb-2">
                Age Verification Required
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Please add your age to your profile to access adult content.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('/profile')}
                  className="flex-1 bg-[#1A5632] text-white px-4 py-2 rounded-lg hover:bg-[#2d7a51] transition-all text-sm font-semibold"
                >
                  Go to Profile
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Age under 18
  if (type === 'age_under_18') {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
        <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-red-500 max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Shield size={32} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-600 mb-2">
                Access Denied
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                You must be 18 years or older to access this content.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                This book contains adult content that is restricted by age.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('/browse')}
                  className="flex-1 bg-[#1A5632] text-white px-4 py-2 rounded-lg hover:bg-[#2d7a51] transition-all text-sm font-semibold"
                >
                  Browse Other Books
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subscription required - Not logged in
  if (type === 'subscription_not_logged_in') {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
        <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-purple-500 max-w-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Crown size={32} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-purple-600 mb-2">
                Premium Content
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Sign in to access this premium content with a subscription.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('/signin')}
                  className="flex-1 bg-[#1A5632] text-white px-4 py-2 rounded-lg hover:bg-[#2d7a51] transition-all text-sm font-semibold"
                >
                  Sign In
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subscription required - Logged in but no subscription
  if (type === 'subscription_required') {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
          <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-purple-500 max-w-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Lock size={32} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-purple-600 mb-2">
                  Subscription Required
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  This book requires an active subscription. Upgrade now to start reading!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction('/subscription')}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all text-sm font-semibold"
                  >
                    View Plans
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default case
  return null;
};

export default ContentGuardModal;

