import React from 'react';
import { Link } from 'react-router-dom';

// truncate text
function truncate(str, n) {
  return str?.length > n ? str.substring(0, n-1) + "..." : str;
}

const AllWorksCard = ({ book, onRemove }) => {
  // Destructure the book
  const {
    id, title, author, publishDate, cover, tags,
    status, description, chapters, views, likes
  } = book;

  return (
    // 'group' utility class allows child elements to react on hover
    <div className='group relative flex rounded-[10px] border-solid border-2 w-[650px] h-[250px] bg-white overflow-hidden transition-all duration-300'>
      
      {/* --- Hover Overlay --- */}
      {/* Starts hidden (opacity-0), becomes visible on group-hover */}
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={onRemove}
          className="bg-red-500 text-[#FFD7DF] font-bold py-2 px-8 rounded-lg hover:bg-[#FFD7DF] hover:text-[#FF0000] transition-all duration-300"
        >
          Remove
        </button>
        <Link
          to={`/book/${id}`}
          className="bg-white text-black font-bold py-2 px-8 rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          View
        </Link>
      </div>

      {/* --- Original Card Content --- */}
      {/* Image */}
      {book.cover ? (
        <div className='bg-[#CEF17B] w-4/12 h-full rounded-l-[10px]'>
          <img src={book.cover} alt={book.title || "Book Cover"} className='w-full h-full object-cover' />
        </div>
      ) : (
        <div className='bg-[#CEF17B] w-4/12 h-full rounded-l-[10px] flex items-center justify-center'>
          <h1 className='text-center'>No Preview</h1>
        </div>
      )}

      {/* Details */}
      <div className='flex flex-col p-[20px] w-full justify-between'>
        {/* Top section */}
        <div className='flex justify-between w-full'>
          <div>
            <h1 className='geist font-semibold text-[28px]' title={title || "Title unavailable"}>
              {truncate(title,10) || "Title unavailable"}
            </h1>
            <p className='text-[12px]'>
              By {author || "Author unavailable"}
            </p>
          </div>
          <p>{publishDate || "Publish date unavailable"}</p>
        </div>

        {/* Tags */}
        <div>
          <p className='text-[16px] font-semibold'>
            Tags: {truncate(tags.join(", "), 100) || "No tags provided"}
          </p>
        </div>

        {/* Middle section */}
        <div>
          <p className='font-bold text-[16px]'>{status}</p>
          <p className='text-[12px] w-[440px] wrap-break-word' title={description || "No description provided"}>
            {truncate(description, 100) || "No description provided"}
          </p>
        </div>

        {/* Bottom section */}
        <div className='flex gap-[10px]'>
          <p className='text-[10px]'>Chapters: {chapters || "None"}</p>
          <p className='text-[10px]'>Views: {views || "None"}</p>
          <p className='text-[10px]'>Likes: {likes || "None"}</p>
        </div>
      </div>
    </div>
  );
}

export default AllWorksCard;