import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { retrive, test } from '../engine'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Saved = ({ result }) => {
 const [savedProxys, setSavedProxys] = useState(null)
 useEffect(() => {
  const collect = async () => {
   const data = await retrive()
   setSavedProxys(data)
  }
  collect()
 }, [retrive])
 return (
  <div className='flex h-full flex-col'>
   <div className='flex w-full items-center justify-between p-4'>
    <Link to='/'>
     <img src='assets/back.svg' alt='goback' className='w-8' />
    </Link>
    <span className='grow py-2 text-center text-2xl'>Saved proxys</span>
   </div>
   <div className='mb-2 w-full grow overflow-y-auto rounded-lg border-b border-Text bg-transparent p-2 text-gray-700/80 shadow-lg outline-none'>
    {savedProxys ? (
     <Categories proxys={savedProxys} />
    ) : (
     // savedProxys.join()a
     <p>loading</p>
    )}
   </div>
  </div>
 )
}

export default Saved

function Categories({ proxys }) {
 const [isOpen, setIsOpen] = useState(false)

 const toggleDropdown = () => {
  setIsOpen(!isOpen)
 }

 const history = useHistory()

 return (
  <div className='mt-2 w-full rounded-md py-2 shadow-lg'>
   <button
    className='w-full rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700'
    onClick={() => {
     history.push('/result')
     test(proxys)
    }}
   >
    Test
   </button>
   {proxys && proxys.map((proxy, i) => <p key={i.toString()}>{proxy}</p>)}
  </div>
 )
}
