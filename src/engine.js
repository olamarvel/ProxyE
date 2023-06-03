import { ipcRenderer } from 'electron'
let pattern =
 /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})[\s:]+(\d{2,5})\s+(United States|Germany|Canada|Italy|France|United Kingdom)/g

export async function copyToClipboard(text) {
 try {
  //   await navigator.permissions.request({ name: 'clipboard-write' })
  await navigator.clipboard.writeText(text)
  console.log('Text copied to clipboard')
 } catch (err) {
  console.error('Failed to copy text: ', err)
 }
}

export function extract(text) {
 // Define an array letiable to store the extracted proxies
 let proxies = []

 // Use the exec method to find all matches in the text
 let match
 while ((match = pattern.exec(text))) {
  // For each match, push the ip, port and country to the proxies array as an object
  proxies.push(`socks5://${match[1]}:${match[2]}`)
 }
 return proxies
}

export function test(proxys) {
 ipcRenderer.send(
  'message',
  JSON.stringify({
   type: 'proxys',
   proxys: proxys.map(proxy => {
    const sockchange = proxy.split(':')
    const host = sockchange[1].slice(2)
    const port = sockchange[2]
    return { host, port }
   }),
  })
 )
}
