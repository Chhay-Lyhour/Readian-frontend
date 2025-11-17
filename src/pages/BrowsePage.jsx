import React, { useState,useMemo, createRef} from 'react'
import { useSearchParams } from 'react-router-dom'
import BrowseSidebar from '../components/browse/BrowseSidebar'
import BrowseBookGrid from '../components/browse/BrowseBookGrid'

//import mockdata
import { allBooksData } from '../data/mockData'

const BrowsePage = ({currentUser}) => {
    //read url
    const [searchParams, setSearchParams] = useSearchParams();

    //get tag from url. default all
    const initialTag = searchParams.get('tag') || '';

    //state for all filters
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('All');
    const [tags, setTags] = useState(initialTag);
    const [minLikes, setMinLikes] = useState(0);

    //filter book logic
    const filteredBooks = useMemo(() => {
        let books = allBooksData.filter(book => book.pubStatus === 'published');
        
        //premium filter
        const canSeePremium = currentUser?.role === 'admin' || currentUser?.isSubscribed;
        if (!canSeePremium) {
            books = books.filter(book => book.premiumStatus === 'free')
        }

        //title filter
        if (title) {
            books = books.filter(book => (book.title || "").toLowerCase().includes(title.toLowerCase()));
        }

        //author filter
        if (author) {
            books = books.filter(book => (book.author || "").toLowerCase().includes(author.toLowerCase()));
        }

        //status filter
        if (status !== 'All') {
            books = books.filter(book => book.status === status);
        }

        //tag filter
        // cleaning tag filter string
        const filterTags = tags
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(t => t.length > 0)

        //apply tag filter
        if (filterTags.length > 0) {
            books = books.filter(book => {
                const bookTags = book.tags.map(t => t.toLowerCase());

                // hybrid filter (if 1 tag typed, search book with tag. If multiple typed, search book will all tags typed)
                if (filterTags.length === 1) {
                    return bookTags.includes(filterTags[0]);
                } else {
                    return filterTags.every(tag => bookTags.includes(tag));
                }
            }

                // book.tags.some(bookTag => filterTags.includes(bookTag.toLowerCase()))
            )
        };

        //min like filter
        if (minLikes > 0) {
            books = books.filter(book => book.likes >= minLikes);
        }

        //if no filters, sort by date
        if (!author && status === 'All' && tags === '' && minLikes === 0) {
            books.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        }

        return books.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    },[title,author,status,tags,minLikes,allBooksData]); //refilter when any of these change

  return (
    <div className='bg-[#FFFDEE] flex'>
        <BrowseSidebar 
            title = {title}
            setTitle = {setTitle}
            author = {author}
            setAuthor = {setAuthor}
            status = {status}
            setStatus = {setStatus}
            tags = {tags}
            setTags = {setTags}
            minLikes = {minLikes}
            setMinLikes = {setMinLikes}
        />
        {/* book list  */}
        <BrowseBookGrid filteredBooks={filteredBooks}/>
    </div>
  )
}

export default BrowsePage
