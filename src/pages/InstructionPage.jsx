import React from 'react'
import Guide from '../components/instructions/Guide';
import FAQ from '../components/instructions/FAQ';

const InstructionPage = () => {
  return (
    <div className='bg-gradient-to-b from-[#C0FFB3] from-10% via-white via-20% to-[#FFFDEE] to-90%'>
      <Guide /> 
      <FAQ />

    </div>
  )
}

export default InstructionPage;
