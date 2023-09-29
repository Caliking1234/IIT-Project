import React from 'react'
import Subnavbar from "../../../components/Subnavbar";


const links = [
  { label: "Aim", url: "/experiment2" },
  { label: "Theory", url: "/experiment2/theory" },
  { label: "Pretest", url: "/experiment2/pretest" },
  { label: "Procedure", url: "/experiment2/procedure" },
  { label: "Simulation", url: "/experiment2/simulation" },
  { label: "Posttest", url: "/experiment2/posttest" },
  { label: "References", url: "/experiment2/reference" },
  { label: "Feedback", url: "/experiment2/feedback" },

];
const page = () => {

  return (
    <div>
     <Subnavbar links={links} />

      <div className='h-full p-4 lg:p-24  items-center justify-center'>
        <h1>To simulate Pulse Amplitude Modulation (PAM) in a simple way</h1>

        <p className=''></p>
      </div>
        

    </div>
  )
}

export default page