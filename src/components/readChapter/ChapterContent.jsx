import React from 'react'
import { Link } from 'react-router-dom'

const ChapterContent = ({chapter,bookId,book,prevChapter,nextChapter}) => {
    //func for scroll to top
    const handleBackToTop = () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    };


  return (
    <div className='relative w-[1000px] min-h-8/12 bg-[#FFD7DF] rounded-tr-[100px] rounded-bl-[100px]'>
        
        {/* Corner Section */}
        <div className='absolute top-0 left-0 bg-[#1A5632] w-[230px] h-[115px] rounded-br-[50px] flex justify-center items-center'>
            {/* text */}
            <h1 className='bg-none border-2 border-solid border-[#FFD7DF] rounded-[30px] h-[40px] pr-5 pl-5 text-[24px] text-[#FFD7DF]'>
                Reading
            </h1>
            {/* top right rectangles */}
            <div 
                className='absolute bg-[#FFD7DF] w-[150px] h-[115px] rounded-tl-[50px] z-10 top-0 left-[230px]'
            />
            <div 
                className='absolute bg-[#1A5632] w-[50px] h-[50px] z-0 top-0 left-[230px]'
            />
            {/* bottom left rctangles */}
            <div 
                className='absolute bg-[#FFD7DF] w-[150px] h-[115px] rounded-tl-[50px] z-10 top-[115px] left-0'
            />
            <div 
                className='absolute bg-[#1A5632] w-[50px] h-[50px] z-0 top-[115px] left-0'
            />
        </div>

        {/* Chapter detail */}
        <div className='relative pb-[50px] pt-[115px] px-[250px] flex flex-col items-center text-center z-20'>
            <h1 className='geist text-[28px] font-semibold'>
                {chapter.title || "No Title"}
            </h1><br />
            <div className='flex justify-center w-full'>
                <p>
                    Author: {book.author || "No Author"}
                </p>
            </div>
            <br />
            {/* Buttons */}
            <div className='flex justify-evenly w-full'>
                <Link 
                    to={`/book/${book.id}`}
                    className='content-center py-[5px] px-[50px] bg-white text-[#1A5632] rounded-[30px] hover:bg-[#1A5632] hover:text-white transition-all duration-300'
                >
                    Back to book
                </Link>
            </div>
        </div>

        {/* Chapter content */}
        <div className='bg-white py-[50px] px-[250px] rounded-bl-[100px] flex flex-col gap-[50px]'>
            <p className='text-[16px]'>
                {chapter.content || "This chapter has no content."}
            </p>

            {/* chapter nav buttons */}
            <div className='w-full flex justify-evenly'>
                {/* previous button */}
                {prevChapter ? (
                    <Link 
                        to={`/book/${bookId}/chapter/${prevChapter.id}`} 
                        className='geist text-[16px] font-medium hover:underline'
                    >
                    Previous
                </Link>
                ) : (
                    <span className='geist text-[16px] font-medium text-gray-400 cursor-not-allowed'>
                        Previous
                    </span>
                )}

                {/* back to top button */}
                <button onClick={handleBackToTop} className='geist text-[16px] font-medium hover:underline'>
                    Back to top
                </button>

                {/* next button */}
                {nextChapter ? (
                    <Link
                        to={`/book/${bookId}/chapter/${nextChapter.id}`}
                        className='geist text-[16px] font-medium hover:underline'
                    >
                        Next
                    </Link>
                ) : (
                    <span className='geist text-[16px] font-medium text-gray-400 cursor-not-allowed'>
                        Next
                    </span>
                )}
            </div>
        </div>
    </div>
  )
}

export default ChapterContent
