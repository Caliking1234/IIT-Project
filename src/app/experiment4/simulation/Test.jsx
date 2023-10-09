"use client";
import React, { useState } from "react";
import Image from "next/image";

import Img3 from "../../../../public/Image/pamimg.png";

const Test = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBox, setShowBox] = useState(true);

  const buttonClass = isClicked ? "bg-green-500" : "bg-red-500";

  const toggleBox = () => {
    setShowBox(!showBox);
  };
  const handleButtonClick = () => {
    setIsClicked(!isClicked);
    if (!showModal) {
      setShowModal(false);
    }
  };
  const handleButtonClick1 = () => {
      setIsClicked(!isClicked);
    
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
          // onClick={handleButtonClick}
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


      <div className="space-y-4 text-center">
        <button
          className="bg-blue-500 absolute left-[15vh] top-[116vh] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            toggleBox() ; handleButtonClick1();}}
          // onClick={handleButtonClick1}
        >
           {isClicked ? "Break connections" : "Make connections"}
        </button>
        {showBox && (
          <div>
            <div className="absolute left-[15vh] top-[96vh] w-12 h-32 z-20 bg-white order border-gray-300 "></div>

            <div className="absolute left-[85vh] top-[101vh] w-12 h-32 z-20 bg-white order border-gray-300 "></div>
          </div>
        )}
      </div>


    </div>
  );
};

export default Test;
