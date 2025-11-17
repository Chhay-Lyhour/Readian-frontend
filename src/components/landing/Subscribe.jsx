import React from 'react'
import { Link } from 'react-router-dom'


const Subscribe = ({signedIn}) => {
  return (
    <>
        {signedIn ? (
            // Show subscribe options
            <div className='flex flex-col justify-evenly items-center text-center h-[840px] bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE]'>
                <h1 className='geist text-[48px] font-semibold'>Become a subscriber!</h1>
                <p className='text-[32px]'>As a subscriber, you can gain access to more content, and even more benefits!</p>

                {/* tiers */}
                <div className='flex justify-evenly w-full'>
                    {/* Basic */}
                    <div className='flex flex-col justify-evenly items-center h-[340px] w-[240px] p-4 bg-white border-solid border-2 border-[#1A5632] rounded-tl-[30px] rounded-br-[30px]'>
                        <div className='w-[150px] h-[50px] rounded-[10px] bg-[#CEF17B]'>
                            <h1 className='geist text-[32px] font-semibold text-center'>Basic</h1>
                        </div>
                        <p className='font-semibold text-[16px]'>Access to public stories</p>
                        <p className='font-semibold text-[16px]'>No downloads, read only</p>
                        <p className='font-semibold text-[16px]'>Basic search options</p>
                        <p className='font-semibold text-[16px]'>Normal advertisements</p>
                        <p className='font-semibold text-[16px]'>Free</p>
                    </div>

                    {/* Silver */}
                    <div className='flex flex-col justify-evenly items-center h-[340px] w-[240px] p-4 bg-white border-solid border-2 border-[#1A5632] rounded-tl-[30px] rounded-br-[30px]'>
                        <div className='w-[150px] h-[50px] rounded-[10px] bg-[#CBCBCB]'>
                            <h1 className='geist text-[32px] font-semibold text-center'>Silver</h1>
                        </div>
                        <p className='font-semibold text-[16px]'>Access to public and premium stories</p>
                        <p className='font-semibold text-[16px]'>Maximum 20 downloads monthly</p>
                        <p className='font-semibold text-[16px]'>Advanced search options</p>
                        <p className='font-semibold text-[16px]'>Less advertisements</p>
                        <p className='font-semibold text-[16px]'>5.99$/month</p>
                    </div>

                    {/* Gold */}
                    <div className='flex flex-col justify-evenly items-center h-[340px] w-[240px] p-4 bg-white border-solid border-2 border-[#1A5632] rounded-tl-[30px] rounded-br-[30px]'>
                        <div className='w-[150px] h-[50px] rounded-[10px] bg-[#FFC900]'>
                            <h1 className='geist text-[32px] font-semibold text-center'>Gold</h1>
                        </div>
                        <p className='font-semibold text-[16px]'>Access to public and premium stories</p>
                        <p className='font-semibold text-[16px]'>Unlimited downloads</p>
                        <p className='font-semibold text-[16px]'>Advanced search options</p>
                        <p className='font-semibold text-[16px]'>No advertisements</p>
                        <p className='font-semibold text-[16px]'>12.99$/month</p>
                    </div>
                </div>

                <Link to="/subscribe">
                <button className='w-[200px] h-[60px] rounded-[15px] bg-[#1A5632] text-[#FFD7DF] text-[28px] hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300'>
                    Subscribe
                </button>
                </Link>
                
            </div>
        ) : (
            //show sign in option
            <div className='flex flex-col justify-evenly items-center text-center h-[440px] pr-[270px] pl-[270px] bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE]'>
                <h1 className='geist text-[48px] font-semibold'>
                    Sign in to access more features
                </h1>

                <p className='text-[32px] w-[90%]'>
                    With an account, you can start writing your own stories, leave likes on other people&apos;s works, and more!
                </p>

                <Link to="/signin">
                <button className='w-[200px] h-[60px] rounded-[15px] bg-[#1A5632] text-[#FFD7DF] text-[28px] hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300'>
                    Sign In
                </button>
                </Link>
            </div>
        )}
    </>

  )
}

export default Subscribe
