import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { allBooksData } from '../../data/mockData';
import BookCard from '../browse/BookCard'; // Re-use your card component!

function MyWorks() {
  // 1. Get the 'user' object from the Outlet's context
  const { user } = useOutletContext();

  // 2. Filter the books just like you did before
  const myWorks = allBooksData.filter(book => book.authorId === user.id && book.pubStatus === "published");

  return (
    <div className='flex flex-col w-full'>
      <h1 className="geist text-[48px] font-semibold mb-6 self-start ">
        My <span className='text-[#00A819]'>Works</span>
      </h1>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 2xl:gap-2 w-full place-items-center">
        {myWorks.length > 0 ? (
          myWorks.map(book => <BookCard key={book.id} book={book} linkTo={`/edit/${book.id}`}/>)
        ) : (
          <p>You haven't published any works yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyWorks;