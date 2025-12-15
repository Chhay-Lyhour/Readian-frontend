import toast from 'react-hot-toast';

// Comprehensive error code to user-friendly message mapping
const ERROR_MESSAGES = {
  // Authentication Errors
  INVALID_CREDENTIALS: '❌ Invalid email or password. Please check your credentials and try again.',
  TOKEN_INVALID: '🔒 Your session is invalid. Please sign in again.',
  TOKEN_EXPIRED: '⏰ Your session has expired. Please sign in again.',
  AUTHENTICATION_REQUIRED: '🔐 Please sign in to access this content.',

  // Authorization Errors
  INSUFFICIENT_PERMISSIONS: '🚫 You don\'t have permission to perform this action.',
  AGE_RESTRICTED: '🔞 This content is restricted to users 18 and older.',
  AGE_RESTRICTION: '🔞 Authors under 18 cannot create adult content.',
  AGE_NOT_SET: '📅 Please set your age in your profile to access this content.',

  // Subscription Errors
  SUBSCRIPTION_REQUIRED: '⭐ This content requires an active subscription. Upgrade to continue.',
  PREMIUM_FEATURE_ONLY: '💎 This feature is only available to premium users.',

  // Email Errors
  EMAIL_ALREADY_EXISTS: '📧 An account with this email already exists. Try signing in instead.',
  EMAIL_NOT_VERIFIED: '✉️ Please verify your email address to continue. Check your inbox.',
  EMAIL_ALREADY_VERIFIED: '✅ Your email has already been verified.',
  EMAIL_SERVICE_ERROR: '📨 Failed to send email. Please try again later.',
  VERIFICATION_CODE_INVALID: '❌ The verification code is invalid or expired. Request a new one.',

  // Not Found Errors
  USER_NOT_FOUND: '👤 User not found. Please check and try again.',
  BOOK_NOT_FOUND: '📚 Book not found. It may have been removed.',
  CHAPTER_NOT_FOUND: '📄 Chapter not found. Please select another chapter.',
  AUTHOR_NOT_FOUND: '✍️ Author not found.',
  NOT_FOUND: '🔍 Resource not found.',

  // Validation Errors
  VALIDATION_ERROR: '⚠️ Please check your input and try again.',
  FILE_NOT_PROVIDED: '📎 No file was selected. Please choose a file.',
  INVALID_FILE_TYPE: '🖼️ Invalid file type. Only images are allowed.',
  FILE_TOO_LARGE: '📦 File is too large. Maximum size is 5MB.',

  // Conflict Errors
  BOOK_ALREADY_PUBLISHED: '📖 This book has already been published.',
  ROLE_CHANGE_NOT_ALLOWED: '🔄 Role change is not allowed at this time.',
  ALREADY_LIKED: '❤️ You have already liked this book.',
  NOT_LIKED: '💔 You have not liked this book yet.',

  // Server Errors
  INTERNAL_SERVER_ERROR: '⚠️ Something went wrong on our end. Please try again later.',
  FILE_UPLOAD_ERROR: '📤 Failed to upload file. Please try again.',
  CLOUDINARY_NOT_CONFIGURED: '☁️ Cloud storage error. Please contact support.',

  // Network Errors
  NETWORK_ERROR: '📡 Network error. Please check your internet connection.',
  TIMEOUT_ERROR: '⏱️ Request timed out. Please try again.',
};

// Toast configuration for bottom-left positioning
const toastConfig = {
  position: 'bottom-left',
  duration: 4000,
  style: {
    background: '#333',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
    maxWidth: '400px',
  },
};

export const handleApiError = (error, showToast = true) => {
  console.error('API Error:', error);

  let message = 'Something went wrong. Please try again.';

  // Handle axios error response
  if (error.response) {
    const { data, status } = error.response;

    // Try to get error code from response
    const errorCode = data?.error?.code || data?.code || data?.errorCode;

    // Use mapped message if error code exists
    if (errorCode && ERROR_MESSAGES[errorCode]) {
      message = ERROR_MESSAGES[errorCode];
    }
    // Use response message if available
    else if (data?.error?.message) {
      message = `⚠️ ${data.error.message}`;
    }
    else if (data?.message) {
      message = `⚠️ ${data.message}`;
    }
    // Handle HTTP status codes
    else {
      switch (status) {
        case 400:
          message = '⚠️ Invalid request. Please check your input.';
          break;
        case 401:
          message = '🔒 Authentication required. Please sign in.';
          break;
        case 403:
          message = '🚫 Access denied. You don\'t have permission.';
          break;
        case 404:
          message = '🔍 Resource not found.';
          break;
        case 409:
          message = '⚠️ This action conflicts with existing data.';
          break;
        case 500:
          message = '⚠️ Server error. Please try again later.';
          break;
        default:
          message = `⚠️ Error ${status}: ${data?.message || 'Please try again.'}`;
      }
    }

    // Show validation errors if present
    if (data?.errors && Array.isArray(data.errors)) {
      const validationErrors = data.errors.map(err => err.msg || err.message).join('\n');
      message = `⚠️ Validation errors:\n${validationErrors}`;
    }
  }
  // Handle network errors
  else if (error.request) {
    message = ERROR_MESSAGES.NETWORK_ERROR;
  }
  // Handle other errors
  else if (error.code && ERROR_MESSAGES[error.code]) {
    message = ERROR_MESSAGES[error.code];
  }
  else if (error.message) {
    // Don't show raw error messages like "Request failed with status code 401"
    if (!error.message.includes('status code')) {
      message = `⚠️ ${error.message}`;
    }
  }

  if (showToast) {
    toast.error(message, toastConfig);
  }

  return message;
};

export const showSuccessToast = (message, duration = 3000) => {
  toast.success(message, {
    ...toastConfig,
    duration,
    style: {
      ...toastConfig.style,
      background: '#00A819',
    },
  });
};

export const showErrorToast = (message, duration = 4000) => {
  toast.error(message, {
    ...toastConfig,
    duration,
  });
};

export const showInfoToast = (message, duration = 3000) => {
  toast(message, {
    ...toastConfig,
    duration,
    icon: 'ℹ️',
    style: {
      ...toastConfig.style,
      background: '#0ea5e9',
    },
  });
};

export const showWarningToast = (message, duration = 3000) => {
  toast(message, {
    ...toastConfig,
    duration,
    icon: '⚠️',
    style: {
      ...toastConfig.style,
      background: '#f59e0b',
    },
  });
};

