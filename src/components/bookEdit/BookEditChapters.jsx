import React from 'react'
import { Link } from 'react-router-dom'

//truncate
function truncate(str, n) {
    return str?.length > n ? str.substring(0, n-1) + "..." : str;
}

const BookEditChapters = ({chapters, onEditChapter, onNewChapter}) => {
    return (
        <div className='w-[910px] flex flex-col'>
            <h2 className='geist font-bold text-[32px] mb-6'>
                Chapters
            </h2>

            <div className="space-y-2 bg-[#C0FFB3] p-6 rounded-[20px] border-r-2 border-b-2 border-black">
            
            {chapters.map((chap) => (
              <div key={chap.id} title={chap.title} className="flex justify-between items-center p-2 border-b">
                <p className="text-lg">{truncate(chap.title,80)}</p>
                
                <button 
                  onClick={() => onEditChapter(chap.id)}
                  className="font-semibold text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </div>
            ))}


            </div>
            
            {/* New chapter */}
            <button 
                onClick={onNewChapter}
                className="block self-end w-fit mt-4 py-3 px-6 text-center bg-[#1A5632] text-[#FFD7DF] rounded-lg font-bold "
            >
                New Chapter
            </button>
        </div>
    )
}

export default BookEditChapters
