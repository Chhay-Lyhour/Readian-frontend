import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Receive 'onLogin' prop from App.jsx
function SignInPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log("Logging in with:", { username, password });
    
    // 2. Call the login function from App.jsx
    onLogin(); 
    
    // 3. Send the user to their dashboard or profile
    navigate('/profile'); 
  };

  return (
    // Page background gradient
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE]">
      
      {/* Form card with opposite gradient */}
      <form 
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-[#FFFDEE] to-[#C0FFB3] border border-black rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <h1 className="geist text-4xl font-bold text-center mb-8">Sign In</h1>
        
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-1 font-semibold">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white"
              required
            />
          </div>
          
          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white"
              required
            />
          </div>
        </div>

        {/* Sign In Button */}
        <button 
          type="submit"
          className="w-full bg-[#1A5632] text-[#FFD7DF] border-2 border-[#1A5632] py-3 rounded-lg font-bold mt-8 hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300"
        >
          Sign In
        </button>

        {/* Link to Sign Up */}
        <p className="text-sm text-center mt-6">
          Don't have an account? 
          <Link to="/signup" className="font-semibold text-blue-600 hover:underline ml-1">
            Make one here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignInPage;