import React from 'react'

const Topbar = ({name}) => {
  return (
    <div className='py-4 px-6 border-b-2 border-black/25 w-full h-20 sticky top-0 z-50 bg-white'>
        <h1 className='text-4xl font-semibold text-black/80'>{name}</h1>
    </div>
  )
}

export default Topbar