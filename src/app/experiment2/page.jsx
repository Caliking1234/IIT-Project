import React from "react";
import Subnavbar from '../../components/Subnavbar'

const links = [
  { label: "Aim", url: "/" },
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
      <div className="px-4 lg:px-16 h-full p-4 lg:p-24  items-center justify-center">
        <h1 className="text-4xl ">AIM : experiment 2</h1>
      </div>
    </div>
  );
};

export default page;
