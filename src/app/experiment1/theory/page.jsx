import React from "react";
import Textsec1 from "../../../components/Textsec1";
import Textsec2 from "../../../components/Textsec2";
import Textsec3 from "../../../components/Textsec3";
import Textsec4 from "../../../components/Textsec4";
import Textsec5 from "../../../components/Textsec5";
import Subnavbar from '../../../components/Subnavbar'


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

      <div className="lg:p-24 px-6">
        <p className="text-xl lg:text-4xl my-6 py-2 border-b-4">THEORY FOR :</p>

        <h1 className="text-2xl lg:text-3xl pb-4 font-bold underline underline-offset-4">
          Introduction
        </h1>

        <p className="pt-4 pb-12 lg:w-[70%]">
          Many Signals in Modern Communication Systems are digital. Also, analog
          signals are transmitted digitally. Data transmission, digital
          transmission, or digital communications is the physical transfer of
          data (a digital bit stream or a digitized analogue signal) over a
          point-to-point or point-to-multipoint communication channel. Reduced
          distortion and improvement in signal to noise ratios is the great
          advantages of digital transmission over analog transmission. PAM, PWM
          , PPM , DM and PCM etc., are used to transmit a signal digitally. For
          example, these pulse modulation techniques are used in optical fibers,
          wireless channels, computer buses, etc.
        </p>
<div className="text-sm lg:text-2xl pb-8">

        <p><a href="/experiment1/theory/pam" className=" hover:text-green-400" >Click here for PAM theory</a></p>
        <p><a href="/experiment1/theory/pwm" className=" hover:text-green-400" >Click here for PWM theory</a></p>
        <p><a href="/experiment1/theory/ppm" className=" hover:text-green-400" >Click here for PPM theory</a></p>
        <p><a href="/experiment1/theory/dm" className=" hover:text-green-400" >Click here for DM theory</a></p>
        <p><a href="/experiment1/theory/pcm" className=" hover:text-green-400" >Click here for PCM theory</a></p>

</div>

        
      </div>
    </div>
  );
};

export default page;
