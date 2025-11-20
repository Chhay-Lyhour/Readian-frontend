import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { allBooksData } from '../data/mockData';
// Re-use BookCard component
import BookCard from '../components/browse/BookCard'; 
import AuthDashSidebar from '../components/authordash/AuthDashSidebar';

function AuthorDashboardPage({ currentUser }) {

  // 1. Protect the route: If no user, redirect to home
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // 2. Filter all books to find just this author's works
  const myWorks = allBooksData.filter(
    book => book.authorId === currentUser.id
  );

  return (
    <div className="flex justify-between bg-[#FFFDEE]">
      <AuthDashSidebar currentUser={currentUser} />

      {/* Main Content */}
      <main className="p-6 w-full flex-1">
        <Outlet context={{user:currentUser}} />
      </main>
    </div>
  )
}

export default AuthorDashboardPage;