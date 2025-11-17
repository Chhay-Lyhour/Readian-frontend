import React from 'react'
import { Link } from 'react-router-dom'

//truncate
function truncate(str, n) {
    return str?.length > n ? str.substring(0, n-1) + "..." : str;
}

const SingleChapter = ({chapter,bookId}) => {
  return (
    <div className='w-full flex'>
      <Link to={`/book/${bookId}/chapter/${chapter.id}`} className='w-10/12 text-[24px] hover:underline '>
        {truncate(chapter.title, 50) || "No Chapter Title"}
      </Link>
      <p className='w-2/12 text-[24px]'>
        {chapter.date || "No Publish Date"}
      </p>
    </div>
  )
}

export default SingleChapter
