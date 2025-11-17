import React from 'react'

const AboutReadian = () => {
  return (
    <div className='h-[510px] bg-[#C0FFB3] flex justify-evenly items-center'>
        {/* About Text */}
        <div className='h-[300px] w-[620px] flex flex-col justify-between'>
            <h1 className='geist font-semibold text-[64px]'>
                What Is <span className='text-[#00A819]'>Readian</span>?
            </h1>
            <p className='text-[24px]'>Readian is a platform made for public users to read, write, and share stories amongst each other. Let your creativity flow unbounded into your works. Write about anything you can think of, from magic wielding warlocks, to your average Jim working the local bar.</p>
        </div>
      
        {/* Image */}
        <div className='h-[300px]'>
            <img src="/bookstack.png" alt="book stack" className='h-full'/>
        </div>
    </div>
  )
}

export default AboutReadian
