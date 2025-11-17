import React from 'react'
import { Link } from 'react-router-dom';


const Hero = ({signedIn,dashboardPath}) => {
  return (
    <div id='home' className='h-[600px] flex pl-[250px] pr-[170px] bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE]'>
        {/* Hero Text */}
        <div className='w-[540px] self-center'>
            <h1 className='geist text-[48px] font-semibold'>
                Discover Your New <span className='text-[#00A819]'>Favorite</span> Stories!
            </h1>
            {signedIn ? (
                <>
                <p className='text-xl'>Read and explore our vast catalog of works! <br />Find literary works that interest you! <br />Or start writing your own!</p><br />
                <div className='flex gap-20'>
                    <Link to="/browse">
                        <button className='h-[40px] w-[150px] bg-[#1A5632] rounded-2xl text-[#FFD7DF] font-semibold hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300'>
                            Browse
                        </button>
                    </Link>
                    
                    <Link to={dashboardPath}>
                        <button className='h-[40px] w-[150px] bg-[#1A5632] rounded-2xl text-[#FFD7DF] font-semibold hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300'>
                            Write
                        </button>
                    </Link>
                    

                </div>
                </>
            ) : (
                <>                
                    <p className='text-xl'>Read and explore our vast catalog of works!<br /> Find literary works that interest you!</p><br />
                    <Link to="/browse">
                        <button className='h-[40px] w-[150px] bg-[#1A5632] rounded-2xl text-[#FFD7DF] font-semibold hover:text-[#1A5632] hover:bg-[#FFD7DF] transition-all duration-300'>
                            Browse
                        </button>
                    </Link>
                </>

            )}
            
        </div>

        {/* Hero images */}
        <div className='w-auto'>
            <div className='absolute h-[280px] w-[210px] rounded-[20px] shadow-[5px_5px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden left-[1050px] top-[130px] z-30'>
                <img src="/shupogakis.jpg" alt="heroImg1" className='absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full'/>
            </div>

            <div className='absolute h-[280px] w-[210px] rounded-[20px] shadow-[5px_5px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden left-[1200px] top-[260px] z-20'>
                <img src="/brownie.jpg" alt="heroImg2" className='absolute h-full left-[-41.99%] max-w-none top-[0.32%] w-[177.08%]'/>
            </div>

            <div className='absolute h-[280px] w-[210px] rounded-[20px] shadow-[5px_5px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden left-[1350px] top-[390px] z-10'>
                <img src="/babyimpreyingonyoutonight.png" alt="heroImg3" className='absolute h-full max-w-none'/>
            </div>
        </div>
    </div>
  )
}

export default Hero
