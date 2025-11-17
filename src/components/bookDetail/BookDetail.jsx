import React from 'react'
import { Link } from 'react-router-dom';

//truncate
function truncate(str, n) {
    return str?.length > n ? str.substring(0, n-1) + "..." : str;
}

const BookDetail = ({book,signedIn,currentUser}) => {

  //check if user liked the book
  const isLiked = currentUser?.likedBooksIDs?.includes(book.id);

  //handle like
  const handleLike = () => {
    if (!currentUser) {
      alert("Please sign in to leave a like!")
    } else {
      // API requests here
      if (isLiked) {
        console.log(`User ${currentUser.id} named ${currentUser.username} unliked book ${book.id}`);
        //remove id from the state
      } else {
        console.log(`User ${currentUser.id} named ${currentUser.username} liked book ${book.id}`);
      }
    }
  }

  return (
    <div className='relative w-[1000px] bg-white rounded-tr-[100px] rounded-bl-[100px] overflow-hidden flex flex-col'>
      {/* Corner Section */}
      <div className='absolute top-0 left-0 bg-[#1A5632] w-[230px] h-[115px] rounded-br-[50px] flex justify-center items-center'>
        {/* text */}
        <h1 className='bg-none border-2 border-solid border-[#FFD7DF] rounded-[30px] h-[40px] pr-5 pl-5 text-[24px] text-[#FFD7DF]'>
          General Info
        </h1>
        {/* top right rectangles */}
        <div 
          className='absolute bg-white w-[150px] h-[115px] rounded-tl-[50px] z-10 top-0 left-[230px]'
        />
        <div 
          className='absolute bg-[#1A5632] w-[50px] h-[50px] z-0 top-0 left-[230px]'
        />
        {/* bottom left rctangles */}
        <div 
          className='absolute bg-white w-[150px] h-[115px] rounded-tl-[50px] z-10 top-[115px] left-0'
        />
        <div 
          className='absolute bg-[#1A5632] w-[50px] h-[50px] z-0 top-[115px] left-0'
        />
      </div>

      <div className='flex'>
        {/* Details */}
        <div className='relative mt-[115px] pt-[50px] pl-[50px] pr-[50px] w-[750px] h-[230px] bg-none z-20'>
          {/* top */}
          <div className='flex'>
            {/* book metadata */}
            <div className='w-8/12'>
              <p className='geist text-[12px]'>Published: {book.publishDate || "Date Unavailable"}</p>
              <h1 className='geist text-[24px] font-semibold' title={book.title}>{book.title ? truncate(book.title, 50) : "No Title"}</h1>
              <p className='text-[16px]'>By: {book.author || "No Author"}</p>
            </div>
          
            {/* book stats */}
            <div className='w-4/12 flex justify-evenly'>
              {/* chapters */}
              <div className='flex flex-col items-center'>
                <h1>Chapters</h1>
                <p>{book.chapters || 0}</p>
              </div>

              <div className='flex flex-col items-center'>
                <h1>Views</h1>
                <p>{book.views || 0}</p>
              </div>

              <div className='flex flex-col items-center'>
                <h1>Likes</h1>
                <p>{book.likes || 0}</p>
              </div>

            </div>
          </div>

          {/* bottom buttons */}
        
            {signedIn ? (
              <div className='h-[66px] py-[10px] flex items-center justify-center gap-4'>
                <Link to={`/book/${book.id}/chapter/1`} className='content-center py-[5px] px-[50px] bg-white text-[#1A5632] rounded-[30px] hover:bg-[#1A5632] hover:text-white transition-all duration-300'>
                  Start Reading
                </Link>

                {isLiked ? (
                  <button onClick={handleLike} className='content-center py-[5px] px-[50px] bg-white text-[#1A5632] rounded-[30px] hover:bg-[#1A5632] hover:text-white transition-all duration-300'>
                    Liked
                  </button>
                ) : (
                  <button onClick={handleLike} className='content-center py-[5px] px-[50px] bg-white text-[#1A5632] rounded-[30px] hover:bg-[#1A5632] hover:text-white transition-all duration-300'>
                  Like
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    alert(`${book.title} has been downloaded!`)}
                  }
                  className='content-center py-[5px] px-[50px] bg-white text-[#1A5632] rounded-[30px] hover:bg-[#1A5632] hover:text-white transition-all duration-300'
                >
                  Download
                </button>

              </div>
            ) : (
              <div className='h-[66px] py-[10px] flex items-center justify-center'>
                <Link to={`/book/${book.id}/chapter/1`} className='content-center py-[5px] px-[50px] bg-white text-[#1A5632] rounded-[30px] hover:bg-[#1A5632] hover:text-white transition-all duration-300'>
                  Start Reading
                </Link>
              </div>
            )}
        </div>

        {/* Cover image */}
        <div className='w-[250px] h-[345px]'>
          <img 
            src={book.cover} 
            alt={book.title || "Image not found"} 
            className='h-full object-cover'
          />
        </div>
      </div>
      
      
      {/* description */}
      <div className='py-[50px] px-[100px] bg-[#FFD7DF] justify-items-center'>
        <h1 className='geist text-[32px] font-semibold'>Description</h1><br />
        <p>{book.description || "No description provided"}</p>
      </div>

    </div>
  )
}

export default BookDetail
