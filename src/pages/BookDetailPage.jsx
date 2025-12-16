import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import BookDetail from '../components/bookDetail/BookDetail';
import BookChapters from '../components/bookDetail/BookChapters';
import AuthorCard from '../components/bookDetail/AuthorCard';
import { bookApi } from '../services/api';
import { useAuth } from '../services/auth/authContext';
import { handleApiError } from '../services/utils/errorHandler';

const BookDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getBookById(id);
      setBook(response.data);
      console.log('Fetched book:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load book');
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh book data (for rating updates)
  const refreshBook = async () => {
    try {
      const response = await bookApi.getBookById(id);
      setBook(response.data);
      console.log('✅ Book data refreshed after rating');
    } catch (err) {
      console.error('Failed to refresh book data:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1A5632] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-white">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="bg-[#1e593e] min-h-svh p-8 text-white text-center text-2xl">
        {error || 'Book not found.'}
      </div>
    );
  }

  // Allow access to book details without restrictions
  // Guards will be applied when trying to read chapters
  return (
    <div className='bg-[#1A5632] min-h-screen py-8 px-4'>
      <div className='flex flex-col gap-8 max-w-7xl mx-auto items-center'>
        {/* Book Detail - Includes all book info, stats, rating, and download */}
        <BookDetail book={book} signedIn={isAuthenticated} currentUser={user} onRatingUpdate={refreshBook} />


        {/* Author Card */}
        <AuthorCard
          author={book.author}
          bookCount={book.authorBookCount}
        />

        {/* Book Chapters - Table of Contents */}
        <BookChapters chapterList={book.chapters || []} bookId={book._id || book.id}/>
      </div>
    </div>
  )
}

export default BookDetailPage
