import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar'; // The new sidebar

function AdminDashboardPage({ currentUser }) {
  
  // --- Route Protection ---
  if (!currentUser) {
    // Not logged in, send to sign in
    return <Navigate to="/signin" replace />;
  }
  if (currentUser.role !== 'admin') {
    // Logged in, but NOT an admin. Send to their own dashboard.
    return <Navigate to="/authordash" replace />;
  }
  // -------------------------

  return (
    <div className="flex justify-between" >
      
      <AdminSidebar currentUser={currentUser} />

      <main className="p-6 w-full flex-1">
        <Outlet context={{ user: currentUser }} /> 
      </main>

    </div>
  );
}

export default AdminDashboardPage;