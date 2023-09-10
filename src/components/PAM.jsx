"use client";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import * as math from "mathjs";

const PAM = () => {
  // Signal parameters
  const frequency = 1; // Frequency of the sinusoidal signal (in Hz)
  const amplitude = 1; // Amplitude of the sinusoidal signal
  const sampleRate = 1000; // Sampling rate (samples per second)
  const duration = 1; // Duration of the signal (in seconds)

  // Generate time values for the signal
  const t = math?.range(0, duration, 1 / sampleRate, true);

  // Generate the sinusoidal signal
  const sinusoidalSignal = t?.map((time) => {
    return amplitude * math.sin(2 * math.pi * frequency * time);
  });

  // PAM modulation (sampling)
  const numberOfSamples = 8; // Number of samples per symbol
  const pamSignal = [];
  for (let i = 0; i < sinusoidalSignal?.length; i += numberOfSamples) {
    pamSignal.push(sinusoidalSignal[i]);
  }
  console.log(pamSignal);

  // Create data for the plot
  const plotData = [
    {
      x: t,
      y: sinusoidalSignal,
      mode: "lines",
      type: "scatter",
      name: "Original Signal",
    },
    {
      //   x: t.filter((_, index) => index % numberOfSamples === 0),
      x: t,
      y: sinusoidalSignal,
      mode: "markers",
      type: "scatter",
      name: "PAM Signal (Samples)",
    },
  ];

  return (
    <div>
      <h2>Sinusoidal Signal with PAM Modulation</h2>
      <Plot
        data={plotData}
        layout={{ title: "Sinusoidal Signal with PAM Modulation" }}
      />
    </div>
  );
};

export default PAM;
