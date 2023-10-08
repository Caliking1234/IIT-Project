"use client";
import React, { useState } from "react";
import Image from "next/image";

import Img3 from "../../../../public/Image/pamimg.png";

const Test = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const buttonClass = isClicked ? "bg-green-500" : "bg-red-500";
  
    const handleButtonClick = () => {
      setIsClicked(!isClicked);
      if (!showModal) {
        setShowModal(false);
      }
    };
    const handleButtonClick2 = () => {
    //   setIsClicked(!isClicked);
      if (!showModal) {
        setShowModal(true);
      }
    };
  
    const closeModal = () => {
      setShowModal(false);
    };

  return (
    <div>

<Image className="py-8" src={Img3} />

<div className="text-center mt-10">
      <button
       className={`px-4 py-2 ${buttonClass} absolute left-[0vh] top-[88vh] text-black rounded-md mx-8`}
        onClick={handleButtonClick}
      >
       {isClicked ? "ON" : "OFF"}
      </button>
      {isClicked && (
        <button
        className={`mt-4 px-4 py-2 absolute  left-[40vh] top-[72vh] bg-yellow-500 text-white rounded-md`}
        onClick={handleButtonClick2}
      >
         Add input
      </button>
      )}
      

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-blue-100 w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Modal Content</h2>
            <p>This is the content of the modal.</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>

    </div>

  );
};

export default Test;
