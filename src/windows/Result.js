import React from 'react'
import { Link } from 'react-router-dom'
import { copyToClipboard, test } from '../engine'

const Result = ({ proxys:proxy = []}) => {
//  const proxy = [
//   'socks5://45.132.75.19:30414',
//   'socks5://162.19.7.56:27880',
//   'socks5://66.29.128.245:41769',
//   'socks5://66.29.129.52:27886',
//   'socks5://37.221.193.221:12704',
//   'socks5://174.138.176.75:41461',
//   'socks5://38.91.107.220:23543',
//   'socks5://209.159.153.19:33932',
//  ]

//  const copyToClipboard = () => {
//   navigator.clipboard.writeText(proxy.join())
//  }


 return (
  // <div className='App h-full  flex flex-col  items-center justify-center py-6 px-6 bg-white text-Text text-lg'>
  //   <div
  //     className=" flex flex-col items-center gap-2 py-2 bg-l-blue text-dark w-full h-full rounded-lg shadow shadow-gray-500">
  <>
   <span className='py-2 text-2xl'>Etracted Proxy</span>
   <Link to='/'>X</Link>
   <div className='grow overflow-y-auto'>
    {proxy && proxy.map((sock, i) => (
     <Socks sock={sock} key={i} />
    ))}
   </div>
   <div className='flex gap-4'>
    <button
     className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
     onClick={()=>copyToClipboard(proxy.join())}
    >
     Copy
    </button>
    <button className='rounded bg-white px-4 py-2 font-bold text-blue-500 opacity-50 shadow-lg' onClick={()=>test(proxy)}>
     Test
    </button>
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

export default Result
