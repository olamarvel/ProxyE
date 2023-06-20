// Docs {@link https://tailwindcss.com/docs/text-color}
import React, { useEffect, useState } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from './windows/Home'
import ViewProxys from './windows/ViewProxys'
import { extract } from './engine'
import { ipcRenderer } from 'electron'
import Result from './windows/Result'
import { ToastContainer, toast } from 'react-toastify'
import Saved from './windows/Saved'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import About from './windows/about'

function App() {
 const [text, setText] = useState('paste proxys here.....')
 const [proxys, setProxys] = useState(null)
 const [result, setResult] = useState(null || [])
 const setProxyText = event => {
  const value = event.target.value
  const proxys = extract(value)
  setProxys(() => (!!proxys.length ? proxys : null))
  setText(value)
 }
 useEffect(() => {
  ipcRenderer.on('result', (event, result) =>
   typeof result !== 'boolean'
    ? setResult(previous => previous.concat(result))
    : toast.success('done testing all ips')
  )
  ipcRenderer.on('error', (event, reason) => toast.error(reason))
  return () => {}
 }, [ipcRenderer])
 return (
  <HashRouter>
   <div className='App flex  h-full flex-col  items-center justify-center bg-white px-6 py-6 text-lg text-Text'>
    <ToastContainer
     position='top-right'
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme='light'
    />
    <div className=' relative flex h-full w-full flex-col items-center gap-2 rounded-lg bg-l-blue py-2 text-dark shadow shadow-gray-500'>
     <Route
      exact
      path='/'
      component={() => <Home text={text} setProxyText={setProxyText} />}
     />
     <Route path='/view' component={() => <ViewProxys proxys={proxys} />} />
     <Route path='/result' component={() => <Result result={result} setResult={setResult} />} />
     <Route path='/saved' component={() => <Saved />} />
     <Route path='/about' component={() => <About />} />
    </div>
     <Link to='/about' className='absolute bottom-5 right-7 text-dark'>
      About App
     </Link>
   </div>
  </HashRouter>
 )
}

export default App
