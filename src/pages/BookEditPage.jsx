import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


import BookEditSidebar from '../components/bookEdit/BookEditSidebar';
import { allBooksData } from '../data/mockData';
import BookEditForm from '../components/bookEdit/BookEditForm';
import BookEditChapters from '../components/bookEdit/BookEditChapters';


const BookEditPage = ({currentUser}) => {

    const { bookId } = useParams(); 

    //check if making a new book
    const isNew = bookId === 'new';

    const bookToEdit = useMemo(() => {
        return isNew ? null : allBooksData.find(b => b.id === Number(bookId));
    }, [bookId, isNew]); 

    const navigate = useNavigate();
    
    // We initialize state with the book's data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Ongoing'); // Your "status" (Ongoing/Completed)
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [premiumStatus, setPremiumStatus] = useState('free');
    const [chapters, setChapters] = useState([]);

    // Load book data into state *after* it's found
    // This prevents issues if bookToEdit is slow to load
    useEffect(() => {

        if (isNew) {
            setTitle('Untitled Book');
            setDescription('');
            setStatus('Ongoing');
            setTags([]);
            setPremiumStatus('free');
            setChapters([]);
        } else if (bookToEdit) {
            setTitle(bookToEdit.title || '');
            setDescription(bookToEdit.description || '');
            setStatus(bookToEdit.status || 'Ongoing');
            setTags(bookToEdit.tags || []);
            setPremiumStatus(bookToEdit.premiumStatus || 'free')
            setChapters(bookToEdit.chapterList || []);
        }
    }, [bookToEdit, isNew]); // Re-run this if bookToEdit changes

    // 5. Route Protection
    if (!currentUser) {
        return <Navigate to="/" replace />; // Not logged in
    }
    if (!isNew && !bookToEdit) {
        return <div className="p-8">Book not found.</div>; // Book doesn't exist
    }
    // This is the most important part!
    if (!isNew && bookToEdit.authorId !== currentUser.id) {
        return <Navigate to="/authordash" replace />; // Not your book!
    }
    // Determine correct dashboard path
    const dashboardPath = currentUser.role === "admin" ? "/admindash" : "/authordash/works";

    // --- Form Handlers ---
    const saveBookData = () => {
        if (isNew) {
            const newBook = {
                id: Date.now(), // Mock ID
                authorId: currentUser.id,
                author: currentUser.displayName,
                pubStatus: 'draft', // New books are drafts
                title, description, status, tags, premiumStatus, chapters,
            };
            console.log("CREATING new book:", newBook);
            alert("New draft created! (Check console)");
            // After creating, navigate to the new edit page
            navigate(`/edit/${newBook.id}`, { replace: true });
        } else {
            //API call will go here
            //for now log console
            console.log("Saving book data:", { id: bookToEdit.id, title, description });
            alert("Book Saved!"); 
        }
        
    }

    const handleSaveSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to your API
        saveBookData();
    };

    const handleEditChapterClick = (chapterId) => {
        saveBookData();
        if (!isNew) {
            navigate(`/edit/${bookToEdit.id}/chapter/${chapterId}`);
        } else {
            // This shouldn't happen on a new book, but good to handle
            console.error("Cannot edit chapter of a book that hasn't been saved yet.");
            alert("Save your new book first before adding chapters.");
        }
        
    }

    const handleNewChapter = () => {
        const newChapter = {
            id: Date.now(), // A temporary mock ID
            title: "New Chapter (Untitled)",
            date: new Date().toLocaleDateString(),
            content: ""
            // In a real app, you'd save this to the DB and get a real ID
        };

        // Add the new chapter to the *local* state
        setChapters(prevChapters => [...prevChapters, newChapter]);
    };

    const handleDeleteWork = () => {
        // We add a window.confirm to be safe
        if (window.confirm("Are you sure you want to permanently delete this work?")) {
            console.log("Deleting book:", bookToEdit.id);
            // In a real app: api.deleteBook(bookToEdit.bookId)
            alert("Work Deleted! (In theory)");
        // Here you would navigate back to the dashboard
        navigate(dashboardPath)
        }
    };

    const handlePublishWork = () => {
        if (!isNew) {
            const newStatus = bookToEdit.pubStatus === 'draft' ? 'published' : 'draft';
            // In a real app, you'd send this to your API
            console.log(`Toggling status to: ${newStatus}`);
            alert(`Status changed to ${newStatus}! (Check console)`);
            // Note: To see this change live, you'd have to update your mock data
            // in state, but for now, this logs the action.
            navigate(dashboardPath)
        } else {
            // a new book is "published" by saving it
            saveBookData();
        }
        
    }

    return (
        <div className='flex'>
            {/* sidebar */}
            <BookEditSidebar 
                stats={{
                    views: isNew ? 0 : bookToEdit.views,
                    likes: isNew ? 0 : bookToEdit.likes,
                    premiumStatus: isNew ? 'free' : bookToEdit.premiumStatus,
                    // 👇 This was the problem line. Use the same fix.
                    pubStatus: isNew ? 'draft' : bookToEdit.pubStatus
                }}
                onDelete={handleDeleteWork}
                isNewBook={isNew}
                onPublishWork={handlePublishWork}
                dashboardPath = {dashboardPath}
            />

            {/* display section */}
            <main className='w-[1500px] flex flex-col items-center gap-8 py-8'>
                <BookEditForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    status={status}
                    setStatus={setStatus}
                    tags={tags}
                    setTags={setTags}
                    premiumStatus={premiumStatus}
                    setPremiumStatus={setPremiumStatus}
                    onSave={handleSaveSubmit}
                />

                <BookEditChapters 
                    
                    chapters={chapters}
                    onEditChapter={handleEditChapterClick}
                    onNewChapter={handleNewChapter}
                />
            </main>
        </div>
    )
}

export default BookEditPage
