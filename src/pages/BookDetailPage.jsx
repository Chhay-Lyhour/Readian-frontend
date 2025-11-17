import React from 'react'
import { useParams } from 'react-router-dom';
import BookDetail from '../components/bookDetail/BookDetail';
import { Link } from 'react-router-dom';

//import mock data
import { allBooksData } from '../data/mockData';
import BookChapters from '../components/bookDetail/BookChapters';

const BookDetailPage = ({signedIn,currentUser}) => {
 

  //get book id
  const { id } = useParams();

  //find the book
  const book = allBooksData.find(b => b.id === Number(id));

  //if no book
  if (!book) {
    return (
      <div className="bg-[#1e593e] min-h-svh p-8 text-white text-center text-2xl">
        Book not found.
      </div>
    )
  }

  //if user is not subbed and book is premium
  const isPremium = book.premiumStatus === 'premium';
  
  // User Permission Check
  const canSeePremium = currentUser?.role === 'admin' || currentUser?.isSubscribed;

  // Check 4: Block access if the book is premium AND the user can't see it
  if (isPremium && !canSeePremium) {
    return (
      <div className="bg-[#CEF17B] min-h-screen p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl mb-6">
          This book is for premium members only.
        </p>
        <Link 
          to="/subscribe"
          className="bg-[#FFD7DF] text-[#1A5632] font-bold py-3 px-6 rounded-lg hover:bg-[#1A5632] hover:text-[#FFD7DF] transition-all duration-300"
        >
          Subscribe Now
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-[#1A5632] flex flex-col gap-[50px] py-[100px] items-center'>

        {/* Book Detail */}
        <BookDetail book={book} signedIn={signedIn} currentUser={currentUser}/>

        {/* Book Chapters */}
        <BookChapters chapterList={book.chapterList} bookId={book.id}/>
    </div>
  )
}

export default BookDetailPage
