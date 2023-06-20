import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'
import 'babel-polyfill'
import { toast } from 'react-toastify'
import { ipcRenderer } from 'electron'
// import Store from './store'
// import { Provider } from 'react-redux'
// import user from './reducers/user'

// const store = Store({ User: user })

async function asyncTest() {
 let test = await myAsyncfunc()
}

async function myAsyncfunc() {
 return new Promise(resolve => {
  setTimeout(resolve('async/await now runs'), 1000)
 })
}

window.onload = () => {
 ReactDOM.render(
  <React.StrictMode>
   {/* <Provider store={store}> */}
    <App />
   {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('app')
 )

 ipcRenderer.on('updateMessage', (event, result) => toast.info(result))
 asyncTest()
}
