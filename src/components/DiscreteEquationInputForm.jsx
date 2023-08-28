"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Plot from "react-plotly.js";

const DiscreteEquationInputForm = () => {
  const { register, handleSubmit } = useForm();
  const [dataPoints, setDataPoints] = React.useState([]);
  const [curveData, setCurveData] = React.useState(null);

  function createIncreasingArray(start, end) {
    const array = [];

    for (let i = start; i <= end; i++) {
      array.push(i);
    }

    return array;
  }

  function generateSineWave(tbeg,amplitude, frequency, phase, duration, sampleRate) {
    const sineWave = [];

    for (let t = tbeg; t <= duration; t += 1 / sampleRate) {
      const value = amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
      sineWave.push(value);
    }

    return sineWave;
  }

  const amplitude = 1; // Peak value of the sine wave
  let tbeg = 0;
  const frequency = 440; // Frequency in Hz (A440, for example)
  const phase = 0; // Phase offset in radians (0 for no phase offset)
  let duration = 1; // Duration of the sine wave in seconds
  const sampleRate = 1; // Number of samples per second (standard for audio)


  const onSubmit = (data) => {
    const parsedData = data.points
      .split(",")
      .map((point) => parseFloat(point.trim()));
    setDataPoints(parsedData);
    setCurveData(generateCurve(parsedData));
  };

  function GenerateyValues(xValues, points) {
    let arr = [];
    for (let i = 0, j = 0; i < xValues.length; i++) {
      if (points[j] === xValues[i]) {
        arr.push(1);
        j++;
      } else {
        arr.push(0);
      }
    }
    return arr;
  }

  const generateCurve = (points) => {
    points.sort((a, b) => a - b);
    const xValues = createIncreasingArray(points[0], points[points.length - 1]);
    const yValues = GenerateyValues(xValues, points);
    tbeg=points[0];
    duration=points[points.length - 1];
    const sineWave = generateSineWave(
      tbeg,
      amplitude,
      frequency,
      phase,
      duration,
      sampleRate
    );

    for(let i=0;i<yValues.length;i++){
      yValues[i] = yValues[i]*sineWave[i];
    }

  console.log(sineWave);


    console.log(xValues, yValues);
    return { xValues, yValues };
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Data Points (comma-separated):
          <input {...register("points", { required: true })} />
        </label>
        <button type="submit">Generate Curve</button>
      </form>

      {curveData && (
        <Plot
          data={[
            {
              x: curveData.xValues,
              y: curveData.yValues,
              type: "scatter",
              mode: "markers",
              name: "Generated Curve",
            },
          ]}
          layout={{ title: "Generated Curve Plot" }}
        />
      )}
    </div>
  );
};

export default DiscreteEquationInputForm;
