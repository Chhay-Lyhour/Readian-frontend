import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import BrowseSidebar from '../components/browse/BrowseSidebar'
import BrowseBookGrid from '../components/browse/BrowseBookGrid'
import { bookApi } from '../services/api'
import { useAuth } from '../services/auth/authContext'
import { handleApiError } from '../services/utils/errorHandler'
import { transformBooks } from '../services/utils/dataTransformers'

const BrowsePage = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    //get tag and search query from url or state
    const initialTag = searchParams.get('tag') || '';
    const searchQuery = searchParams.get('search') || '';
    const stateFilterTag = location.state?.filterTag || '';
    const stateFilterGenre = location.state?.filterGenre || '';

    //state for all filters - used directly for filtering
    const [title, setTitle] = useState(searchQuery);
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('All');
    const [tags, setTags] = useState(initialTag || stateFilterTag);
    const [genre, setGenre] = useState(stateFilterGenre);
    const [minLikes, setMinLikes] = useState(0);
    const [isPremium, setIsPremium] = useState('all'); // 'all', 'premium', 'free'

    // Update filters when location state changes (from landing page)
    useEffect(() => {
        if (location.state?.filterTag) {
            setTags(location.state.filterTag);
        }
        if (location.state?.filterGenre) {
            setGenre(location.state.filterGenre);
        }
    }, [location.state]);

    // Update title when search query changes from URL
    useEffect(() => {
        const newSearchQuery = searchParams.get('search') || '';
        if (newSearchQuery) {
            setTitle(newSearchQuery);
        }
    }, [searchParams]);

    // Update tags when URL tag parameter changes
    useEffect(() => {
        const newTag = searchParams.get('tag') || '';
        if (newTag) {
            setTags(newTag);
        }
    }, [searchParams]);


    // Observer for infinite scroll
    const observerTarget = useRef(null);

    // Fetch ALL books once (no filters in API call)
    const fetchBooks = useCallback(async (page = 1, appendResults = false) => {
        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            // Fetch all books without filters - filtering will be done client-side
            const response = await bookApi.getAllBooks({ page, limit: 8 }); // Increased limit for better client-side filtering

            const books = transformBooks(response.data?.books || []);
            const pagination = response.data?.pagination || {};

            if (appendResults) {
                setAllBooks(prev => [...prev, ...books]);
            } else {
                setAllBooks(books);
            }

            setHasMore(pagination.hasMore || false);
            setCurrentPage(page);
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []); // No dependencies - fetch is independent of filters

    // Initial load only - no refetch on filter changes
    useEffect(() => {
        fetchBooks(1, false);
    }, []); // Empty dependency - only load once

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
                    fetchBooks(currentPage + 1, true);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, loadingMore, currentPage, fetchBooks]);

    // Client-side filtering using useMemo (like AllUsers and AllWorks)
    const filteredBooks = useMemo(() => {
        console.log('🔍 Filtering books, total:', allBooks.length);
        console.log('📋 Active filters:', { title, author, genre, tags, status, minLikes, isPremium });

        return allBooks.filter(book => {
            // Title filter - case insensitive search
            if (title && !(book.title || '').toLowerCase().includes(title.toLowerCase())) {
                return false;
            }

            // Author filter - case insensitive search
            if (author && !(book.author?.name || '').toLowerCase().includes(author.toLowerCase())) {
                return false;
            }

            // Genre filter - case insensitive search
            if (genre) {
                const bookGenre = (book.genre || '').toLowerCase();
                const searchGenre = genre.toLowerCase();
                if (!bookGenre.includes(searchGenre)) {
                    console.log('❌ Genre mismatch:', book.title, '| Book genre:', book.genre, '| Search:', genre);
                    return false;
                }
            }

            // Tags filter - check if any of the input tags match book tags
            if (tags) {
                const searchTags = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

                // Handle different tag formats (array, string, or comma-separated string)
                let bookTags = [];
                if (Array.isArray(book.tags)) {
                    // Tags is an array
                    bookTags = book.tags.map(t => typeof t === 'string' ? t.toLowerCase() : String(t).toLowerCase());
                } else if (typeof book.tags === 'string') {
                    // Tags is a string (might be comma-separated)
                    bookTags = book.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
                } else if (book.tags) {
                    // Tags is some other type, convert to string
                    bookTags = [String(book.tags).toLowerCase()];
                } else {
                    // No tags
                    bookTags = [];
                }

                console.log('🏷️ Tag filter:', {
                    bookTitle: book.title,
                    searchTags,
                    bookTags,
                    originalTags: book.tags
                });

                // Check if any search tag matches any book tag
                const hasMatchingTag = searchTags.some(searchTag =>
                    bookTags.some(bookTag => bookTag.includes(searchTag))
                );

                if (!hasMatchingTag) {
                    console.log('❌ No matching tags for:', book.title);
                    return false;
                }
                console.log('✅ Tags matched for:', book.title);
            }

            // Status filter
            if (status !== 'All' && book.bookStatus !== status) {
                return false;
            }

            // Min likes filter
            if (minLikes > 0 && (book.likes || 0) < minLikes) {
                return false;
            }

            // Premium filter
            if (isPremium === 'premium' && !book.isPremium) {
                return false;
            }
            if (isPremium === 'free' && book.isPremium) {
                return false;
            }

            return true;
        });
    }, [allBooks, title, author, genre, tags, status, minLikes, isPremium]);

    if (loading) {
        return (
            <div className="bg-[#FFFDEE] min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-[#1A5632] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl font-semibold text-gray-700">Loading books...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-[#FFFDEE] min-h-screen'>
            <div className='flex flex-col lg:flex-row relative'>
                <BrowseSidebar
                    title={title}
                    setTitle={setTitle}
                    author={author}
                    setAuthor={setAuthor}
                    status={status}
                    setStatus={setStatus}
                    tags={tags}
                    setTags={setTags}
                    genre={genre}
                    setGenre={setGenre}
                    minLikes={minLikes}
                    setMinLikes={setMinLikes}
                    isPremium={isPremium}
                    setIsPremium={setIsPremium}
                    onSearch={() => fetchBooks(1, false)}
                />
                <div className="flex-1">
                    <BrowseBookGrid filteredBooks={filteredBooks}/>

                    {/* Infinite scroll trigger */}
                    {hasMore && (
                        <div
                            ref={observerTarget}
                            className="flex justify-center items-center py-8"
                        >
                            {loadingMore && (
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 border-3 border-[#C0FFB3] border-t-[#1A5632] rounded-full animate-spin"></div>
                                    <span className="text-gray-600">Loading more books...</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* No more books message */}
                    {!hasMore && allBooks.length > 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No more books to load
                        </div>
                    )}

                    {/* No books found */}
                    {!loading && allBooks.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600 mb-2">No books found</p>
                            <p className="text-gray-500">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;
