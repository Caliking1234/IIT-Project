"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import open from "../../public/Image/open.jpg";
import close from "../../public/Image/close.jpg";

const Subnavbar = () => {

    const [navbar, setNavbar] = useState(false);

  return (
    <div className="bg-green-400 py-4">
      <div className='sticky top-0'>
        <div className="  "> 

        
        <div className=" justify-between px-4 mx-auto lg:max-w-7xl  md:items-center md:flex md:px-8 ">
          <div>
            <div className="flex items-center justify-between py-0 md:py-0 md:block">
              
              
              
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image 
                    src={close} 
                    width={30} height={30} alt="logo" 
                    className="focus:border-none rounded-md active:border-none"
                    />
                  ) : (
                    <Image
                      src={open}
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none rounded-md active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen py-4 md:h-auto items-center justify-center md:flex ">
                <li className="pb-6 text-xl text-gray-600 py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-green-300  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Aim
                  </Link>
                </li>
                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-300  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Theory
                  </Link>
                </li>
                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-500  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Pretest
                  </Link>
                </li>

                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-500  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Procedure
                  </Link>
                </li>
                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-500  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Simulation
                  </Link>
                </li>
                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-600  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Posttest
                  </Link>
                </li>

                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-600  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    References
                  </Link>
                </li>

                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-green-600  border-white-900  md:hover:text-white md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Feedback
                  </Link>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Subnavbar;
