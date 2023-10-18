"use client";
"use client";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";

const FSKModulation = () => {
  const DynamicPlot = dynamic(() => import("react-plotly.js"), {
    ssr: false, // Prevents server-side rendering
  });
  const [duration, setDuration] = useState(3);
  const [pulseWidth, setPulseWidth] = useState(0.5);
  const [messageFrequency1, setMessageFrequency1] = useState(2);
  const [messageFrequency2, setMessageFrequency2] = useState(10);
  const [askSignal, setASKSignal] = useState([]);
  const [messageAmplitude, setMessageAmplitude] = useState(1);

  const sampleRate = 1000;
  const time = Array.from(
    { length: sampleRate * duration },
    (_, i) => i / sampleRate
  );

  const messageSignal1 = time.map(
    (t) => messageAmplitude * Math.sin(2 * Math.PI * messageFrequency1 * t)
  );
  const messageSignal2 = time.map(
    (t) => messageAmplitude * Math.sin(2 * Math.PI * messageFrequency2 * t)
  );

  // Pulse signal parameters
  const pulseSignal = time.map((t) => (t % 1 < pulseWidth ? 1 : 0));

  // FSK signal
  const fskSignal = time.map((_, i) =>
    pulseSignal[i] === 0 ? messageSignal1[i] : messageSignal2[i]
  );

  return (
    <div>
      <DynamicPlot
        data={[
          {
            x: time,
            y: messageSignal1,
            type: "scatter",
            name: "Frequency 1 Plot",
          },
        ]}
        layout={{
          title: "Frequency 1 Plot",
          xaxis: {
            title: "Time (s)",
          },
          yaxis: {
            title: "Amplitude",
          },
        }}
      />

      <DynamicPlot
        data={[
          {
            x: time,
            y: messageSignal2,
            type: "scatter",
            name: "Frequency 2 Plot",
          },
        ]}
        layout={{
          title: "Frequency 2 Plot",
          xaxis: {
            title: "Time (s)",
          },
          yaxis: {
            title: "Amplitude",
          },
        }}
      />

      <DynamicPlot
        data={[
          {
            x: time,
            y: pulseSignal,
            type: "scatter",
            name: "Pulse Signal",
          },
        ]}
        layout={{
          title: "Pulse Signal",
          xaxis: {
            title: "Time (s)",
          },
          yaxis: {
            title: "Amplitude",
          },
        }}
      />

      <DynamicPlot
        data={[
          {
            x: time,
            y: fskSignal,
            type: "scatter",
            name: "FSK Output",
          },
        ]}
        layout={{
          title: "FSK Output",
          xaxis: {
            title: "Time (s)",
          },
          yaxis: {
            title: "Amplitude",
          },
        }}
      />
      {/* <div
        onClick={() => (window.location = "/experiment7/simulation")}
        className="cursor-pointer hover:bg-blue-300 py-2 px-5 rounded text-center border border-blue-500 bg-blue-200"
      >
        Go Back
      </div> */}
    </div>
  );
};

export default FSKModulation;
