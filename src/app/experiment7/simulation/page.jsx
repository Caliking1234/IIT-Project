<<<<<<< HEAD
import React from 'react'
import Ask from './Ask'
import Psk from './Psk'
import Fsk from './Fsk'
=======
"use client";
import { useRouter } from "next/navigation";
import React from "react";
>>>>>>> e94c3949b1d93b6b67488e525869ad08528878ac

const Sims = [
  {
    name: "ASK",
    link: "/ask",
  },
  {
    name: "FSK",
    link: "/fsk",
  },
  {
    name: "PSK",
    link: "/psk",
  },
];

const Page = () => {
  const navigate = useRouter();
  return (
<<<<<<< HEAD
    <div>
      {/* <Ask/> */}
      {/* <Psk/> */}
      {/* <Fsk/> */}
      <h1>hello</h1>
    </div>
  )
}
=======
    <div className="flex w-full justify-center items-center h-[50vh]">
      <div className="p-10 flex flex-col gap-5 rounded-lg shadow-xl">
        <div className="text-2xl font-semibold">Simulations</div>
        <div className="flex flex-col gap-3">
          {Sims.map((sim, index) => (
            <div
              onClick={() =>
                navigate.push(`/experiment7/simulation/${sim.link}`)
              }
              key={index}
              className="cursor-pointer hover:bg-blue-300 py-2 px-5 rounded text-center border border-blue-500 bg-blue-200"
            >
              {sim.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
>>>>>>> e94c3949b1d93b6b67488e525869ad08528878ac

export default Page;
