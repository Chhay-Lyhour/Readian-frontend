import React from 'react'
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='relative flex bg-[#FFFDEE] min-h-[280px] w-full justify-center px-4 overflow-hidden'>
      {/* Wave decoration */}
{/*       <div className="absolute top-0 left-0 w-full h-16 overflow-hidden pointer-events-none"> */}
{/*         <svg */}
{/*           viewBox="0 0 1200 120" */}
{/*           preserveAspectRatio="none" */}
{/*           className="w-full h-full" */}
{/*         > */}
{/*           <path */}
{/*             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" */}
{/*             fill="#C0FFB3" */}
{/*           ></path> */}
{/*         </svg> */}
{/*       </div> */}

      <div className='flex flex-col sm:flex-row self-end justify-between gap-6 sm:gap-8 pt-20 sm:pt-24 md:pt-[60px] px-4 sm:px-8 md:px-12 lg:px-[100px] pb-6 min-h-[240px] w-full sm:w-[90%] md:w-[85%] lg:w-[80%] border-solid border-t-4 border-l-4 border-r-4 border-[#1A5632] bg-gradient-to-b from-[#C0FFB3] to-[#00A819]/20 rounded-t-[50px] sm:rounded-t-[75px] md:rounded-t-[100px] shadow-2xl'>

        {/* Contact Info */}
        <div className='w-full sm:w-[40%] mb-6 sm:mb-0'>
          <h1 className='geist text-2xl md:text-3xl font-bold mb-4 text-[#1A5632]'>
            Reach Out Below!
          </h1>
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2 hover:text-[#00A819] transition-colors">
              <Mail size={18} />
              <a href="mailto:ReadianSupport@gmail.com" className="text-sm md:text-base">
                ReadianSupport@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 hover:text-[#00A819] transition-colors">
              <Phone size={18} />
              <a href="tel:069283535" className="text-sm md:text-base">
                069 283 535
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <p className="text-sm md:text-base">
                Kirirom Mountain, Kampong Speu, Cambodia
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A5632] hover:bg-[#1A5632] hover:text-white transition-all hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A5632] hover:bg-[#1A5632] hover:text-white transition-all hover:scale-110 shadow-md"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A5632] hover:bg-[#1A5632] hover:text-white transition-all hover:scale-110 shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A5632] hover:bg-[#1A5632] hover:text-white transition-all hover:scale-110 shadow-md"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className='w-full sm:w-[25%] flex flex-col mb-6 sm:mb-0'>
          <h1 className='geist text-xl md:text-2xl font-bold mb-4 text-[#1A5632]'>
            Navigate
          </h1>
          <div className="space-y-2">
            <Link
              to="/"
              className='block text-sm md:text-base text-gray-700 hover:text-[#00A819] hover:translate-x-1 transition-all'
            >
              → Home
            </Link>
            <Link
              to="/browse"
              className='block text-sm md:text-base text-gray-700 hover:text-[#00A819] hover:translate-x-1 transition-all'
            >
              → Browse
            </Link>
            <Link
              to="/instruction"
              className='block text-sm md:text-base text-gray-700 hover:text-[#00A819] hover:translate-x-1 transition-all'
            >
              → Help
            </Link>
            <Link
              to="/subscribe"
              className='block text-sm md:text-base text-gray-700 hover:text-[#00A819] hover:translate-x-1 transition-all'
            >
              → Subscribe
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
