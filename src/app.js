// Docs {@link https://tailwindcss.com/docs/text-color}
import React, { useState } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from './windows/Home'
import ViewProxys from './windows/ViewProxys'
import { extract } from './engine'
import { ipcRenderer } from 'electron'
import Result from './windows/Result'

function App() {
 const [text, setText] = useState('paste proxys here.....')
 const [proxys, setProxys] = useState(null)
 const [result, setResult] = useState(null);
 const setProxyText = event => {
  const value = event.target.value
  const proxys = extract(value)
  setProxys(() => !!proxys.length ?proxys:null)
//   console.log(proxys);
  setText(value)
 }
 ipcRenderer.on('result',(event,result) => setResult(result))
 return (
  <div className='App flex  h-full flex-col  items-center justify-center bg-white px-6 py-6 text-lg text-Text'>
   <div className=' flex h-full w-full flex-col items-center gap-2 rounded-lg bg-l-blue py-2 text-dark shadow shadow-gray-500'>
    <HashRouter>
     <Route
      exact
      path='/'

      component={() => <Home text={text} setProxyText={setProxyText} />}
     />
     <Route path='/view' component={()=><ViewProxys proxys={proxys}/>} />
     <Route path='/result' component={()=><Result result={result}/>} />
    </HashRouter>
   </div>
  </div>
 )
}

export default App
