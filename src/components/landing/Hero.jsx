import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = ({ signedIn, dashboardPath }) => {
  return (
    <div 
      id='home' 
      className='min-h-[600px] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE] overflow-hidden relative'
    >
      
      {/* Floating decoration elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-20 h-20 bg-[#FF1493]/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#00A819]/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* LEFT SECTION: HERO TEXT */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center z-10 mb-12 lg:mb-0 text-center lg:text-left'>
        
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 w-fit mx-auto lg:mx-0 border border-[#00A819]/20 animate-fade-in">
          <Sparkles size={16} className="text-[#00A819]" />
          <span className="text-sm font-semibold text-gray-700">Start Your Reading Journey</span>
        </div>

        <h1 className='geist text-4xl md:text-[48px] font-semibold leading-tight mb-6 animate-fade-in'>
          Discover Your New{' '}
          <span className='text-[#00A819] bg-gradient-to-r from-[#00A819] to-[#1A5632] bg-clip-text text-transparent animate-gradient-text'>
            Favorite
          </span>{' '}
          Stories!
        </h1>

        {signedIn ? (
          <>
            <p className='text-lg md:text-xl mb-8 text-gray-700 animate-fade-in animation-delay-200'>
              Read and explore our vast catalog of works! <br className="hidden md:block"/>
              Find literary works that interest you! <br className="hidden md:block"/>
              Or start writing your own!
            </p>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start animate-fade-in animation-delay-400'>
              <Link to="/browse">
                <button className='group px-8 py-3 bg-gradient-to-r from-[#1A5632] to-[#00A819] rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2'>
                  Browse Stories
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to={dashboardPath}>
                <button className='px-8 py-3 bg-white border-2 border-[#1A5632] rounded-xl text-[#1A5632] font-semibold hover:bg-[#1A5632] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg'>
                  Start Writing
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>                
            <p className='text-lg md:text-xl mb-8 text-gray-700 animate-fade-in animation-delay-200'>
              Read and explore our vast catalog of works!<br className="hidden md:block"/>
              Find literary works that interest you!
            </p>
            
            <div className='flex justify-center lg:justify-start animate-fade-in animation-delay-400'>
              <Link to="/browse">
                <button className='group px-8 py-4 bg-gradient-to-r from-[#1A5632] to-[#00A819] rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-2 animate-pulse-slow'>
                  <span>Explore Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </>
        )}

        {/* Social proof badges */}
        <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-600 animate-fade-in animation-delay-600">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A5632] to-[#00A819] border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF1493] to-[#FFD7DF] border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00A819] to-[#C0FFB3] border-2 border-white"></div>
            </div>
            <span className="font-semibold">1000+ Readers</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★★★★★</span>
            <span className="font-semibold">4.8/5</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: HERO IMAGES */}
      <div className='hidden lg:block relative w-1/2 h-[500px] ml-4'>
        
        {/* Image 1 (Top Left of container) - With floating animation */}
        <div className='absolute w-[210px] h-[280px] rounded-[20px] shadow-2xl overflow-hidden left-0 top-0 z-30 animate-float border-4 border-white'>
          <img
            src="/shupogakis.jpg"
            alt="Featured Book"
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Image 2 (Middle) - With delayed floating animation */}
        <div className='absolute w-[210px] h-[280px] rounded-[20px] shadow-2xl overflow-hidden left-[150px] top-[110px] z-20 animate-float-delayed border-4 border-white'>
          <img
            src="/brownie.jpg"
            alt="Popular Book"
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
          />
          <div className="absolute top-2 right-2 bg-[#FF1493] text-white text-xs font-bold px-2 py-1 rounded-full">
            Trending
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Image 3 (Bottom Right) - With floating animation */}
        <div className='absolute w-[210px] h-[280px] rounded-[20px] shadow-2xl overflow-hidden left-[270px] top-[220px] z-10 animate-float border-4 border-white'>
          <img
            src="/babyimpreyingonyoutonight.png"
            alt="New Release"
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
          />
          <div className="absolute top-2 left-2 bg-[#00A819] text-white text-xs font-bold px-2 py-1 rounded-full">
            New
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;