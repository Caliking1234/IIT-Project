"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import open from "../../public/Image/open.jpg";
import close from "../../public/Image/close.jpg";

  const Subnavbar = ({ links }) => {
    const [navbar, setNavbar] = useState(false);
  
    const handleNavbarToggle = () => {
      setNavbar(!navbar);
    };
  
    const handleLinkClick = () => {
      setNavbar(false);
    };

  return (

    <div className="bg-green-400 py-2 z-10 ">
      <div className="sticky ">
        <div className=" ">
          <div className=" justify-between px-4 mx-auto lg:max-w-7xl  md:items-center md:flex md:px-8 ">
            <div>
              <div className="flex items-center justify-between py-0 md:py-0 md:block">
                <div className="md:hidden ">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={handleNavbarToggle}
                  >
                    {navbar ? (
                      <Image
                        src={close}
                        width={30}
                        height={30}
                        alt="logo"
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
                  {links.map((link, index) => (
                    <li
                    // key={item.id}
                      key={index}
                      className={`pb-6 text-xl hover:underline text-gray-600 py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-green-300 border-white-900 md:hover:text-white md:hover:bg-transparent`}
                    >
                      <Link href={link.url} onClick={handleLinkClick}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
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
