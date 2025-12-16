import React from 'react'
import { useNavigate } from 'react-router-dom'

const Genres = () => {
    const genresList = [
        {id:0, name:"Fantasy"},
        {id:1, name:"Romance"},
        {id:2, name:"Mystery"},
        {id:3, name:"Horror"},
        {id:4, name:"Thriller"},
        {id:5, name:"Sci-Fi"},
        {id:6, name:"Adventure"},
        {id:7, name:"Drama"}
    ]
    const navigate = useNavigate();

    const handleGenreClick = (genreName) => {
        // Navigate to browse page with genre in state
        navigate('/browse', { state: { filterGenre: genreName } });
    };

  return (
    <div className='min-h-[400px] py-12 bg-gradient-to-b from-[#C0FFB3] to-[#FFFDEE] flex flex-col items-center justify-center gap-8 px-4'>
        {/* text */}
        <h1 className='geist text-3xl sm:text-4xl text-center font-bold'>
          Explore different genres
        </h1>

        {/* genres */}
        <div className='flex flex-wrap justify-center gap-4 sm:gap-6 max-w-7xl'>
            {genresList.map((genre) => (
                <button
                  key={genre.id}
                  className='w-[140px] sm:w-[200px] md:w-[260px] h-[50px] sm:h-[60px] rounded-[10px] bg-[#1A5632] flex items-center justify-center hover:scale-110 transition-all duration-300'
                  onClick={() => handleGenreClick(genre.name)}
                >
                    <p className='geist text-lg sm:text-xl font-semibold text-[#FFD7DF] text-center'>
                        {genre.name}
                    </p>
                </button>
            ))}
        </div>
    </div>
  )
}

export default Genres

