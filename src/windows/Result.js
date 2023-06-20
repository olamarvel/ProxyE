import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { copyToClipboard, test } from '../engine'
import { toast } from 'react-toastify'

const Result = ({ result ,setResult}) => {
//  console.log(result);
const [reseted, setReset] = useState(false)
const reset =async () => {
  setResult([])
  setReset(true)
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

    <span className='grow py-2 text-center text-2xl'>Result</span>
    {!reseted && (
     <button
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      onClick={reset}
     >
      Reset
     </button>
    )}
   </div>
   <div className='grow overflow-y-auto'>
    {result ? (
     result
      // .filter(({ value: sock }) => sock.sucess)
      .map(({ value: sock }, i) => <Socks sock={sock} key={i} />)
    ) : (
     <p>loading</p>
    )}
   </div>
   <div className='flex gap-4'>
    <button
     className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
     onClick={() =>
      copyToClipboard(
       result
        .filter(({ value: sock }) => sock.sucess)
        .map(
         ({ value: sock }) => `socks5://${sock.proxy.host}:${sock.proxy.port}`
        )
        .join()
      )
     }
    >
     Copy
    </button>
   </div>
  </>
 )
}

function Socks({
 sock: {
  sucess,
  proxy: {
   host, // ipv4 or ipv6 or hostname
   port,
  },
 },
}) {
 return (
  <div className='flex items-center gap-2 '>
   <span>{host}</span>
   <span> : {port}</span>
   <span
    className={`h-2 w-2 rounded-full ${sucess ? 'bg-green-300' : 'bg-red-500'}`}
   ></span>
   <div className={'h-2 w-6 rounded bg-blue-300'}>
    <span className='h-full w-4 bg-blue-300'></span>
   </div>
  </div>
 )
}

export default Result
