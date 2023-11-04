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

  const [modulationFrequency, setModulationFrequency] = useState(0.1); // in Hz

  const [signalDuration, setsignalDuration] = useState(15);
  const [carrierFrequency, setcarriierfreq] = useState(0.8);
  const [frequency, setfreq] = useState(0.1);
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
  const [fmSignal, setFmSignal] = useState([]); // DmodfmSignal
  const [dmodfmSignal, setDmodfmSignal] = useState([]); // DmodfmSignal

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

      const stepSize =
        (maxDemodulatedValue - minDemodulatedValue) / quantizationLevels;

      const quantizedSignal = demodulatedSignal.map((value) => {
        // Map the demodulated value to the closest quantization level
        const quantizedValue = Math.floor(
          (value - minDemodulatedValue) / stepSize
        );
        return quantizedValue;
      });

      return quantizedSignal;
    };

    // Function to generate data for the modulation signal
    const generateModulationSignal = (modulationFrequency, signalDuration) => {
      const stepSize = 1 / 1000; // 1000 steps per second
      const data = [];
      for (let t = 0; t < signalDuration; t += stepSize) {
        const y = Math.sin(2 * Math.PI * modulationFrequency * t);
        data.push(y);
      }
      return data;
    };

    // Generate data for each signal

    const modulationSignalData = generateModulationSignal(
      modulationFrequency,
      signalDuration
    );

    // ----------generateFM-------------------------------------------

    const generateFM = (
      carrierSignalData,
      modulatingSignalData,
      carrierFrequency,
      modulationIndex,
      signalDuration
    ) => {
      const data = [];
      const stepSize = 1 / 1000; // 1000 steps per second

      // Normalize the carrier waveform to 0 to 1 range
      const maxAmplitude = Math.max(...carrierSignalData);
      const minAmplitude = Math.min(...carrierSignalData);
      const normalizedCarrierSignal = carrierSignalData.map(
        (value) => (value - minAmplitude) / (maxAmplitude - minAmplitude)
      );

      // Normalize the modulating waveform to desired modulation index
      const normalizedModulatingSignal = modulatingSignalData.map(
        (value) => (value * modulationIndex) / Math.max(...modulatingSignalData)
      );

      for (let t = 0; t < signalDuration; t += stepSize) {
        const cycle = 1 / carrierFrequency;
        const index = Math.floor(
          ((t % cycle) / cycle) * normalizedCarrierSignal.length
        );
        const frequencyDeviation = normalizedModulatingSignal[index];

        const instantaneousFrequency = carrierFrequency + frequencyDeviation;

        data.push(instantaneousFrequency);
      }

      return data;
    };

    // ----------generateFM demodulation-------------------------------------------

    const demodulateFM = (
      fmSignal,
      carrierFrequency,
      modulationIndex,
      signalDuration
    ) => {
      // const stepSize = 1 / 1000; // 1000 steps per second
      // const modulatingSignalData = [];

      // for (let t = 0; t < signalDuration; t += stepSize) {
      //   const cycle = 1 / carrierFrequency;
      //   const index = Math.floor(
      //     ((t % cycle) / cycle) * fmSignal.length
      //   );

      //   // Calculate the instantaneous frequency deviation
      //   const instantaneousFrequency = fmSignal[index];
      //   const frequencyDeviation = instantaneousFrequency - carrierFrequency;

      //   // Normalize the frequency deviation to the original modulating signal range
      //   const normalizedFrequencyDeviation = (frequencyDeviation / modulationIndex) * Math.max(...modulatingSignalData);

      //   modulatingSignalData.push(normalizedFrequencyDeviation);
      // }

      // return modulatingSignalData;

      const demodulatedSignal = [];
      let phase = 0;

      for (let i = 0; i < fmSignal.length; i++) {
        // Calculate phase change based on frequency deviation
        const deltaPhase =
          (2 * Math.PI * (fmSignal[i] - carrierFrequency)) / carrierFrequency;

        // Integrate the phase change to recover the modulating signal
        phase += deltaPhase;
        demodulatedSignal.push(phase);
      }

      return demodulatedSignal;

      //     const demodulatedSignal = [];
      // let phase = 0;
      // const twoPi = 2 * Math.PI;
      // const deltaPhi = (twoPi * carrierFrequency) / samplingRate;

      // for (let i = 0; i < fmSignal.length; i++) {
      //   // Compute the phase change based on the instantaneous frequency deviation
      //   phase += deltaPhi * (1 + fmSignal[i]);
      //   // Extract the phase change as the demodulated signal
      //   demodulatedSignal.push(phase);
      // }

      // return demodulatedSignal;
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

    const generateTriangleSignal = (
      amplitude,
      carrierFrequency,
      signalDuration,
      sampleRate
    ) => {
      const data = [];
      const halfPeriod = 0.5 / carrierFrequency;
      const samplesPerHalfPeriod = Math.floor(sampleRate * halfPeriod);

      for (let t = 0; t < signalDuration; t += 1 / sampleRate) {
        const periodTime = t % (1 / carrierFrequency);
        let y;

        if (periodTime < halfPeriod) {
          y = 2 * amplitude * periodTime * carrierFrequency - amplitude;
        } else {
          y =
            -2 * amplitude * (periodTime - halfPeriod) * carrierFrequency +
            amplitude;
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

    let fmSignalData = generateFM(
      carrierSignalData,
      modulationSignalData,
      carrierFrequency,
      1,
      signalDuration
    );

    let demodulatedfmsigdata = demodulateFM(
      fmSignalData,
      carrierFrequency,
      0.001
    );

    let DemodSignal = [];
    DemodSignal = demodulateSinSignal(pamSignalData);

    let QuantizeSignal = [];
    QuantizeSignal = quantizeSignal(DemodSignal, 8);

    setTime(timeAxis);

    let CosDemosignal = [];
    CosDemosignal = demodulatePAMSignalCosine(pamSignalData);

    console.log(DemodSignal);

    setNewDemodSignal(QuantizeSignal);
    setNewDemodSignalCos(CosDemosignal);
  }, []);

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
            y: dmodfmSignal,
            name: "FM Signal",
          },
        ]}
        layout={{
          title: "FM Signal",
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
