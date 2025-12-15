import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChapterContent from '../components/readChapter/ChapterContent';
import ChapterNavigation from '../components/readChapter/ChapterNavigation';
import { bookApi } from '../services/api';
import { handleApiError } from '../services/utils/errorHandler';
import ContentGuardModal from '../components/common/ContentGuardModal';
import { useAuth } from '../services/auth/authContext';

function ReadChapterPage() {
  const { bookId, chapterNumber } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [allChapters, setAllChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGuardModal, setShowGuardModal] = useState(false);
  const [guardModalType, setGuardModalType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch book details
        const bookResponse = await bookApi.getBookById(bookId);
        const bookData = bookResponse.data;
        setBook(bookData);

        // Check guards after book data is loaded
        const guardCheck = checkContentGuards(bookData);
        if (guardCheck) {
          setGuardModalType(guardCheck);
          setShowGuardModal(true);
          setLoading(false);
          return; // Stop here, don't load chapter content
        }

        // Fetch all chapters list
        const chaptersResponse = await bookApi.getBookChapters(bookId);
        setAllChapters(chaptersResponse.data.chapters || []);

        // Fetch specific chapter by number (backend expects chapter number)
        const chapterResponse = await bookApi.getChapterByNumber(bookId, chapterNumber);
        setChapter(chapterResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load chapter');
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, chapterNumber]);

  // Check content guards (age and subscription)
  const checkContentGuards = (bookData) => {
    // Check age restrictions for adult content
    if (bookData.contentType === 'adult') {
      if (!isAuthenticated) {
        return 'age_not_logged_in';
      }

      if (!user?.age) {
        return 'age_not_set';
      }

      if (user.age < 18) {
        return 'age_under_18';
      }
    }

    // Check subscription for premium content OR ongoing books
    if (bookData.isPremium || bookData.bookStatus === 'ongoing') {
      if (!isAuthenticated) {
        return 'subscription_not_logged_in';
      }

      const hasActiveSubscription = user?.subscriptionStatus === 'active' &&
                                    (user?.plan === 'basic' || user?.plan === 'premium');

      if (!hasActiveSubscription) {
        return 'subscription_required';
      }
    }

    return null; // No guard needed
  };

  // Find prev and next chapters by chapterNumber
  const currentChapterNum = Number(chapterNumber);
  const prevChapter = allChapters.find(c => c.chapterNumber === currentChapterNum - 1);
  const nextChapter = allChapters.find(c => c.chapterNumber === currentChapterNum + 1);

  if (loading) {
    return (
      <div className="bg-[#1A5632] min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading chapter...</div>
      </div>
    );
  }

  if (error || !book || !chapter) {
    return (
      <div className="bg-[#1A5632] min-h-screen p-8 text-white text-center text-2xl">
        {error || 'Chapter not found.'}
      </div>
    );
  }

  // If guard modal is showing, render it
  if (showGuardModal) {
    return (
      <div className='bg-[#1A5632] min-h-screen'>
        <ContentGuardModal
          type={guardModalType}
          onClose={() => {
            setShowGuardModal(false);
            navigate(-1); // Go back to previous page
          }}
          bookTitle={book?.title}
        />
      </div>
    );
  }

  // Render the chapter content (guards already checked)
  return (
    <div className='bg-[#1A5632] min-h-screen'>
      {/* Chapter Navigation Bar */}
      <ChapterNavigation
        bookId={bookId}
        currentChapter={chapter}
        allChapters={allChapters}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <ChapterContent
          chapter={chapter}
          bookId={bookId}
          book={book}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
        />
      </div>
    </div>
  );
}

export default ReadChapterPage;