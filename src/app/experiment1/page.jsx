import Subnavbar from '../../components/Subnavbar'
import React from 'react'
import Image from "next/image";

// const links = [
//   { label: "Aim", url: "/experiment1" },
//   { label: "Theory", url: "/experiment1/theory" },
//   { label: "Pretest", url: "/experiment1/pretest" },
//   { label: "Procedure", url: "/experiment1/procedure" },
//   { label: "Simulation", url: "/experiment1/simulation" },
//   { label: "Posttest", url: "/experiment1/posttest" },
//   { label: "References", url: "/experiment1/reference" },
//   { label: "Feedback", url: "/experiment1/feedback" },

// ];

const page = () => {


  return (
    <div>
        {/* <Subnavbar links={links} /> */}

        <div className='px-4 lg:px-16 h-full p-4 lg:p-24  items-center justify-center'>

        <h1 className='text-4xl '>
          AIM : PAM PWM PPM DM PCM
        </h1>
        
        </div>


    </div>
  )
}

export default page