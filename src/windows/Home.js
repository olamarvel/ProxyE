import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = ({text,setProxyText}) => {
 return (
  <>
   <span className='py-2 text-2xl'>Proxy Etractor</span>
   <textarea
    className=' mb-2 w-3/4 grow rounded-lg border-b border-Text bg-transparent p-2 text-gray-700/80 shadow-lg outline-none '
    value={text}
    onChange={setProxyText}
   />
   <div className='flex gap-4'>
    <Link
     to='/view'
     className='rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700'
    >
     extract
    </Link>
    {/* <button
     className='cursor-not-allowed rounded bg-blue-500 px-4 py-2 font-bold text-white opacity-50'
     disabled
    >
     Test
    </button> */}
   </div>
  </>
 )
}

export default Home
