import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ signedIn, dashboardPath }) => {
  return (
    <div 
      id='home' 
      // 1. CHANGED: Removed fixed height/padding. Added min-height and responsive padding.
      // overflow-hidden prevents images from triggering horizontal scrollbars
      className='min-h-[600px] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE] overflow-hidden'
    >
      
      {/* --- LEFT SECTION: HERO TEXT --- */}
      {/* 2. CHANGED: Width is full on mobile, half on desktop (lg:w-1/2). Added z-index to keep text above images if they overlap. */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center z-10 mb-12 lg:mb-0 text-center lg:text-left'>
        
        <h1 className='geist text-4xl md:text-[48px] font-semibold leading-tight mb-6'>
          Discover Your New <span className='text-[#00A819]'>Favorite</span> Stories!
        </h1>

        {signedIn ? (
          <>
            <p className='text-lg md:text-xl mb-8'>
              Read and explore our vast catalog of works! <br className="hidden md:block"/>
              Find literary works that interest you! <br className="hidden md:block"/>
              Or start writing your own!
            </p>

            {/* Buttons: Stack on very small screens, row on larger */}
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center lg:justify-start'>
              <Link to="/browse">
                <button className='h-[40px] w-[150px] bg-[#1A5632] rounded-2xl text-[#FFD7DF] font-semibold hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300 border border-[#1A5632]'>
                  Browse
                </button>
              </Link>
              
              <Link to={dashboardPath}>
                <button className='h-[40px] w-[150px] bg-[#1A5632] rounded-2xl text-[#FFD7DF] font-semibold hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300 border border-[#1A5632]'>
                  Write
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>                
            <p className='text-lg md:text-xl mb-8'>
              Read and explore our vast catalog of works!<br className="hidden md:block"/> 
              Find literary works that interest you!
            </p>
            
            <div className='flex justify-center lg:justify-start'>
              <Link to="/browse">
                <button className='h-[40px] w-[150px] bg-[#1A5632] rounded-2xl text-[#FFD7DF] font-semibold hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300 border border-[#1A5632]'>
                  Browse
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* --- RIGHT SECTION: HERO IMAGES --- */}
      {/* 3. CHANGED: This container is 'relative'. The images inside are positioned relative to THIS BOX, not the page. */}
      {/* Hidden on small mobile, visible on large screens (lg:block) */}
      <div className='hidden lg:block relative w-1/2 h-[500px] ml-4'>
        
        {/* Image 1 (Top Left of container) */}
        <div className='absolute w-[210px] h-[280px] rounded-[20px] shadow-lg overflow-hidden left-0 top-0 z-30'>
          <img src="/shupogakis.jpg" alt="heroImg1" className='w-full h-full object-cover'/>
        </div>

        {/* Image 2 (Middle) */}
        <div className='absolute w-[210px] h-[280px] rounded-[20px] shadow-lg overflow-hidden left-[150px] top-[110px] z-20'>
          <img src="/brownie.jpg" alt="heroImg2" className='w-full h-full object-cover'/>
        </div>

        {/* Image 3 (Bottom Right) */}
        <div className='absolute w-[210px] h-[280px] rounded-[20px] shadow-lg overflow-hidden left-[270px] top-[220px] z-10'>
          <img src="/babyimpreyingonyoutonight.png" alt="heroImg3" className='w-full h-full object-cover'/>
        </div>
        
      </div>
    </div>
  )
}

export default Hero;