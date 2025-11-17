import React from 'react';
import { useEffect, useRef } from 'react';


function ChapterEditorForm({
  title, setTitle,
  content, setContent,
  prevChapter, nextChapter,
  onNavPrev, onNavNext,
  handleSave
}) {


const titleRef=useRef(null);

useEffect(() => {
    if (titleRef.current) {
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
}, [title]);

const textRef = useRef(null);

useEffect(() => {
    if (textRef.current) {
        textRef.current.style.height = "auto";
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
}, [content])




const handleBackToTop = () => {
    // You can scroll the main content div, or the whole window
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
  
// Button styles
const navStyle = "geist py-2 px-6 rounded font-semibold transition-all";
const activeNav = `${navStyle} text-black hover:underline`;
const disabledNav = `${navStyle} text-gray-400 cursor-not-allowed`;

return (
    <main className="w-full bg-[#1A5632] p-12 flex flex-col items-center ">

        {/* Editing section */}
        <div className='relative w-[1000px] bg-[#FFD7DF] rounded-bl-[100px] rounded-tr-[100px] z-10'>
            {/* Corner Section */}
            <div className='absolute top-0 left-0 bg-[#1A5632] w-[230px] h-[115px] rounded-br-[50px] flex justify-center items-center'>
                {/* text */}
                <h1 className='bg-none border-2 border-solid border-[#FFD7DF] rounded-[30px] h-[40px] pr-5 pl-5 text-[24px] text-[#FFD7DF]'>
                    Editing
                </h1>
                {/* top right rectangles */}
                <div 
                    className='absolute bg-[#FFD7DF] w-[150px] h-[115px] rounded-tl-[50px] z-10 top-0 left-[230px]'
                />
                <div 
                    className='absolute bg-[#1A5632] w-[50px] h-[50px] z-0 top-0 left-[230px]'
                />
                {/* bottom left rctangles */}
                <div 
                    className='absolute bg-[#FFD7DF] w-[150px] h-[115px] rounded-tl-[50px] z-10 top-[115px] left-0'
                />
                <div 
                    className='absolute bg-[#1A5632] w-[50px] h-[50px] z-0 top-[115px] left-0'
                />
            </div>
            
            {/* Form for Title */}
            <div className='relative min-h-[230px]  pb-[50px] pt-[115px] px-[250px] z-20 flex flex-col items-center gap-4'>
                
                <textarea
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Chapter Title"
                    className="geist text-[28px] font-bold bg-transparent outline-none w-[70%] text-center resize-none overflow-hidden leading-tight text-wrap "
                    rows={1}
                    onInput={(e) => {
                        // Auto-resize textarea as user types
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                /> 

                <button 
                    onClick={handleSave}
                    className='py-1 px-6 rounded-[15px] border-[#1A5632] border-2 bg-[#1A5632] text-[#FFD7DF] hover:bg-[#FFD7DF] hover:text-[#1A5632]'
                >
                    Save    
                </button> 
            </div>
            

            {/* Form for Content */}
            <div className='bg-white px-[250px] pt-[50px] pb-[20px] '>
                <textarea 
                    ref={textRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your story here"
                    className="text-[16px] w-full bg-white outline-none resize-none overflow-hidden "
                    onInput={(e) => {
                        // Auto-resize textarea as user types
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                />   
            </div>
            

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center bg-white pb-[50px] px-[250px] rounded-bl-[100px]">
                <button 
                onClick={onNavPrev}
                disabled={!prevChapter}
                className={prevChapter ? activeNav : disabledNav}
                >
                    Previous
                </button>
        
                <button 
                onClick={handleBackToTop}
                className={activeNav}
                >
                    Back to Top
                </button>
        
                <button 
                onClick={onNavNext}
                disabled={!nextChapter}
                className={nextChapter ? activeNav : disabledNav}
                >
                    Next
                </button>
            </div>

        </div>
      
        
      
      
    </main>
  );
}

export default ChapterEditorForm;