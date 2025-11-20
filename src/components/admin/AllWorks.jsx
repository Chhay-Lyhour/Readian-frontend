import React, { useState, useMemo } from 'react';
import { allBooksData } from '../../data/mockData';

// Import your new components
import AllWorksCard from './AllWorksCard';
import RemoveBookPopup from './RemoveBookPopup';
import BookRemovalCompletePopup from './BookRemovalCompletePopup';

function AllWorks() {
  // --- Filter State ---
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  // --- Popup State ---
  // 1. Stores the {id, title} of the book being removed
  const [bookToRemove, setBookToRemove] = useState(null); 
  // 2. Stores the reason from the first popup
  const [reason, setReason] = useState('');
  // 3. Toggles the "Removal complete" popup
  const [showComplete, setShowComplete] = useState(false);

  // Filter the books (only published)
  const filteredBooks = useMemo(() => {
    return allBooksData
      .filter(book => book.pubStatus === 'published')
      .filter(book => 
        (book.title || "").toLowerCase().includes(titleFilter.toLowerCase())
      )
      .filter(book => 
        (book.author || "").toLowerCase().includes(authorFilter.toLowerCase())
      );
  }, [titleFilter, authorFilter]);

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

  // Called by RemoveBookPopup: confirms removal
  const handleConfirmRemove = () => {
    if (!reason) {
      alert("Please provide a reason for removal.");
      return;
    }
    // In a real app, send this to your API
    console.log(`Removing book: ${bookToRemove.title} for reason: ${reason}`);
    
    // Show the "Removal complete" popup
    setShowComplete(true);
  };

  // Called by RemovalCompletePopup: closes all popups
  const handleFinalConfirm = () => {
    setShowComplete(false);
    setBookToRemove(null);
    setReason('');
    // In a real app, you would re-fetch your data here
  };

  return (
    <div>
      <h1 className="geist text-5xl font-bold mb-8 text-[#00A819]">All Works</h1>
      
      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Filter by title..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="p-2 border rounded-lg w-1/2"
        />
        <input 
          type="text" 
          placeholder="Filter by author..."
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="p-2 border rounded-lg w-1/2"
        />
      </div>

      {/* Grid of All Works */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 2xl:gap-2 w-full place-items-center">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => 
            <AllWorksCard 
              key={book.id} 
              book={book} 
              onRemove={() => handleRemoveClick(book)} 
            />
          )
        ) : (
          <p>No books match your criteria.</p>
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