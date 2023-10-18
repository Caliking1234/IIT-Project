"use client"
import React, { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';
import dynamic from "next/dynamic";


function Ask() {

    const DynamicPlot = dynamic(() => import("react-plotly.js"), {
        ssr: false, // Prevents server-side rendering
      });

    const [binaryData, setBinaryData] = useState('');

    const carrierFrequency = 1000;
    const modulationIndex = 1;
    const samplesPerBit = 100;
    const timePeriod = 1 / carrierFrequency;
    const [modulatedSignal, setModulatedSignal] = useState([]);
  
    useEffect(() => {
      generateASKSignal();
    }, [binaryData]);
  
    const generateASKSignal = () => {
      if (!binaryData) {
        setModulatedSignal([]);
        return;
      }
  
      const ASKsignal = [];
      for (let i = 0; i < binaryData.length; i++) {
        const bit = parseInt(binaryData[i]);
        const bitPeriod = timePeriod * samplesPerBit;
        let t = i * bitPeriod;
        for (let j = 0; j < samplesPerBit; j++) {
          const sample =
            modulationIndex * bit * Math.cos(2 * Math.PI * carrierFrequency * t);
            ASKsignal.push(sample);
          t += 1 / carrierFrequency / samplesPerBit;
        }
      }
      setModulatedSignal(ASKsignal);
    };
  
    return (
        <div className='my-12'>
        
      <div className="p-4 mx-auto mb-24">
        <h2 className="text-xl font-semibold mb-4 text-center">ASK Modulation Simulation</h2>
        <div className="mb-4 text-center">
          <label className="mr-2 ">Binary Data:</label>
          <input
            type="text"
            value={binaryData}
            onChange={(e) => setBinaryData(e.target.value)}
            placeholder="Enter binary data (e.g., 010101)"
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col lg:w-[70%] w-[full] mx-auto text-center">
          <DynamicPlot
            data={[
              {
                x: Array.from({ length: modulatedSignal.length }, (_, i) => i),
                y: modulatedSignal,
                type: 'scatter',
              },
            ]}
            layout={{
              title: 'ASK Modulated Signal',
              xaxis: {
                title: 'Sample Number',
              },
              yaxis: {
                title: 'Amplitude',
              },
            }}
          />
        </div>
      </div>

      </div>
    );
  }
  

export default Ask;
