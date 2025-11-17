import React from 'react'
import SingleChapter from './SingleChapter'

const BookChapters = ({chapterList,bookId}) => {
  return (
    <div className='relative w-[1000px] rounded-br-[100px] bg-[#FFD7DF]'>
        {/* corner section */}
        <div className='absolute top-0 left-0 bg-[#1A5632] w-[230px] h-[115px] rounded-br-[50px] flex justify-center items-center'>
            {/* text */}
            <h1 className='bg-none border-2 border-solid border-[#FFD7DF] rounded-[30px] h-[40px] pr-5 pl-5 text-[24px] text-[#FFD7DF]'>
                Chapters
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

        {/* List of chapters */}
        {(chapterList && chapterList.length > 0) ? (
            <div className='relative mt-[115px] px-[100px] py-[50px] z-20'>
                {chapterList.map((chapter) => <SingleChapter key={chapter.id} chapter={chapter} bookId={bookId}/>)}
            </div>
        ) : (
            <div className='relative mt-[115px] px-[100px] py-[50px] z-20'>
                <h1>No Chapters Available</h1>
            </div>
        )}
        
    </div>
  )
}

export default BookChapters
