import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allBooksData } from '../data/mockData'; 
import ChapterContent from '../components/readChapter/ChapterContent';

function ReadChapterPage() {
  // Get the book & chap Id from the URL (e.g., "3")
  const { bookId,chapterId } = useParams();

  //get book first
  const book = allBooksData.find(b => b.id===Number(bookId));

  // 2. Find the current chapter's INDEX
  const currentChapterIndex = book ? 
    book.chapterList.findIndex(c => c.id === Number(chapterId)) : -1;

  // 3. Find the chapters using the index
  const chapter = (book && currentChapterIndex !== -1) ? 
    book.chapterList[currentChapterIndex] : null;
  
  const prevChapter = (book && currentChapterIndex > 0) ? 
    book.chapterList[currentChapterIndex - 1] : null;
  
  const nextChapter = (book && currentChapterIndex < book.chapterList.length - 1) ? 
    book.chapterList[currentChapterIndex + 1] : null;

  //find chapter in the book
  // let chapter = null;
  // if (book) {
  //   chapter = book.chapterList.find(c => c.id===Number(chapterId));
  // }

  //handle not found
  if (!book || !chapter) {
    return (
      <div className="p-8 text-center text-2xl">
        Chapter not found.
      </div>
    );
  }

  // Render the chapter content
  return (
    <div className='bg-[#1A5632] flex flex-col items-center py-[100px]'>
        <ChapterContent chapter={chapter} bookId={bookId} book={book} prevChapter={prevChapter} nextChapter={nextChapter}/>
    </div>
  );
}

export default ReadChapterPage;