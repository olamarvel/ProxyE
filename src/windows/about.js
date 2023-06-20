import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const About = ({ text, setProxyText }) => {
 return (
  <>
   <div className='h-full w-full overflow-auto p-4'>
    <div className='flex w-full items-center justify-between p-4'>
     <Link to='/'>
      <img src='assets/back.svg' alt='goback' className='w-8' />
     </Link>

     <span className='grow py-2 text-center text-2xl'>About App</span>
    </div>
    <p>
     Do you need a fast and easy way to extract proxies from any text? Do you
     want to test the proxies and see if they work? Then you need Proxy
     Extractor, the app that does it all for you!
    </p>

    <p>
     Proxy Extractor is a powerful app that lets you scan any text and find all
     the proxies in it. You can also test the proxies and see their speed,
     location, anonymity, and status. Whether you need proxies for web scraping,
     SEO, or security, Proxy Extractor will help you find the best ones for your
     needs.
    </p>

    <p>With Proxy Extractor, you can:</p>

    <ul>
     <li>
      Extract proxies from any text, such as web pages, documents, emails, etc.
     </li>
     <li>
      Test the proxies and see their speed, location, anonymity, and status
     </li>
     <li>Save the proxies to a file or copy them to the clipboard</li>
     <li>Filter the proxies by type, country, port, etc.</li>
     <li>
      Customize the extraction and testing settings according to your
      preferences
     </li>
    </ul>

    <p>
     Proxy Extractor is the ultimate app for proxy lovers. Download it now and
     enjoy the benefits of having unlimited proxies at your fingertips!
    </p>

    <p>
     This app was created by Olatunde Marvelous Anthony, a professional app and
     website developer. If you need any custom app or website development
     services, feel free to contact me at 090--------- for WhatsApp or
     olatundemarvelousanthony@gmail.com.
    </p>
   </div>
  </>
 )
}

export default About
