"use client"
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Fsk() {
  const [binaryData, setBinaryData] = useState('');
  const carrierFrequency1 = 1000;
  const carrierFrequency2 = 2000;
  const samplesPerBit = 100;
  const timePeriod1 = 1 / carrierFrequency1;
  const timePeriod2 = 1 / carrierFrequency2;
  const [modulatedSignal, setModulatedSignal] = useState([]);
  
    useEffect(() => {
      generateFSKSignal();
    }, [binaryData]);
  
    const generateFSKSignal = () => {
      if (!binaryData) {
        setModulatedSignal([]);
        return;
      }

    const signal = [];
    for (let i = 0; i < binaryData.length; i++) {
      const bit = parseInt(binaryData[i]);
      const bitPeriod = bit === 0 ? timePeriod1 : timePeriod2;
      let t = i * bitPeriod;
      for (let j = 0; j < samplesPerBit; j++) {
        const sample = bit === 0 ? Math.cos(2 * Math.PI * carrierFrequency1 * t) : Math.cos(2 * Math.PI * carrierFrequency2 * t);
        signal.push(sample);
        t += 1 / (bit === 0 ? carrierFrequency1 : carrierFrequency2) / samplesPerBit;
      }
    }
    setModulatedSignal(signal);
  };

    return (
        <div className='my-12'>
            
      <div className="p-4 mx-auto mb-24">
        <h2 className="text-xl font-semibold mb-4 text-center">FSK Modulation Simulation</h2>
        <div className="mb-4 text-center">
          <label className="mr-2">Binary Data:</label>
          <input
            type="text"
            value={binaryData}
            onChange={(e) => setBinaryData(e.target.value)}
            placeholder="Enter binary data (e.g., 010101)"
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col lg:w-[70%] w-[full] mx-auto">
          <Plot
            data={[
              {
                x: Array.from({ length: modulatedSignal.length }, (_, i) => i),
                y: modulatedSignal,
                type: 'scatter',
              },
            ]}
            layout={{
              title: 'FSK Modulated Signal',
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


export default Fsk;
