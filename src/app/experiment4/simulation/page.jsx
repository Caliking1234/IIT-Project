"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const page = () => {
  const DynamicPlot = dynamic(() => import("react-plotly.js"), {
    ssr: false, // Prevents server-side rendering
  });

  const [type, setType] = useState(1);
  const [pulseType, setPulseType] = useState(1);

  const [carrierGraph, setcarrierCurve] = useState(false);
  const [msgSignal, setmsgSignal] = useState(false);
  const [pamGraph, setpamCurve] = useState(false);
  const [pwmGraph, setpwmCurve] = useState(false);
  const [pwmModGraph, setpwmModCurve] = useState(false);

  const [signalDuration, setsignalDuration] = useState(15);
  const [carrierFrequency, setcarriierfreq] = useState(0.5);
  const [frequency, setfreq] = useState(0.2);
  const [time, setTime] = useState([]);
  const [carrierSignal, setCarrierSignal] = useState([]);
  const [amplitude, setAmplitude] = useState(1);
  const [pulse, setPulse] = useState([]);
  const [dutyCycle, setDCycle] = useState(50);

  const [pamSignal, setPamSignal] = useState([]);
  const [PWM, setPWM] = useState([]);
  const [PPM, setPPM] = useState([]);
  const [pwmSignal, setPwmSignal] = useState([]);
  const [newDemodSignal, setNewDemodSignal] = useState([]);
  const [newDemodSignalCos, setNewDemodSignalCos] = useState([]);

  useEffect(() => {
    const generateSinSignal = (amplitude, carrierFrequency, sigration) => {
      const stepSize = 1 / 1000; // 1000 steps per secondnalDu
      const data = [];
      for (let t = 0; t < signalDuration; t += stepSize) {
        const y = amplitude * Math.sin(2 * Math.PI * carrierFrequency * t);
        data.push(y);
      }
      return data;
    };


    const demodulateSinSignal = (pamSignalData) => {
      const demodulatedSignal = [];
      for (let i = 0; i < pamSignalData.length; i++) {
        // Use the absolute value to extract the envelope (amplitude) of the modulated signal
        const envelope = Math.abs(pamSignalData[i]);
        demodulatedSignal.push(envelope);
      }
      return demodulatedSignal;
    };
    
    const quantizeSignal = (demodulatedSignal, quantizationLevels) => {
      const minDemodulatedValue = Math.min(...demodulatedSignal);
      const maxDemodulatedValue = Math.max(...demodulatedSignal);
    
      const stepSize = (maxDemodulatedValue - minDemodulatedValue) / quantizationLevels;
    
      const quantizedSignal = demodulatedSignal.map((value) => {
        // Map the demodulated value to the closest quantization level
        const quantizedValue = Math.floor((value - minDemodulatedValue) / stepSize);
        return quantizedValue;
      });
    
      return quantizedSignal;
    };


// -----------------------------------------------------
const generateCosineSignal = (
  amplitude,
  carrierFrequency,
  signalDuration
) => {
  const stepSize = 1 / 1000; // 1000 steps per second
  const data = [];
  for (let t = 0; t < signalDuration; t += stepSize) {
    const y = amplitude * Math.cos(2 * Math.PI * carrierFrequency * t);
    data.push(y);
  }
  return data;
};


const demodulatePAMSignalCosine = (pamSignalData) => {
  const demodulatedSignal = [];
  for (let i = 0; i < pamSignalData.length; i++) {
    // Use the absolute value to extract the envelope (amplitude) of the modulated signal
    const envelope = Math.abs(pamSignalData[i]);
    demodulatedSignal.push(envelope);
  }
  return demodulatedSignal;
};
   
// -----------------------------------------------------------------

const generateTriangleSignal = (amplitude, carrierFrequency, signalDuration, sampleRate) => {
  const data = [];
  const halfPeriod = 0.5 / carrierFrequency;
  const samplesPerHalfPeriod = Math.floor(sampleRate * halfPeriod);

  for (let t = 0; t < signalDuration; t += 1 / sampleRate) {
    const periodTime = t % (1 / carrierFrequency);
    let y;

    if (periodTime < halfPeriod) {
      y = 2 * amplitude * periodTime * carrierFrequency - amplitude;
    } else {
      y = -2 * amplitude * (periodTime - halfPeriod) * carrierFrequency + amplitude;
    }

    data.push(y);
  }

  return data;
};


    
    const generatePulseSignal = (signalDuration, frequency) => {
      const stepSize = 1 / 1000; // 1000 steps per second
      const data = [];
      const pulseWidth = 1 / (2 * frequency); // Calculate pulse width based on the desired frequency

      for (let t = 0; t < signalDuration; t += stepSize) {
        const y = t % (1 / frequency) <= pulseWidth ? 1 : 0;
        data.push(y);
      }
      return data;
    };

    const timeAxis = Array.from(
      { length: signalDuration * 1000 },
      (_, i) => i / 1000
    );

    let carrierSignalData = [];
    carrierSignalData = generateSinSignal(
      amplitude,
      carrierFrequency,
      signalDuration
    );

    const pulseSignalData = generatePulseSignal(signalDuration, frequency);

    const pamSignalData = carrierSignalData.map(
      (carrierValue, i) => carrierValue * pulseSignalData[i]
    );

    let DemodSignal = [];
    DemodSignal = demodulateSinSignal(pamSignalData);
    
    let QuantizeSignal = [];
    QuantizeSignal = quantizeSignal(DemodSignal , 8);
    
    setTime(timeAxis);

    let CosDemosignal = [];
    CosDemosignal = demodulatePAMSignalCosine(pamSignalData);
    
    
    console.log(DemodSignal);
    
    setNewDemodSignal(QuantizeSignal);
    setNewDemodSignalCos(CosDemosignal);
  }, [ ]);

  console.log(newDemodSignal);

  return (
    <div className="amplitude-modulation-container">
      <DynamicPlot
        className=" w-full h-full"
        data={[
          {
            type: "scatter",
            mode: "lines",
            x: time,
            y: newDemodSignal,
            name: "Carrier Signal",
          },
        ]}
        layout={{
          title: "Carrier Signal",
          xaxis: { title: "Time (s)" },
          yaxis: {
            title: "Amplitude",
            range: [-2 * amplitude, 2 * amplitude],
          },
        }}
      />

<DynamicPlot
        className=" w-full h-full"
        data={[
          {
            type: "scatter",
            mode: "lines",
            x: time,
            y: newDemodSignalCos,
            name: "Carrier Signal",
          },
        ]}
        layout={{
          title: "Carrier Signal",
          xaxis: { title: "Time (s)" },
          yaxis: {
            title: "Amplitude",
            range: [-2 * amplitude, 2 * amplitude],
          },
        }}
      />

      hello demodulatePAMSignalCosine
    </div>
  );
};

export default page;
