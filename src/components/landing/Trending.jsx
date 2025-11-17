import React from 'react'
import { Link } from 'react-router-dom';
import { allBooksData } from '../../data/mockData';

const Trending = () => {

    const trendingBooks = allBooksData
        .filter(book => book.pubStatus === 'published')
        .sort((a,b) => (b.likes || 0) - (a.likes || 0))
        .slice(0,5);

    const displaySlots = Array.from({length: 5},(_,index) => trendingBooks[index] || null );

  return (
    <div className='bg-[#FFFDEE] h-[600px] pr-[100px] pl-[100px] flex flex-col gap-[70px]'>
        {/* Trending text */}
        <div>
            <h1 className='geist text-[48px] font-semibold'>
                See <span className='text-[#00A819]'>trending</span> works
            </h1>
        </div>

        {/* Trending stories list */}
        <div className='flex justify-evenly'>

            {displaySlots.map((book, index) => (
              
              // Check if the slot is a real book or null
              book ? (
                
                // --- It's a REAL BOOK, so make it a Link ---
                <Link 
                  to={`/book/${book.id}`} 
                  key={book.id} 
                  className='w-[210px] h-[340px] bg-none flex flex-col justify-between hover:scale-110 transition-all duration-300'
                >
                    {/* cover img (using 'coverImage' from your mock data) */}
                    {book.cover ? (
                        <div className='w-full h-[280px] bg-[#CEF17B] rounded-[20px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]'>
                            <img src={book.cover} alt={book.title || "Book cover"} className='w-full h-full object-cover rounded-[20px]'/>    
                        </div>
                    ) : (
                        <div className='w-full h-[280px] bg-[#CEF17B] rounded-[20px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center text-center'>
                            Preview unavailable
                        </div>
                    )}
                    <h1 
                      title={book.title ? book.title : "Title unavailable"} 
                      className='text-[20px] font-semibold text-center h-[30px] overflow-hidden'
                    >
                        {book.title ? book.title : "Title unavailable"}
                    </h1>
                </Link>

              ) : (

                // --- It's an EMPTY SLOT, so make it an unclickable div ---
                <div 
                  key={`slot-${index}`} 
                  className='w-[210px] h-[340px] bg-none flex flex-col justify-between'
                >
                    <div className='w-full h-[280px] bg-gray-200 opacity-50 rounded-[20px] shadow-inner flex items-center justify-center text-center'>
                        Slot Available
                    </div>
                    <h1 
                      className='text-[20px] font-semibold text-center h-[30px] overflow-hidden text-gray-400'
                    >
                        ...
                    </h1>
                </div>

              )
            ))}
        </div>

    </div>
  )
}

export default Trending
