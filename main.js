import electron, { ipcMain, session } from 'electron'
import path from 'path'
import url from 'url'
import 'babel-polyfill'
import { SocksEngine } from './engine'

console.log('hello')
ipcMain.on('message', (event, arg) => {
 console.log(arg) // prints "Hello from renderer process!"
 const message = JSON.parse(arg)
 switch (message.type) {
  case 'proxys':
   Promise.all(message.proxys.map(value => SocksEngine(value))).then(result => {
    event.reply('result', result)
   })
   break
  default:
   break
 }
})

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

const createWindow = () => {
 mainWindow = new BrowserWindow({
  width: 414,
  height: 736,
  webPreferences: {
   nodeIntegration: true,
  },
 })
 session.defaultSession
  .loadExtension(
   "C:\\Users\\owner\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.27.8_0"
  )
  .then(name => {
   console.log(`Added extension: ${name}`)
  })

 mainWindow.loadURL(
  url.format({
   pathname: path.join(__dirname, 'index.html'),
   protocol: 'file:',
   slashes: true,
  })
 )

 mainWindow.on('closed', () => {
  mainWindow = null
 })
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
