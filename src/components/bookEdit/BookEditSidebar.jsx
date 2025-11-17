import React from 'react'
import { Link } from 'react-router-dom'

const BookEditSidebar = ({stats, onDelete, isNewBook, onPublishWork, dashboardPath}) => {
    
    const isDraft = stats.pubStatus === 'draft' || isNewBook;
    const publishText = isDraft ? 'Publish Work' : 'Unpublish Work';
    const publishClass = isDraft 
        ? 'bg-green-500 text-white hover:bg-green-600' 
        : 'bg-yellow-500 text-black hover:bg-yellow-600';

  return (
    <aside className='bg-[#C0FFB3] w-[320px] min-h-svh flex flex-col gap-[50px] p-8'>
        <h1 className='geist text-[32px] font-semibold self-center'>
            Viewing Work
        </h1>

        <div className='self-stretch'>
            <h2 className='geist text-[24px] font-semibold'>
                Stats
            </h2>
            <p className='text-[20px]'>
                Views: {stats.views || 0}
            </p>
            <p className='text-[20px]'>
                Likes: {stats.likes || 0}
            </p>
        </div>

        {/* Back to dash */}
        <Link 
            to={dashboardPath}
            className='self-center text-center font-semibold bg-white w-full py-2 rounded-[15px] shadow-md hover:bg-black hover:text-white transition-all duration-300'
        >
            Back to dashboard
        </Link>

        {/* publish */}

        {stats.pubStatus === "draft" ? (
            <button
                onClick={onPublishWork}
                className='self-center font-semibold bg-white w-full py-2 rounded-[15px] shadow-md hover:bg-black hover:text-white transition-all duration-300'
            >
                {publishText}
            </button>
        ) : (
            <></>
        ) }
        

        {/* delete work */}
        {!isNewBook && (
            <button 
            onClick={onDelete}
            className='self-center font-semibold text-[#FF0000] bg-[#FFD7DF] w-full py-2 rounded-[15px] shadow-md hover:bg-[#FF0000] hover:text-white transition-all duration-300'
        >
            Delete Work
        </button>
        )}
        
    </aside>
  )
}

export default BookEditSidebar
