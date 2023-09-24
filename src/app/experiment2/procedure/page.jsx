import React from 'react'
import Subnavbar from "../../../components/Subnavbar";

const page = () => {
  const links = [
    { label: 'Aim', url: '/experiment1' },
    { label: 'Theory', url: '/experiment1/theory' },
    // Add more links as needed
  ];
  return (
    <div>
     {/* <Subnavbar /> */}

      <div className='h-full p-4 lg:p-24  items-center justify-center'>
        <h1>To simulate Pulse Amplitude Modulation (PAM) in a simple way</h1>

        <p className=''></p>
      </div>
        

    </div>
  )
}

export default page