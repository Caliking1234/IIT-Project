"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import Plot from 'react-plotly.js';

const DiscreteEquationInputForm = () => {
  const { register, handleSubmit } = useForm();
  const [dataPoints, setDataPoints] = React.useState([]);
  const [curveData, setCurveData] = React.useState(null);

  const onSubmit = data => {
    const parsedData = data.points.split(',').map(point => parseFloat(point.trim()));
    setDataPoints(parsedData);
    setCurveData(generateCurve(parsedData));
  };

  const generateCurve = points => {
    const xValues = Array.from({ length: points.length }, (_, i) => i);
    const yValues = points;
    return { xValues, yValues };
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Data Points (comma-separated):
          <input {...register('points', { required: true })} />
        </label>
        <button type="submit">Generate Curve</button>
      </form>

      {curveData && (
        <Plot
          data={[
            {
              x: curveData.xValues,
              y: curveData.yValues,
              type: 'scatter',
              mode: 'lines',
              name: 'Generated Curve',
            },
          ]}
          layout={{ title: 'Generated Curve Plot' }}
        />
      )}
    </div>
  );
};

export default DiscreteEquationInputForm;
