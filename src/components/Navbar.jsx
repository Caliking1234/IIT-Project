"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Image/logo.jpg";
import open from "../../public/Image/open.jpg";
import close from "../../public/Image/close.jpg";

import { useState } from "react";

const Nav = () => {
    const [navbar, setNavbar] = useState(false);

  return (
    <div className='sticky top-0 z-50'>
        <div className=" bg-white border-b-8 border-orange-600 "> 

        
        <div className=" justify-between px-4 mx-auto lg:max-w-7xl  md:items-center md:flex md:px-8 ">
          <div>
            <div className="flex items-center justify-between py-0 md:py-0 md:block">
              
              <Link href="/">
                {/* <h2 className="text-2xl text-cyan-900 font-bold ">LOGO</h2> */}
                <Image src={logo}
                className='w-[70px] lg:w-[120px]'
                />
              </Link>
              
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
                <li className="pb-6 text-xl text-gray-600 py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-green-500  border-purple-900  md:hover:text-green-500 md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Home
                  </Link>
                </li>
                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-green-500 md:hover:bg-transparent">
                  <Link href="/Aboutus" onClick={() => setNavbar(!navbar)}>
                    Partners
                  </Link>
                </li>
                <li className="pb-6 text-xl text-gray-600 py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-green-500 md:hover:bg-transparent">
                  <Link href="/ContactUs" onClick={() => setNavbar(!navbar)}>
                    Contact
                  </Link>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Nav