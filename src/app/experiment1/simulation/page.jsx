"use client";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const GraphPage = () => {
  const [time, setTime] = useState([]);
  const [carrierSignal, setCarrierSignal] = useState([]);
  const [pulse, setPulse] = useState([]);
  const [pamSignal, setPamSignal] = useState([]);
  const [amplitude, setAmplitude] = useState(1);

  useEffect(() => {
    // Function to generate data for the carrier signal
    const generateCarrierSignal = (amplitude, frequency, duration) => {
      const stepSize = 1 / 1000; // 1000 steps per second
      const data = [];
      for (let t = 0; t < duration; t += stepSize) {
        const y = amplitude * Math.sin(2 * Math.PI * frequency * t);
        data.push(y);
      }
      return data;
    };

    // Function to generate data for the pulse signal
    const generatePulseSignal = (duration) => {
      const stepSize = 1 / 1000; // 1000 steps per second
      const data = [];
      for (let t = 0; t < duration; t += stepSize) {
        const y = t % 0.3 <= 0.1 ? 1 : 0; // Pulse width of 0.3 seconds
        data.push(y);
      }
      return data;
    };

    // Parameters for the signals
    const carrierFrequency = 0.5; // Change to your desired frequency
    const signalDuration = 5; // Total duration of the signals in seconds

    // Generate time axis
    const timeAxis = Array.from(
      { length: signalDuration * 1000 },
      (_, i) => i / 1000
    );

    // Generate data for each signal
    const carrierSignalData = generateCarrierSignal(
      amplitude,
      carrierFrequency,
      signalDuration
    );
    const pulseSignalData = generatePulseSignal(signalDuration);

    // Perform PAM by multiplying carrier signal and pulse signal
    const pamSignalData = carrierSignalData.map(
      (carrierValue, i) => carrierValue * pulseSignalData[i]
    );

    setTime(timeAxis);
    setCarrierSignal(carrierSignalData);
    setPulse(pulseSignalData);
    setPamSignal(pamSignalData);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Pulse Amplitude Modulation (PAM)</h1>
      <div>
        <h2>Graph 1: Carrier Signal (Amplitude vs. Time)</h2>
        <Plot
          data={[
            {
              type: "scatter",
              mode: "lines",
              x: time,
              y: carrierSignal,
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
      </div>

      <div>
        <h2>Graph 2: Pulse Signal (Amplitude vs. Time)</h2>
        <Plot
          data={[
            {
              type: "scatter",
              mode: "lines",
              x: time,
              y: pulse,
              name: "Pulse Signal",
            },
          ]}
          layout={{
            title: "Pulse Signal",
            xaxis: { title: "Time (s)" },
            yaxis: {
              title: "Amplitude",
              range: [-2, 2],
            },
          }}
        />
      </div>

      <div>
        <h2>Graph 3: PAM Signal (Amplitude vs. Time)</h2>
        <Plot
          data={[
            {
              type: "scatter",
              mode: "lines",
              x: time,
              y: pamSignal,
              name: "PAM Signal",
            },
          ]}
          layout={{
            title: "PAM Signal",
            xaxis: { title: "Time (s)" },
            yaxis: {
              title: "Amplitude",
              range: [-2 * amplitude, 2 * amplitude],
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraphPage;
