import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex bg-[#FFFDEE] h-[280px] justify-center'>
        <div className='flex self-end justify-between pt-[40px] pl-[100px] h-[190px] w-[80%] border-solid border-t-6 border-l-6 border-r-6 border-[#1A5632] bg-[#C0FFB3] rounded-t-[100px]'>
            <div className='w-[40%] '>
                <h1 className='geist text-2xl font-semibold'>Reach Out Below!</h1>
                <p>Email: ReadianSupport@gmail.com</p>
                <p>Phone: 000 000 000</p>
                <p>Address: We don&apos;t exist.</p>
            </div>
            <div className='w-[30%] flex flex-col'>
                <h1 className='geist text-2xl font-semibold'>Navigate</h1>
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/instruction">Help</Link>

            </div>
            <h1 className='self-end'>
                @2025 Readian
            </h1>
        </div>
    </footer>
  )
}

export default Footer
