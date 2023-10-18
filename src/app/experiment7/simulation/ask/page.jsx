"use client";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ASKModulation = () => {
  const navigate = useRouter();
  const DynamicPlot = dynamic(() => import("react-plotly.js"), {
    ssr: false, // Prevents server-side rendering
  });
  const [duration, setDuration] = useState(3);
  const [pulseWidth, setPulseWidth] = useState(0.6);
  const [messageFrequency, setMessageFrequency] = useState(10);
  const [askSignal, setASKSignal] = useState([]);
  const [messageAmplitude, setMessageAmplitude] = useState(1);
  const sampleRate = 1000;
  const time = Array.from(
    { length: sampleRate * duration },
    (_, i) => i / sampleRate
  );

  const messageSignal = time.map(
    (t) => messageAmplitude * Math.sin(2 * Math.PI * messageFrequency * t)
  );

  const pulseSignal = time.map((t) => (t % 1 < pulseWidth ? 1 : 0));

  useEffect(() => {
    const askSignal = messageSignal.map((msg, i) => msg * pulseSignal[i]);
    setASKSignal(askSignal);
  }, [messageSignal, pulseSignal]);

  return (
    <div>
      <Plot
        data={[
          {
            x: time,
            y: messageSignal,
            type: "scatter",
            name: "Message Signal",
          },
        ]}
        layout={{
          title: "Message Signal",
          xaxis: {
            title: "Time (s)",
          },
          yaxis: {
            title: "Amplitude",
            range: [-messageAmplitude * 2, messageAmplitude * 2],
          },
        }}
      />

      <Plot
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
            range: [-messageAmplitude * 2, messageAmplitude * 2],
          },
        }}
      />

      <Plot
        data={[
          {
            x: time,
            y: askSignal,
            type: "scatter",
            name: "ASK Output",
          },
        ]}
        layout={{
          title: "ASK Output",
          xaxis: {
            title: "Time (s)",
          },
          yaxis: {
            title: "Amplitude",
            range: [-messageAmplitude * 2, messageAmplitude * 2],
          },
        }}
      />
      <div
        onClick={() => (window.location = "/experiment7/simulation")}
        className="cursor-pointer hover:bg-blue-300 py-2 px-5 rounded text-center border border-blue-500 bg-blue-200"
      >
        Go Back
      </div>
    </div>
  );
};

export default ASKModulation;
