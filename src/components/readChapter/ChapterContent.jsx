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
    <div className='relative w-full max-w-[1200px] mx-2 sm:mx-4 md:mx-auto min-h-8/12 bg-[#FFD7DF] rounded-tr-[30px] sm:rounded-tr-[40px] md:rounded-tr-[60px] lg:rounded-tr-[100px] rounded-bl-[30px] sm:rounded-bl-[40px] md:rounded-bl-[60px] lg:rounded-bl-[100px] overflow-hidden'>

        {/* Corner Section */}
        <div className='absolute top-0 left-0 bg-[#1A5632] w-[160px] sm:w-[200px] md:w-[230px] h-[80px] sm:h-[100px] md:h-[115px] rounded-br-[30px] sm:rounded-br-[40px] md:rounded-br-[50px] flex justify-center items-center'>
            {/* text */}
            <h1 className='bg-none border-2 border-solid border-[#FFD7DF] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] h-[32px] sm:h-[36px] md:h-[40px] px-3 sm:px-4 md:px-5 text-[18px] sm:text-[20px] md:text-[24px] text-[#FFD7DF] flex items-center justify-center'>
                Reading
            </h1>
            {/* top right rectangles */}
            <div 
                className='absolute bg-[#FFD7DF] w-[100px] sm:w-[130px] md:w-[150px] h-[80px] sm:h-[100px] md:h-[115px] rounded-tl-[30px] sm:rounded-tl-[40px] md:rounded-tl-[50px] z-10 top-0 left-[160px] sm:left-[200px] md:left-[230px]'
            />
            <div 
                className='absolute bg-[#1A5632] w-[35px] sm:w-[45px] md:w-[50px] h-[35px] sm:h-[45px] md:h-[50px] z-0 top-0 left-[160px] sm:left-[200px] md:left-[230px]'
            />
            {/* bottom left rectangles */}
            <div
                className='absolute bg-[#FFD7DF] w-[100px] sm:w-[130px] md:w-[150px] h-[80px] sm:h-[100px] md:h-[115px] rounded-tl-[30px] sm:rounded-tl-[40px] md:rounded-tl-[50px] z-10 top-[80px] sm:top-[100px] md:top-[115px] left-0'
            />
            <div 
                className='absolute bg-[#1A5632] w-[35px] sm:w-[45px] md:w-[50px] h-[35px] sm:h-[45px] md:h-[50px] z-0 top-[80px] sm:top-[100px] md:top-[115px] left-0'
            />
        </div>

        {/* Chapter detail */}
        <div className='relative pb-6 sm:pb-8 md:pb-12 pt-[90px] sm:pt-[110px] px-4 sm:px-6 md:px-12 lg:px-[200px] xl:px-[250px] flex flex-col items-center text-center z-20'>
            <h1 className='geist text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight'>
                {chapter.title || "No Title"}
            </h1>
            <div className='flex justify-center w-full'>
                <p className='text-sm sm:text-base md:text-lg text-gray-600 font-medium'>
                    by <span className='text-[#1A5632] font-semibold'>{book.author?.name || "Unknown Author"}</span>
                </p>
            </div>
        </div>

        {/* Chapter content */}
        <div className='bg-white py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 rounded-bl-[30px] sm:rounded-bl-[40px] md:rounded-bl-[50px] lg:rounded-bl-[100px] flex flex-col gap-6 sm:gap-8 md:gap-[50px]'>
            <article className='prose prose-base sm:prose-lg md:prose-xl max-w-none'>
                <p className='text-base sm:text-lg md:text-xl lg:text-[21px] leading-relaxed sm:leading-relaxed md:leading-loose text-gray-800 whitespace-pre-wrap font-serif break-words'>
                    {chapter.content || "This chapter has no content."}
                </p>
            </article>

            {/* chapter nav buttons */}
            <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t-2 border-gray-200'>
                {/* previous button */}
                {prevChapter ? (
                    <Link 
                        to={`/book/${bookId}/chapter/${prevChapter.chapterNumber}`}
                        className='px-6 py-3 bg-[#1A5632] text-white rounded-lg font-semibold hover:bg-[#00A819] hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2 w-full sm:w-auto justify-center'
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous Chapter
                    </Link>
                ) : (
                    <div className='px-6 py-3 bg-gray-200 text-gray-400 rounded-lg font-semibold cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous Chapter
                    </div>
                )}

                {/* back to top button */}
                <button
                    onClick={handleBackToTop}
                    className='px-6 py-3 bg-white border-2 border-[#1A5632] text-[#1A5632] rounded-lg font-semibold hover:bg-[#1A5632] hover:text-white transition-all duration-300 shadow-md flex items-center gap-2 w-full sm:w-auto justify-center'
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    Back to Top
                </button>

                {/* next button */}
                {nextChapter ? (
                    <Link
                        to={`/book/${bookId}/chapter/${nextChapter.chapterNumber}`}
                        className='px-6 py-3 bg-[#1A5632] text-white rounded-lg font-semibold hover:bg-[#00A819] hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2 w-full sm:w-auto justify-center'
                    >
                        Next Chapter
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ) : (
                    <div className='px-6 py-3 bg-gray-200 text-gray-400 rounded-lg font-semibold cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center'>
                        Next Chapter
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default ChapterContent
