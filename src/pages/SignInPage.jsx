import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth/authContext';
import { handleApiError, showSuccessToast } from '../services/utils/errorHandler';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Show message if redirected from registration
  useEffect(() => {
    if (location.state?.message) {
      showSuccessToast(location.state.message);
    }
  }, [location]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/browse');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login({ email, password });

      // Show success message
      showSuccessToast('Welcome back! 👋');

      // Navigate based on user role
      navigate('/browse');
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#C0FFB3] via-[#FFFDEE] to-[#FFD7DF] animate-gradient-slow">

      {/* Floating decoration circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#00A819]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FF1493]/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scale-in"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-[#1A5632] to-[#00A819] rounded-full mb-4">
            <LogIn size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your reading journey</p>
        </div>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#00A819] border-gray-300 rounded focus:ring-[#00A819]"
              />
              <span className="text-gray-700">Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-[#00A819] hover:text-[#1A5632] font-semibold transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1A5632] to-[#00A819] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Link
          to="/signup"
          className="block w-full bg-white border-2 border-[#1A5632] text-[#1A5632] py-3 rounded-lg font-semibold hover:bg-[#1A5632] hover:text-white transition-all duration-300 text-center"
        >
          Create New Account
        </Link>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-[#00A819] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;

