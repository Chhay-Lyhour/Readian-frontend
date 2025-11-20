import React from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { allBooksData } from '../../data/mockData';
import BookCard from '../browse/BookCard';

const MyDrafts = () => {

    const { user } = useOutletContext();

    //filter for drafts
    const myDrafts = allBooksData.filter(book => book.authorId === user.id && book.pubStatus === "draft")

  return (
    <div className='flex flex-col items-center w-full'>
        {/* Top */}
        <div className='mb-6 flex flex-col gap-6 self-start'>
            <h1 className='geist text-[48px] font-semibold'>
                My <span className='text-[#00A819]'>Drafts</span>
            </h1>

            {/* Create button */}
            <Link to={`/edit/new`} className='bg-[#1A5632] rounded-full text-[#FFD7DF] text-[18px] text-center py-2 w-[200px] flex-initial hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300'>
            Create New
            </Link>
        </div>

        {/* display */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 2xl:gap-2 w-full place-items-center">
        {myDrafts.length > 0 ? (
          myDrafts.map(book => <BookCard key={book.id} book={book} linkTo={`/edit/${book.id}`} />)
        ) : (
          <p>You have no drafts.</p>
        )}
      </div>
    </div>
  )
}

export default MyDrafts
