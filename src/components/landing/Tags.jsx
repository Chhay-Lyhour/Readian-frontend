import React from 'react'
import { Link } from 'react-router-dom'

const Tags = () => {
    const tagsList = [
        {id:0,name:"Romance"},
        {id:1,name:"Mystery"},
        {id:2,name:"Horror"},
        {id:3,name:"Thriller"},
        {id:4,name:"Sci-fi"},
        {id:5,name:"Supernatural"},
        {id:6,name:"Fantasy"},
        {id:7,name:"Poetry"}
    ]

  return (
    <div className='h-[550px] bg-gradient-to-b from-[#FFFDEE] to-[#C0FFB3] flex flex-col items-center justify-evenly'>
        {/* text */}
        <h1 className='geist text-[48px] text-center font-bold h-[62px]'>Browse through various tags</h1>

        {/* tags */}
        <div className='flex flex-wrap justify-evenly w-[1200px] gap-[30px]'>
            {tagsList.map((tag) => (
                //link to browse page with set tag
                <Link to={`/browse?tag=${tag.name.toLowerCase()}`} key={tag.id} className='w-[260px] h-[60px] rounded-[10px] bg-[#1A5632] flex items-center justify-center hover:scale-120 transition-all duration-300'>
                    <h1 className='geist text-[28px] font-semibold text-[#FFD7DF] text-center'>
                        {tag.name}
                    </h1>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Tags
