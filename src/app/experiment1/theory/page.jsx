import React from "react";
import Textsec1 from "../../../components/Textsec1";
import Textsec2 from "../../../components/Textsec2";
import Textsec3 from "../../../components/Textsec3";
import Textsec4 from "../../../components/Textsec4";
import Textsec5 from "../../../components/Textsec5";
import Subnavbar from '../../../components/Subnavbar'

const links = [
  { label: "Aim", url: "/" },
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
        <Subnavbar links={links} />

      <div className="px-4 lg:px-16">
        <Textsec1 />
        <Textsec2 />
        <Textsec3 />
        <Textsec4 />
        <Textsec5 />
      </div>
    </div>
  );
};

export default page;
