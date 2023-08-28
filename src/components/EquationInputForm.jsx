"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';

const EquationInputForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [equationData, setEquationData] = React.useState(null);

  const onSubmit = data => {
    try {
      const parsedEquation = math.compile(data.equation);
      const xValues = Array.from({ length: 100 }, (_, i) => i - 50);
      const yValues = xValues.map(x => parsedEquation.evaluate({ x }));

      setEquationData({ xValues, yValues });
    } catch (error) {
      console.error('Error evaluating equation:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Equation:
          <input {...register('equation', { required: true })} />
        </label>
        <button type="submit">Plot</button>
      </form>

      {equationData && (
        <Plot
          data={[
            {
              x: equationData.xValues,
              y: equationData.yValues,
              type: 'scatter',
              mode: 'lines',
              name: 'Equation Curve',
            },
          ]}
          layout={{ title: 'Equation Curve Plot' }}
        />
      )}
    </div>
  );
};

export default EquationInputForm;
