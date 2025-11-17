import React from 'react';

function ChapterEditorSidebar({
  currentChapterId,
  currentChapterTitle,
  chapterList,
  onNavChange,
  onBack,
  onDelete
}) {
  return (
    <aside className="bg-[#C0FFB3] w-[320px] min-h-svh p-8 flex flex-col gap-[50px]">
      <h1 className="geist text-[32px] font-bold text-center">Editing Chapter Content</h1>

        <div>
            <label htmlFor="chapter-select" className="block mb-2 font-bold">
                Go to Chapter:
            </label>
            <select 
                id="chapter-select"
                value={currentChapterId}
                onChange={onNavChange}
                className="w-full p-2 rounded bg-white text-black"
            >
                {chapterList.map(chap => (
                <option key={chap.id} value={chap.id}>
                    {chap.title}
                </option>
                ))}
            </select>            
        </div>

      
      <button 
        onClick={onBack}
        className="w-full bg-white text-black p-3 rounded-[15px] py-2 shadow-md font-semibold hover:bg-black hover:text-white transition-all duration-300"
      >
        Back to book edit
      </button>

      <button 
        onClick={onDelete}
        className='self-center font-semibold text-[#FF0000] bg-[#FFD7DF] w-full py-2 rounded-[15px] shadow-md hover:bg-[#FF0000] hover:text-white transition-all duration-300'
      >
        Delete Current Chapter
      </button>
    </aside>
  );
}

export default ChapterEditorSidebar;