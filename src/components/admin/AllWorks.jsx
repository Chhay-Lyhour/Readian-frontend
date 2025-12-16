import React, { useState, useEffect, useMemo } from 'react';
import BookCard from '../browse/BookCard';
import RemoveBookPopup from './RemoveBookPopup';
import BookRemovalCompletePopup from './BookRemovalCompletePopup';
import { adminApi } from '../../services/api';
import { handleApiError, showSuccessToast } from '../../services/utils/errorHandler';
import { Trash2 } from 'lucide-react';

function AllWorks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [bookToRemove, setBookToRemove] = useState(null);
  const [reason, setReason] = useState('');
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllBooks();
      console.log('📚 Admin getAllBooks response:', response.data);
      console.log('📖 Total books received:', response.data.books?.length || 0);
      setBooks(response.data.books || []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = useMemo(() => {
    console.log('🔍 Filtering books, total:', books.length);

    // Filter for published books - check multiple field names
    const publishedBooks = books.filter(book => {
      // Check various possible field names for status
      const isPublished =
        book.status === 'published' ||
        book.pubStatus === 'published' ||
        book.publicationStatus === 'published';

      if (!isPublished) {
        console.log('❌ Book not published:', book.title, 'status:', book.status || book.pubStatus);
      }
      return isPublished;
    });

    console.log('✅ Published books:', publishedBooks.length);

    // Apply title filter
    const titleFiltered = publishedBooks.filter(book =>
      (book.title || "").toLowerCase().includes(titleFilter.toLowerCase())
    );

    // Apply author filter
    const result = titleFiltered.filter(book =>
      (book.author?.name || "").toLowerCase().includes(authorFilter.toLowerCase())
    );

    console.log('📊 After filters:', result.length);
    return result;
  }, [books, titleFilter, authorFilter]);

  // --- Handler Functions ---

  // Called by AllWorksCard: opens the first popup
  const handleRemoveClick = (book) => {
    setBookToRemove(book);
  };

  // Called by RemoveBookPopup: closes the first popup
  const handleCancelRemove = () => {
    setBookToRemove(null);
    setReason('');
  };

  const handleConfirmRemove = async () => {
    if (!reason) {
      alert("Please provide a reason for removal.");
      return;
    }

    try {
      const bookId = bookToRemove.id || bookToRemove._id;
      console.log('Deleting book:', bookId, 'Reason:', reason);

      await adminApi.deleteBook(bookId, { reason });
      showSuccessToast('Book removed successfully');
      setShowComplete(true);
      await fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Delete book error:', error);
      handleApiError(error);
    }
  };

  const handleFinalConfirm = () => {
    setShowComplete(false);
    setBookToRemove(null);
    setReason('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#1A5632] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="geist text-4xl font-bold mb-8 text-[#00A819]">All Works</h1>
      
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by title..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
            aria-label="Filter by title"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by author..."
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
            aria-label="Filter by author"
          />
        </div>
      </div>

      {/* Grid of All Works */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => {
            const bookId = book.id || book._id;
            return (
              <div key={bookId} className="relative w-full max-w-[650px] mx-auto admin-book-card group animate-fade-in">
                <BookCard book={book} linkTo={`/book/${bookId}`} disableHoverScale={true} />
                {/* Admin Remove Button Overlay */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[10px]" style={{ zIndex: 50 }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveClick(book);
                    }}
                    className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
                    aria-label={`Remove ${book.title}`}
                  >
                    <Trash2 size={18} />
                    Remove Book
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No books match your criteria.</p>
          </div>
        )}
      </div>

      {/* --- Popups --- */}
      
      {/* 1. First Popup: "Are you sure?" */}
      {bookToRemove && !showComplete && (
        <RemoveBookPopup
          book={bookToRemove}
          reason={reason}
          setReason={setReason}
          onConfirm={handleConfirmRemove}
          onAbort={handleCancelRemove}
        />
      )}

      {/* 2. Second Popup: "Removal complete" */}
      {bookToRemove && showComplete && (
        <BookRemovalCompletePopup
          book={bookToRemove}
          reason={reason}
          onConfirm={handleFinalConfirm}
        />
      )}
    </div>
  );
}

export default AllWorks;

