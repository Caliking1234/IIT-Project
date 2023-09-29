import React from "react";

const page = () => {
  return (
    <div>
      <div className="lg:p-24 px-6">
        <p className="text-xl lg:text-4xl my-6 py-2 border-b-4">THEORY FOR :</p>

        <h1 className="text-2xl lg:text-3xl pb-4 font-bold underline underline-offset-4">
          Introduction
        </h1>

        <div className="text-sm lg:text-2xl pb-8">
          <p>
            <a href="/experiment5/theory/dsb" className=" hover:text-green-400">
              Click here for DSB-SC Modulation theory
            </a>
          </p>
          <p>
            <a href="/experiment5/theory/ssb" className=" hover:text-green-400">
              Click here for SSB-SC Modulation theory
            </a>
          </p>
          <p>
            <a
              href="/experiment5/theory/other"
              className=" hover:text-green-400"
            >
              Click here for Other theory
            </a>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default page;
