"use client";
import { useRouter } from "next/navigation";
import React from "react";

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

export default Page;
