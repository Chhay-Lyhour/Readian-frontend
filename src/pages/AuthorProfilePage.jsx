import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authorApi } from '../services/api';
import { handleApiError } from '../services/utils/errorHandler';
import { BookOpen, Eye, Heart, Star, User, Calendar } from 'lucide-react';
import BookCard from '../components/browse/BookCard';

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    fetchAuthorProfile();
  }, [authorId, currentPage]);

  const fetchAuthorProfile = async () => {
    try {
      setLoading(true);
      const response = await authorApi.getAuthorProfile(authorId, {
        page: currentPage,
        limit: booksPerPage
      });
      setAuthorData(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDEE] flex items-center justify-center">
        <div className="text-2xl">Loading author profile...</div>
      </div>
    );
  }

  if (!authorData) {
    return (
      <div className="min-h-screen bg-[#FFFDEE] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Author not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const { author, stats, books, pagination } = authorData;

  return (
    <div className="min-h-screen bg-[#FFFDEE]">
      {/* Header/Cover Section */}
      <div className="relative bg-gradient-to-r from-[#1A5632] to-[#00A819] text-white">
        {author.coverImage && (
          <div className="absolute inset-0 opacity-20">
{/*             <img */}
{/*               src={author.coverImage} */}
{/*               alt="Cover" */}
{/*               className="w-full h-full object-cover" */}
{/*             /> */}
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-xl">
                  <User className="w-16 h-16 md:w-20 md:h-20 text-[#1A5632]" />
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{author.name}</h1>
              {author.bio && (
                <p className="text-lg text-gray-100 mb-4 max-w-3xl">
                  {author.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span className="font-semibold">{stats.totalBooks} Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={20} />
                  <span className="font-semibold">{stats.totalViews.toLocaleString()} Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={20} />
                  <span className="font-semibold">{stats.totalLikes.toLocaleString()} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={20} />
                  <span className="font-semibold">
                    {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'} Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span className="font-semibold">
                    Joined {new Date(author.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Published Books ({stats.totalBooks})
          </h2>
          <p className="text-gray-600">
            Browse all books by {author.name}
          </p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No published books yet</p>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  linkTo={`/book/${book._id}`}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1A5632] text-white rounded-lg hover:bg-[#00A819] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasMore}
                  className="px-4 py-2 bg-[#1A5632] text-white rounded-lg hover:bg-[#00A819] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorProfilePage;

