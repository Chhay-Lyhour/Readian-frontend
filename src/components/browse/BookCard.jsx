import React from 'react'
import { Link } from 'react-router-dom'
import Tags from '../landing/Tags';

//truncate text
function truncate(str, n) {
    return str?.length > n ? str.substring(0, n-1) + "..." : str;
}

const BookCard = ({book, linkTo}) => {

// destructure the book
    const {
        id,
        title,
        author,
        publishDate,
        cover,
        tags,
        status,
        pubStatus,
        description,
        chapters,
        views,
        likes
    } = book;

    // defnie linkTo
    const destination = linkTo || `/book/${id}`;

  return (
    <Link 
        to={destination}
        className='flex rounded-[10px] border-solid border-2 w-[650px] h-[250px] bg-white overflow-hidden hover:scale-110 transition-all duration-300'
    >
        {book.cover ? (
            <div className='bg-[#CEF17B] w-4/12 h-full rounded-l-[10px]'>
                <img src={book.cover} alt={book.title || "Book Cover"} className='w-full h-full object-cover ' />
            </div>
        ) : (
            <div className='bg-[#CEF17B] w-4/12 h-full rounded-l-[10px] flex items-center justify-center'>
                <h1 className='text-center'>No Preview</h1>
            </div>
        )}

        {/* details */}
        <div className='flex flex-col p-[20px] w-full justify-between'>
            {/* Top section */}
            <div className='flex justify-between w-full'>
                <div>
                    <h1 
                    className='geist font-semibold text-[28px]'
                    title={title || "Title unavailable"}
                    >
                        {truncate(title,10) || "Title unavailable"}
                    </h1>
                    <p className='text-[12px]'>
                        By {author || "Author unavailable"}
                    </p>
                    {pubStatus === "draft" ? (
                        <p className='text-[16px] text-red-500 font-bold'>
                            (Draft)
                        </p>
                    ): (
                        <></>
                    )}
                </div>
                <p>
                    {publishDate || "Publish date unavailable"}
                </p>
            </div>

            {/* Tags */}
            <div>
                <p className='text-[16px] font-semibold'>
                    Tags: {truncate(tags.join(", "), 100) || "No tags provided"}
                </p>
            </div>

            {/* Middle section */}
            <div>
                <p className='font-bold text-[16px]'>
                    {status}
                </p>
                <p 
                className='text-[12px] w-[440px] wrap-break-word'
                title={description || "No description provided"}
                >
                    {truncate(description, 100) || "No description provided"}
                </p>
            </div>

            {/* Bottmo section */}
            <div className='flex gap-[10px]'>
                <p className='text-[10px]'>
                    Chapters: {chapters || "None" }
                </p>
                <p className='text-[10px]'>
                    Views: {views || "None" }
                </p>
                <p className='text-[10px]'>
                    Likes: {likes || "None" }
                </p>
            </div>
        </div>


    </Link>
  )
}

export default BookCard
