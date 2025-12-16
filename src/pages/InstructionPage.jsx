import React from 'react'
import Guide from '../components/instructions/Guide';
import FAQ from '../components/instructions/FAQ';

const InstructionPage = () => {
  return (
    <div className='bg-[#FFFDEE] min-h-full'>
      <Guide />
      <FAQ />
    </div>
  )
}

export default InstructionPage;
