import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { copyToClipboard, save, test } from '../engine'
import { ToastContainer, toast } from 'react-toastify'
// import back from './../assets/back.svg'

const ViewProxys = ({ proxys: proxy }) => {
 const history = useHistory()
 const [Saved, setSaved] = useState(false)

 useEffect(() => {
  if (!proxy || !proxy.length) history.push('/')
 }, [history, proxy])
 const saveP =async () => {
  if (proxy && proxy.length) await save(proxy)
  setSaved(true)
 }
 return (
  // <div className='App h-full  flex flex-col  items-center justify-center py-6 px-6 bg-white text-Text text-lg'>
  //   <div
  //     className=" flex flex-col items-center gap-2 py-2 bg-l-blue text-dark w-full h-full rounded-lg shadow shadow-gray-500">
  <>
   <div className='flex w-full items-center justify-between p-4'>
    <Link to='/'>
     <img src='assets/back.svg' alt='goback' className='w-8' />
    </Link>

    <span className='grow py-2 text-center text-2xl'>Etracted Proxy</span>
    {!Saved && (
     <button
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      onClick={saveP}
     >
      Save
     </button>
    )}
   </div>
   <div className='grow overflow-y-auto'>
    {proxy && proxy.map((sock, i) => <Socks sock={sock} key={i} />)}
   </div>
   <div className='flex gap-4'>
    <button
     className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
     onClick={() => copyToClipboard(proxy.join())}
    >
     Copy
    </button>
    <Link
     to='/result'
     className='rounded bg-white px-4 py-2 font-bold text-blue-500 opacity-50 shadow-lg'
     onClick={() => test(proxy)}
    >
     Test
    </Link>
    {/* <button
     className='rounded bg-white px-4 py-2 font-bold text-blue-500 opacity-50 shadow-lg'
     
    >
     Test
    </button> */}
   </div>
  </>
  //   </div>
  // </div>
 )
}

function Socks({ sock = '' }) {
 const sockchange = sock.split(':')
 const host = sockchange[1].slice(2)
 const port = sockchange[2]
 return (
  <div className='flex items-center gap-2 '>
   <span>{host}</span>
   <span> : {port}</span>
   <span className='h-2 w-2 rounded-full bg-green-300'></span>
   <div className='h-2 w-6 rounded bg-red-200'>
    <span className='h-full w-4 bg-blue-300'></span>
   </div>
  </div>
 )
}

export default ViewProxys
