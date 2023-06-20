import { SocksClient } from 'socks'
import electron, { ipcMain, session } from 'electron'
import path from 'path'
import url from 'url'
import 'babel-polyfill'
import fs from 'fs'
// const axios = require('axios');
const { autoUpdater, AppUpdater } = require('electron-updater')
// const { Storage } = require('./engine.js')
// //Basic flags
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

const app = electron.app
const BrowserWindow = electron.BrowserWindow
// require('update-electron-app')()

let mainWindow
class Storage {
 fileName

 constructor(fileN) {
  this.fileName = fileN
  if (!fs.existsSync(fileN)) {
   fs.writeFileSync(fileN, '')
  }
 }

 async get() {
  let pth = this.fileName

  if (fs.existsSync(pth)) {
   let rawdata = fs.readFileSync(pth)

   if (rawdata != '') {
    let data = JSON.parse(rawdata)
    return data
   } else return null
  } else {
   return null
  }
 }

 //  async getA() {
 //   let pth = this.fileName
 //   if (fs.existsSync(pth)) {
 //    let rawdata = fs.readFileSync(pth)
 //    if (rawdata != '') {
 //     let data = Object.entries(JSON.parse(rawdata))
 //     return data
 //    } else return null
 //   } else {
 //    return null
 //   }
 //  }

 async set(value) {
  let pth = this.fileName

  let data = []
  if (fs.existsSync(pth)) {
   let rawdata = fs.readFileSync(pth)
   if (rawdata != '') data = JSON.parse(rawdata)
  }

  if (data.length >= 200) {
   data.splice(0, value.length)
  }
  data = data.concat(value)
  fs.writeFileSync(pth, JSON.stringify(data))
  return true
 }
}
const storage = new Storage('proxy.json')
const createWindow = () => {
 mainWindow = new BrowserWindow({
  icon: path.join(__dirname, 'icons/icon.ico'),
  width: 414,
  height: 736,
  webPreferences: {
   nodeIntegration: true,
   preload: path.join(__dirname, 'preload.js'),
  },
 })
//  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//   details.requestHeaders['User-Agent'] =
//    '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1788.0'
//   callback({ cancel: false, requestHeaders: details.requestHeaders })
//  })
  autoUpdater.checkForUpdates()

 mainWindow.setHasShadow(true)
 //  mainWindow.setAlwaysOnTop(true)
 mainWindow.setMenuBarVisibility(false)
//  mainWindow.webContents.openDevTools()

 mainWindow.loadURL(
  url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol: 'file:',
   slashes: true, 
  })
 )

 // mainWindow.loadURL('http://localhost:3000')

 mainWindow.on('closed', () => {
  mainWindow = null
 })

  /*New Update Available*/
  autoUpdater.on('update-available', async (info) => {
   showMessage(`Update available. Current version ${app.getVersion()}`)
   let pth = await autoUpdater.downloadUpdate()
   showMessage(pth)
  })

  autoUpdater.on('update-not-available', info => {
   showMessage(`No update available. Current version ${app.getVersion()}`)
  })

  /*Download Completion Message*/
  autoUpdater.on('update-downloaded', info => {
   showMessage(`Update downloaded. Current version ${app.getVersion()}`)
  })

  function showMessage(message) {
   mainWindow.webContents.send('updateMessage', message)
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
 if (process.platform !== 'darwin') {
  app.quit()
 }
})

app.on('activate', () => {
 if (mainWindow === null) {
  createWindow()
 }
})

async function connect(options) {
 const { proxy } = options
 try {
  const info = await SocksClient.createConnection(options)
  console.log('did connect')
  return { sucess: true, proxy }
  // TODO://
  // info.socket.write(
  //  'GET /json HTTP/1.1\nHost: ip-api.com/?fields=status,message,country,isp,mobile,proxy,hosting'
  // )
  // return new Promise((resolve, reject) => {
  //  info.socket.on('data', data => {
  //   resolve(data.toString())
  //  })
  //  info.socket.on('error', err => {
  //   reject(err)
  //  })
  // })
 } catch (err) {
  console.log('did not connect')
  return { sucess: false, proxy }
 }
}

async function SocksEngine({ host, port }) {
 const options = {
  proxy: {
   host, // ipv4 or ipv6 or hostname
   port: Number(port),
   type: 5, // Proxy version (4 or 5)
  },
  command: 'connect', // SOCKS command (createConnection factory function only supports the connect command)
  destination: {
   host: 'ip-api.com', // host names are supported with SOCKS v4a and SOCKS v5.
   port: 80,
  },
  // Optional fields
  timeout: 30000,
 }
 try {
  const data = await connect(options)
  return data
 } catch (err) {
  console.log('did not connect')
  return { sucess: false, proxy: options.proxy }
  // Handle errors
 }
}

// ipcMain.on('proxys', async (event, arg) => {
//  try {
//   const proxys = JSON.parse(arg)
//   const result = await Promise.(
//    proxys.map(value => SocksEngine(value))
//   )

//   event.reply('result', result)
//   return true
//  } catch (error) {
//   console.log(error)
//   event.reply('error', 'server error, Testing operation not completed')
//  }
// })

ipcMain.on('proxys', async (event, arg) => {
 try {
  const proxys = JSON.parse(arg)
  const promises = proxys.map(value => SocksEngine(value))
  const batchNumber = 5
  for (let i = 0; i < promises.length; i += batchNumber) {
   const batch = promises.slice(i, i + batchNumber)
   Promise.allSettled(batch).then(value => {
    event.reply('result', value)
   })
  }
  await Promise.allSettled(promises)
  event.reply('result', true)
  return true
 } catch (error) {
  console.log(error)
  event.reply('error', 'server error, Testing operation not completed')
 }
})

ipcMain.handle('save', async (event, arg) => {
 try {
  const proxys = JSON.parse(arg)
  // const now = new Date()

  // // // Format the date as YYYY-MM-DD
  // // const year = now.getFullYear()
  // // const month = String(now.getMonth() + 1).padStart(2, '0')
  // // const day = String(now.getDate()).padStart(2, '0')
  // // const seconds = String(now.getSeconds()).padStart(2, 0)
  // const formattedDate = now.toISOString() //`${year}-${month}-${day}-${seconds}`
  // log(formattedDate)
  await storage.set(proxys)
  return true
 } catch (error) {
  console.log(error)
  // event.reply('error', 'server error, Saving operation not completed')
  return false
 }
})
ipcMain.handle('retrive', async event => {
 try {
  const result = await storage.get()
  return result
 } catch (error) {
  console.log(error)
  // event.reply('error', 'server error, Saving operation not completed')
  return false
 }
})
