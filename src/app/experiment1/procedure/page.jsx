import React from 'react'
import Subnavbar from "../../../components/Subnavbar";

const links = [
  { label: "Aim", url: "/experiment1" },
  { label: "Theory", url: "/experiment1/theory" },
  { label: "Pretest", url: "/experiment1/pretest" },
  { label: "Procedure", url: "/experiment1/procedure" },
  { label: "Simulation", url: "/experiment1/simulation" },
  { label: "Posttest", url: "/experiment1/posttest" },
  { label: "References", url: "/experiment1/reference" },
  { label: "Feedback", url: "/experiment1/feedback" },

];

const page = () => {

  return (
    <div>
{/* <Subnavbar links={links} /> */}

      <div className='h-full p-4 lg:p-24  items-center justify-center'>
        <h1>To simulate Pulse Amplitude Modulation (PAM) in a simple way</h1>

        <p className=''></p>
      </div>
        

    </div>
  )
}

export default page