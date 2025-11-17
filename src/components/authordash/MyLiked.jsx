import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { allBooksData } from '../../data/mockData';
import BookCard from '../browse/BookCard';

const MyLiked = () => {

    const { user } = useOutletContext();

    //find full book objects that match user's liked ids
    const likedBooks = allBooksData.filter(book => user.likedBooksIDs.includes(book.id))

  return (
    <div className='flex flex-col items-center'>
        <h1 className='geist text-[48px] font-semibold mb-6 self-start'>
            <span className='text-[#00A819]'>Liked</span> Works
        </h1>
        {/* display */}
        <div className="grid grid-cols-2 gap-2 w-[100%]">
            {likedBooks.length > 0 ? (
                likedBooks.map(book => <BookCard key={book.id} book={book} />)
            ) : (
                <p className='text-[16px] font-semibold'>
                    You haven&quot;t liked any works yet!
                </p>
            )}
        </div>
    </div>
  )
}

export default MyLiked
