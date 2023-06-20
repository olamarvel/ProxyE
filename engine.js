import { SocksClient } from 'socks'
import { SocksProxyAgent } from 'socks-proxy-agent'
async function connect(options) {
 try {
  const info = await SocksClient.createConnection(options)
  info.socket.write(
   'GET /json HTTP/1.1\nHost: ip-api.com/?fields=status,message,country,isp,mobile,proxy,hosting'
  )
  return new Promise((resolve, reject) => {
   console.log('data')
   info.socket.on('data', data => {
    console.log(data)
    resolve(data.toString())
   })
   info.socket.on('error', err => {
    reject(err)
   })
  })
 } catch (err) {
  console.log(err)
 }
}

async function SocksEngine({ host, port }) {
 try {
  const proxyOptions = `socks5://${host}:${port}`
  // create the socksAgent for axios
  const httpsAgent = new SocksProxyAgent(proxyOptions)
  // the baseUrl for the api you are going to hit
  const baseUrl = 'http://ip-api.com'
  // create a new axios instance
  const client = axios.create({ baseUrl, httpsAgent })
  const result =  await client.get('/?fields=status,message,country,isp,mobile,proxy,hosting')
  console.log(result);
  return result
 } catch (err) {
  console.log(err)
  // Handle errors
 }
}

// async function SocksEngine({ host, port }) {
//  try {
//   const options = {
//    proxy: {
//     host, // ipv4 or ipv6 or hostname
//     port: Number(port),
//     type: 5, // Proxy version (4 or 5)
//    },
//    command: 'connect', // SOCKS command (createConnection factory function only supports the connect command)
//    destination: {
//     host: 'ip-api.com', // host names are supported with SOCKS v4a and SOCKS v5.
//     port: 80,
//    },
//   }
//   const data = await connect(options)
//   return data
//  } catch (err) {
//   console.log(err)
//   // Handle errors
//  }
// }

const fs = require('fs')
const path = require('path')

 class Storage {
  fileName;

  constructor(fileN) {
    this.fileName = fileN;
  }

  get(key) {
    let pth = this.fileName;

    if (fs.existsSync(pth)) {
      let rawdata = fs.readFileSync(pth)

      if (rawdata != '') {
        let data = JSON.parse(rawdata)
        return data[key]
      } else return null
    } else {
      return null
    }
  }

  async set(key, value) {
    let pth = this.fileName;

    let data = {}
    if (fs.existsSync(pth)) {
      let rawdata = fs.readFileSync(pth)
      if (rawdata != '') data = JSON.parse(rawdata)
    }
    data[key] = value

    fs.writeFileSync(pth, JSON.stringify(data))
    return true
  }
}


// export default SocksEngine
module.exports = {Storage}
