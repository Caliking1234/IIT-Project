"use client";

import React, { useState } from 'react';

const ColoredComponent = () => {
  const [isColored, setIsColored] = useState(false);
  const [isColoreda, setIsColoreda] = useState(false);
  const [isColoredb, setIsColoredb] = useState(false);

  const handleClick = () => {
    setIsColored(!isColored);
  };
  const handleClick2 = () => {
    setIsColoreda(!isColoreda);
  };
  const handleClick3 = () => {
    setIsColoredb(!isColoredb);
  };

  return (
    <>
    
    <div
      className={`w-2 h-20 left-[17vh] absolute top-[93vh] flex items-center justify-center cursor-pointer ${
        isColored ? 'bg-yellow-500 text-white' : 'bg-white'
      }`}
      onClick={handleClick}
    >
      1
    </div>

    <div
      className={`w-2 h-20 left-[42vh] absolute top-[93vh] flex items-center justify-center cursor-pointer ${
        isColoreda ? 'bg-yellow-500 text-white' : 'bg-white'
      }`}
      onClick={handleClick2}
    >
      2
    </div>

    <div
      className={`w-2 h-20 left-[88vh] absolute top-[99vh] flex items-center justify-center cursor-pointer ${
        isColoredb ? 'bg-yellow-500 text-white' : 'bg-white'
      }`}
      onClick={handleClick3}
    >
      3
    </div>

    </>
  );
};

export default ColoredComponent;
