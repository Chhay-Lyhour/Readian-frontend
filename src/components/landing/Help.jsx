import React from 'react'
import { Link } from 'react-router-dom'

const Help = () => {
  return (
    <div className='bg-[#FFFDEE] h-[490px] pt-[50px] pb-[50px] pr-[100px]'>
      <div className='flex flex-col justify-evenly text-center bg-[#1A5632] rounded-r-[100px] h-[390px] pl-[100px]'>
        <h1 className='geist text-[48px] text-white font-semibold'>Not sure what to do?</h1>
        <p className='text-[32px] text-white'>Visit our instructions page to find helpful tips, FAQs, and instructions on how to use the site.</p>

        <Link to="/instruction">
        <button className='w-[200px] h-[50px] rounded-[15px] font-semibold text-[32px] bg-[#FFD7DF] text-[#1A5632] hover:bg-[#1A5632] hover:text-[#FFD7DF] hover:border-[#FFD7DF] border-solid border-1 transition-all duration-300'>
            Help
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Help
