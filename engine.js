import { SocksClient } from 'socks'

export async function SocksEngine({ host, port }) {
 try {
  const options = {
   proxy: {
    host, // ipv4 or ipv6 or hostname
    port: Number(port),
    type: 5, // Proxy version (4 or 5)
   },
   command: 'connect', // SOCKS command (createConnection factory function only supports the connect command)
   destination: {
    host: 'http://ip-api.com/json?fields=status,message,mobile,proxy,hosting,query', // host names are supported with SOCKS v4a and SOCKS v5.
    port: 80,
   },
  }
  const data = await connect(options)
  return data
 } catch (err) {
  console.log(err)
  // Handle errors
 }
}

async function connect(options) {
 try {
  const info = await SocksClient.createConnection(options)
  //   info.socket.write(
  //    'GET /json HTTP/1.1\nHost: ip-api.com/?fields=status,message,country,isp,mobile,proxy,hosting'
  //   )
  return new Promise((resolve, reject) => {
   info.socket.on('data', data => {
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
