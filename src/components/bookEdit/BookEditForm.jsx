import React from 'react'
import { useState } from 'react';

const BookEditForm = ({title, setTitle, description, setDescription, status, setStatus, tags, setTags, premiumStatus, setPremiumStatus, onSave}) => {

    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        const newTag = tagInput.trim().toLowerCase();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
        }
        setTagInput('');
    };
  
     const handleDeleteTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-row gap-[50px] w-[910px]">
      
        {/* Cover Image */}
        <div className="w-[220px]">
            <div className="w-full h-[330px] bg-gray-300 rounded-[15px] flex items-center justify-center text-black mb-[20px]">
                Cover Image
            </div>
            <button className="w-full p-2 bg-black text-[#FFD7DF] rounded-[10px]">
                Upload Image
            </button>
        </div>

        {/* Story Details Form */}
        <form 
            className="w-[640px] bg-[#C0FFB3] p-6 rounded-[20px] border-b-2 border-r-2 border-black" 
            onSubmit={onSave}
        >
            <h2 className="geist text-2xl font-bold mb-4">Story Details</h2>
        
            {/* Title */}
            <label className="geist block font-semibold mb-1">Title</label>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-[10px] mb-4 bg-white"
            />

            {/* Description */}
            <label className="geist block font-semibold mb-1">Description</label>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-[10px] mb-4 h-32 bg-white"
            />
        
            {/* Tags */}
            <label className="geist block font-semibold mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
                <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full p-2 border rounded-[10px] bg-white"
                    placeholder="Add a tag"
                />
                <button type="button" onClick={handleAddTag} className="bg-gray-700 text-[#FFD7DF] px-4 rounded-[10px]">
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
                <span key={tag} className="bg-white px-2 py-1 rounded-full text-sm border-2 border-white hover:border-black">
                    {tag}
                    <button type="button" onClick={() => handleDeleteTag(tag)} className="ml-1 font-bold">X</button>
                </span>
            ))}
            </div>

            {/* Status */}
            <label className="block font-semibold mb-1">Status</label>
            <div className="mb-4">
                <label className="mr-4">
                <input type="radio" value="Ongoing" checked={status === 'Ongoing'} onChange={(e) => setStatus(e.target.value)} className="mr-1" />
                    Ongoing
                </label>
                <label>
                <input type="radio" value="Completed" checked={status === 'Completed'} onChange={(e) => setStatus(e.target.value)} className="mr-1" />
                    Completed
                </label>
            </div>

            {/* Premium Toggle */}
            <label className="block font-semibold mb-1 mt-4">Premium Status</label>
            <div className="mb-4">
                <label className="mr-4">
                    <input 
                        type="radio" 
                        value="free"
                        checked={premiumStatus === 'free'}
                        onChange={(e) => setPremiumStatus(e.target.value)}
                        className="mr-1"
                    />
                    Free
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="premium"
                        checked={premiumStatus === 'premium'}
                        onChange={(e) => setPremiumStatus(e.target.value)}
                        className="mr-1"
                    />
                    Premium
                </label>
            </div>
        
            <button type="submit" className="w-full bg-[#1A5632] text-[#FFD7DF] p-3 rounded-lg font-bold hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300">
                Save
            </button>
        </form>
        </div>
    )
}

export default BookEditForm
