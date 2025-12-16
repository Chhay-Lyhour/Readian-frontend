import React from 'react'

const FAQ = () => {
  return (
    <div className=' p-[100px] border-t-2 border-solid'>
        <h1 className='geist font-semibold text-2xl'>FAQs</h1><br /><br />
        
        <h2 className='font-bold'>
            1. Can I start writing immediately? 
        </h2>
        <p>
            No, you must have an account in order to access the writing feature. Please remember to keep the content within our guidelines.
        </p><br />

        <h2  className='font-bold'>
            2. Is Readian free?
        </h2>
        <p>
            Yes, Readian is free. When newcomers arrive, they can immediately pick a story to read. However, they cannot perform some actions like liking works or writing, until they register for an account. After that, they are eligible to subscribe to a monthly subscription, which will offer more benefits like downloads and premium material.
        </p><br />
      
    </div>
  )
}

export default FAQ
