import React from 'react';
import { NavLink } from 'react-router-dom';
import { mockCurrentUser } from '../../data/mockUser';

function AdminSidebar({ currentUser }) {
  
  // Define styles for NavLink
  const baseLinkStyle = "flex flex-wrap text-[24px] font-semibold w-full h-[50px] place-content-center";
  const activeLinkStyle = `${baseLinkStyle} bg-white text-black`;
  const inactiveLinkStyle = `${baseLinkStyle} text-black hover:bg-white/50`; 

  // Helper function for NavLink
  const getLinkClass = ({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle;

  return (
    <aside className="w-[320px] bg-[#C0FFB3] min-h-svh">
      
      {/* Profile Section */}
      <div className="flex flex-col gap-2 items-center ">
        {currentUser.profileImage ? (
            <div className="w-[120px] h-[120px] rounded-full border-2 border-solid border-black overflow-hidden">
                <img src={currentUser.profileImage} alt="User Profile" className='h-full object-cover' />
            </div>
        ) : (
            <div className='w-[120px] h-[120px] rounded-full bg-gray-500 border-2 border-solid border-black' />
        )}
        
        <h2 className="geist text-[20px] font-semibold">Welcome, {currentUser.username || "User"}</h2>
        <span className="text-[18px] font-semibold">Admin</span>
      </div>
      
      {/* Navigation */}
      <nav className="mt-[50px] flex flex-col gap-4">
        
        {/* My Content Section */}
        <h3 className="text-[28px] text-center font-semibold text-gray-600 uppercase mt-4">My Content</h3>
        <NavLink to="works" className={getLinkClass}>My Works</NavLink>
        <NavLink to="drafts" className={getLinkClass}>My Drafts</NavLink>
        <NavLink to="liked" className={getLinkClass}>My Liked</NavLink>

        {/* Admin Section */}
        <h3 className="text-[28px] text-center font-semibold text-gray-600 uppercase mt-6">Admin Options</h3>
        <NavLink to="overview" className={getLinkClass}>Overview</NavLink>
        <NavLink to="allworks" className={getLinkClass}>All Works</NavLink>
        <NavLink to="allusers" className={getLinkClass}>All Users</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;