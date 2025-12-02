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

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#1A5632] min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
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
        <BookDetail book={book} signedIn={isAuthenticated} currentUser={user}/>


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
