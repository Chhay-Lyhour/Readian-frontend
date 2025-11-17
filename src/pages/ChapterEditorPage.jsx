import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { allBooksData } from '../data/mockData';

// Import your new child components
import ChapterEditorSidebar from '../components/chapEditor/ChapterEditorSidebar';
import ChapterEditorForm from '../components/chapEditor/ChapterEditorForm';

function ChapterEditorPage({ currentUser }) {
    const { bookId, chapterId } = useParams();
    const navigate = useNavigate();

    // --- 1. Find Data ---
    const book = useMemo(() => 
        allBooksData.find(b => b.id == bookId), 
        [bookId]
    );
  
    const chapterList = useMemo(() => 
        book ? book.chapterList : [], 
        [book]
    );
  
    const currentChapterIndex = useMemo(() => 
        chapterList.findIndex(c => c.id == chapterId), 
        [chapterList, chapterId]
    );
  
    const currentChapter = useMemo(() => 
        (currentChapterIndex !== -1) ? chapterList[currentChapterIndex] : null, 
        [chapterList, currentChapterIndex]
    );

    const prevChapter = useMemo(() => 
        (currentChapterIndex > 0) ? chapterList[currentChapterIndex - 1] : null, 
        [chapterList, currentChapterIndex]
    );
    
    const nextChapter = useMemo(() => 
        (currentChapterIndex < chapterList.length - 1) ? chapterList[currentChapterIndex + 1] : null, 
        [chapterList, currentChapterIndex]
    );

    // --- 2. Editable State ---
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Load chapter data into state when the page changes
    useEffect(() => {
        if (currentChapter) {
            setTitle(currentChapter.title || '');
            setContent(currentChapter.content || '');
        }
    }, [currentChapter]); // Re-run whenever you navigate to a new chapter

    // --- 3. Route Protection ---
    if (!currentUser) return <Navigate to="/" replace />;
    if (!book) return <div className="p-8">Book not found.</div>;
    if (book.authorId !== currentUser.id) return <Navigate to="/dashboard" replace />;
    if (!currentChapter) return <div className="p-8">Chapter not found.</div>;

    // --- 4. Handler Functions ---
  
    const handleSave = () => {
        // This is where your API call to save the chapter will go
        console.log("Saving chapter...", { bookId, chapterId, title, content });
        // In a real app, you'd update your mock data / state
        // For now, it just logs. This function is fast, so we don't need 'await'.
    };

    const handleBackToBookEdit = () => {
        navigate(`/edit/${book.id}`); // Back to the main book edit page
    };

    const handleDeleteChapter = () => {
        if (window.confirm("Are you sure you want to delete this chapter?")) {
            console.log("Deleting chapter:", chapterId);
            // In a real app, API call here
            // After deleting, navigate back to the book edit page
        navigate(`/edit/${book.id}`);
        }
    };

    const handleNavChange = (e) => {
        const newChapterId = e.target.value;
        // Requirement 4: Save before navigating
        handleSave();
        navigate(`/edit/${book.id}/chapter/${newChapterId}`);
    };

    const handleNavPrev = () => {
        if (prevChapter) {
            handleSave();
            navigate(`/edit/${book.id}/chapter/${prevChapter.id}`);
        }
    };

    const handleNavNext = () => {
        if (nextChapter) {
            handleSave();
            navigate(`/edit/${book.id}/chapter/${nextChapter.id}`);
        }
    };

    return (
        // Main container
        <div className="flex min-h-screen">
            <ChapterEditorSidebar
                bookId={book.id}
                chapterList={chapterList}
                currentChapterId={chapterId}
                currentChapterTitle={currentChapter.title}
                onNavChange={handleNavChange}
                onBack={handleBackToBookEdit}
                onDelete={handleDeleteChapter}
            />
      
            <ChapterEditorForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
                onNavPrev={handleNavPrev}
                onNavNext={handleNavNext}
                handleSave={handleSave}
            />
        </div>
    );
}

export default ChapterEditorPage;