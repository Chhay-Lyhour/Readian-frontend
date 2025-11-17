import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // In a real app, you'd send this to your backend
    console.log("Creating account:", { username, dob, email, password });
    
    // Call the login function from App.jsx to log in the new user
    onLogin(); 
    
    // Send the user to their new profile
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
        <h1 className="geist text-4xl font-bold text-center mb-8">Sign Up</h1>
        
        <div className="space-y-4">
          {/* New Username */}
          <div>
            <label className="block mb-1 font-semibold">New Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white" required />
          </div>
          
          {/* Date of Birth */}
          <div>
            <label className="block mb-1 font-semibold">Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white" required />
          </div>
          
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white" required />
          </div>
          
          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white" required />
          </div>
          
          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white" required />
          </div>
        </div>

        {/* Confirm Button */}
        <button 
          type="submit"
          className="w-full bg-[#1A5632] text-[#FFD7DF] border-2 border-[#1A5632] py-3 rounded-lg font-bold mt-8 hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300"
        >
          Confirm
        </button>

        {/* Link to Sign In */}
        <p className="text-sm text-center mt-6">
          Already have an account? 
          <Link to="/signin" className="font-semibold text-blue-600 hover:underline ml-1">
            Sign In here.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;