import Subnavbar from '@/components/Subnavbar'
import React from 'react'
import Image from "next/image";


const page = () => {
  return (
    <div>
        <Subnavbar/>

        <div className='px-4 lg:px-16 h-full p-4 lg:p-24  items-center justify-center'>

        <h1 className='text-4xl '>
          AIM : PAM PWM PPM DM PCM
        </h1>
        
        </div>


    </div>
  )
}

export default page