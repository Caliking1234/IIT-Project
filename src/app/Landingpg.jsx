"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Landingpg = () => {
  return (
    <div className="h-full p-4 lg:p-24  items-center justify-center ">
      <div className="items-center justify-center">

      <h1 className="">Signals And Systems</h1>
      </div>
      <h1 className="text-[20px] lg:text-[40px] py-6 font-bold">
        List Of Experiments
      </h1>
      <div className="flex-col grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  content-stretch gap-4">
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/experiment1"
        >
          {" "}
          Experiment 1
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/experiment2"
        >
          {" "}
          Experiment 2
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/experiment3"
        >
          {" "}
          Experiment 3
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/experiment4"
        >
          {" "}
          Experiment 4
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/experiment5"
        >
          {" "}
          Experiment 5
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/"
        >
          {" "}
          Experiment 6
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/experiment7"
        >
          {" "}
          Experiment 7
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/"
        >
          {" "}
          Experiment 8
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/"
        >
          {" "}
          Experiment 9
        </Link>
        <Link
          className="bg-red-200 p-4 lg:p-8 text-[30px] font-bold rounded-md hover:text-red-700"
          href="/"
        >
          {" "}
          Experiment 10
        </Link>
      </div>
    </div>
  );
};

export default Landingpg;
