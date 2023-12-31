"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PAMImage from "../../../../public/Image/pamimg.jpg";
import PWMImage from "../../../../public/Image/pwming.jpg";
import PPMImage from "../../../../public/Image/ppmimg.jpg";

const Page = () => {
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
  const [ppmGraph, setppmCurve] = useState(false);

  const [signalDuration, setsignalDuration] = useState(25);
  const [carrierFrequency, setcarriierfreq] = useState(0.1);
  const [frequency, setfreq] = useState(0.05);
  const [time, setTime] = useState([]);
  const [carrierSignal, setCarrierSignal] = useState([]);
  const [amplitude, setAmplitude] = useState(1);
  const [pulse, setPulse] = useState([]);
  const [dutyCycle, setDCycle] = useState(30);

  const [PAM, setPamSignal] = useState([]);
  const [PWM, setPWM] = useState([]);
  const [PPM, setPPM] = useState([]);

  useEffect(() => {
    //Sin wave generate hori hai
    const generateSinSignal = (amplitude, carrierFrequency, sigration) => {
      const stepSize = 1 / 1000; // 1000 steps per secondnalDu
      const data = [];
      for (let t = 0; t < signalDuration; t += stepSize) {
        const y = amplitude * Math.sin(2 * Math.PI * carrierFrequency * t);
        data.push(y);
      }
      return data;
    };

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

    const generateRampSignal = (signalDuration, amplitude) => {
      const stepSize = 1 / 1000; // 1000 steps per second
      const data = [];
      let y = 0;
      for (let t = 0; t < signalDuration; t += stepSize) {
        data.push(y);
        y += (amplitude / signalDuration) * stepSize;
      }
      return data;
    };

    const generateTriangleWave = (signalDuration, frequency) => {
      const stepSize = 1 / 1000; // 1000 steps per second
      const data = [];
      const period = 1 / frequency; // Calculate period based on the desired frequency

      for (let t = 0; t < signalDuration; t += stepSize) {
        // Calculate the value of the triangle wave at time t
        const normalizedT = (t % period) / period;
        const y = normalizedT < 0.5 ? 4 * normalizedT - 1 : 3 - 4 * normalizedT;

        data.push(y);
      }
      return data;
    };

    //Square Pulse wave generate hori hai
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

    const generatePWM = (
      carrierSignalData,
      carrierFrequency,
      signalDuration,
      dutyCycle
    ) => {
      const data = [];
      const stepSize = 1 / 1000; // 1000 steps per second

      // Normalize the waveform to 0 to 1 range
      const maxAmplitude = Math.max(...carrierSignalData);
      const minAmplitude = Math.min(...carrierSignalData);
      const normalizedWaveform = carrierSignalData.map(
        (value) => (value - minAmplitude) / (maxAmplitude - minAmplitude)
      );

      for (let t = 0; t < signalDuration; t += stepSize) {
        const cycle = 1 / carrierFrequency;
        const index = Math.floor(
          ((t % cycle) / cycle) * normalizedWaveform.length
        );
        const dutyCycleValue =
          normalizedWaveform[index] < dutyCycle / 100 ? 1 : 0;
        data.push(dutyCycleValue);
      }

      return data;
    };

    // Generate time axis
    const timeAxis = Array.from(
      { length: signalDuration * 1000 },
      (_, i) => i / 1000
    );

    // Generate data for each signal
    let carrierSignalData = [];

    if (pulseType == 1) {
      carrierSignalData = generateSinSignal(
        amplitude,
        carrierFrequency,
        signalDuration
      );
    } else if (pulseType == 2) {
      carrierSignalData = generateCosineSignal(
        amplitude,
        carrierFrequency,
        signalDuration
      );
    } else if (pulseType == 3) {
      carrierSignalData = generateRampSignal(signalDuration, amplitude);
    } else {
      carrierSignalData = generateTriangleWave(
        signalDuration,
        carrierFrequency
      );
    }

    const pulseSignalData = generatePulseSignal(signalDuration, frequency);

    const pamSignalData = carrierSignalData.map(
      (carrierValue, i) => carrierValue * pulseSignalData[i]
    );

    setPamSignal(pamSignalData);

    setTime(timeAxis);
    setCarrierSignal(carrierSignalData);
    setPulse(pulseSignalData);

    let pwmSignalData = generatePWM(
      carrierSignalData,
      carrierFrequency,
      signalDuration,
      dutyCycle
    );

    setPWM(pwmSignalData);

    let ppmSignalData = [];

    ppmSignalData = pwmSignalData.map((value, i) => {
      if (i == 0) {
        return 0;
      }
      if (i == signalDuration) {
        return 0;
      }
      if (pwmSignalData[i - 1] == 1 && pwmSignalData[i + 1] == 0) {
        return 1;
      } else return 0;
    });
    setPPM(ppmSignalData);
    console.log(ppmSignalData);
  }, [
    amplitude,
    signalDuration,
    carrierFrequency,
    frequency,
    type,
    dutyCycle,
    pulseType,
  ]);

  console.log(PPM);

  return (
    <>
      <div className=" w-full flex gap-2 p-5">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose Simulation</option>
          <option value="1">PAM</option>
          <option value="2">PWM</option>
          <option value="3">PPM</option>
          {/* <option value="4">DM</option>
              <option value="5">PCM</option> */}
        </select>
      </div>
      <div className=" w-full h-fit  flex flex-col items-center justify-center py-8 relative">
        {type == 1 ? (
          <div className=" w-full max-h-[50vh] flex flex-col items-center justify-center">
            <Image src={PAMImage} height={500} width={500} />
            <button
              onClick={() => {
                setcarrierCurve(!carrierGraph);
              }}
              className="absolute float-right right-[150px] top-[10%] p-2 rounded-sm bg-red-200 "
            >
              {" "}
              click for modulating signal
            </button>
            <button
              onClick={() => {
                setpamCurve(!pamGraph);
              }}
              className="absolute float-right top-[50%] right-[170px] p-2 rounded-sm bg-green-200 "
            >
              {" "}
              click for modulated signal{" "}
            </button>
            <button
              onClick={() => {
                setcarrierCurve(!carrierGraph);
              }}
              className="absolute float-right top-[80%] right-[270px] p-2 rounded-sm bg-orange-200 "
            >
              {" "}
              click for carrier signal{" "}
            </button>
          </div>
        ) : type == 2 ? (
          <div className=" w-full max-h-[50vh] flex flex-col items-center justify-center">
            <Image src={PWMImage} height={500} width={500} />
            <button
              onClick={() => {
                setcarrierCurve(!carrierGraph);
              }}
              className="absolute float-left left-[150px] top-[15%] p-2 rounded-sm bg-red-200 "
            >
              {" "}
              click for Carrier signal
            </button>
            <button
              onClick={() => {
                setpwmCurve(!pwmGraph);
              }}
              className="absolute float-left top-[70%] left-[150px] p-2 rounded-sm bg-green-200 "
            >
              {" "}
              click for modulating signal{" "}
            </button>
            <button
              onClick={() => {
                setpwmModCurve(!pwmModGraph);
              }}
              className="absolute float-right top-[50%] right-[210px] p-2 rounded-sm bg-orange-200 "
            >
              {" "}
              click for modulated signal{" "}
            </button>
          </div>
        ) : (
          <div className=" w-full max-h-[50vh] flex flex-col items-center justify-center">
            <Image src={PPMImage} height={500} width={500} />
            <button
              onClick={() => {
                setcarrierCurve(!carrierGraph);
              }}
              className="absolute float-left left-[150px] top-[10%] p-2 rounded-sm bg-red-200 "
            >
              {" "}
              click for Carrier signal
            </button>
            <button
              onClick={() => {
                setmsgSignal(!msgSignal);
              }}
              className="absolute float-left top-[65%] left-[150px] p-2 rounded-sm bg-green-200 "
            >
              {" "}
              click for modulating signal{" "}
            </button>
            <button
              onClick={() => {
                setppmCurve(!ppmGraph);
              }}
              className="absolute float-right top-[46%] right-[210px] p-2 rounded-sm bg-orange-200 "
            >
              {" "}
              click for modulated signal{" "}
            </button>
          </div>
        )}
      </div>
      <div className=" w-full h-fit ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 w-full gap-2 py-5">
          <div
            className={
              !carrierGraph
                ? " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[-200%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-0"
                : " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[35%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-100"
            }
          >
            <DynamicPlot
              className=" w-full h-full"
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
            <div className=" w-full flex gap-2 px-5">
              <select
                value={pulseType}
                onChange={(e) => setPulseType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose Carrier Wave</option>
                <option value="1">Sin Pulse</option>
                <option value="2">Cos Pulse</option>
                <option value="3">Ramp Signal</option>
                <option value="4">Triangle Pulse</option>
              </select>
            </div>
            <div className=" flex flex-row items-center gap-2">
              <div className="relative group h-fit py-3">
                <label
                  className={
                    carrierFrequency
                      ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs text-white"
                      : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
                  }
                >
                  Carrier Frequency(in Hz)
                </label>
                <input
                  type="number"
                  name="Frequency"
                  value={carrierFrequency}
                  onChange={(e) => setcarriierfreq(e.target.value)}
                  className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 441.92 441"
                  className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                >
                  <g>
                    <path
                      fill="#e6e7e8"
                      d="M429.922 16.46H28c-6.617 0-12 5.384-12 12v291.563c0 6.618 5.383 12 12 12h401.922c6.613 0 12-5.382 12-12V28.461c0-6.621-5.383-12-12-12zm0 0"
                      data-original="#e6e7e8"
                    ></path>
                    <path
                      fill="#ffffff"
                      d="M421.922 12.46v291.56c0 4.421-3.582 8-8 8H12c-4.422 0-8-3.579-8-8V12.46c0-4.42 3.578-8 8-8h401.922c4.418 0 8 3.58 8 8zm0 0"
                      data-original="#ffffff"
                    ></path>
                    <path
                      fill="#d4fbff"
                      d="M4 304.02c0 4.417 3.578 8 8 8h401.922a8 8 0 0 0 8-8V16.46H4zm0 0"
                      data-original="#d4fbff"
                      className=""
                    ></path>
                    <path
                      fill="#ffd7e5"
                      d="M85.668 162.832a3.445 3.445 0 0 1-3.348-2.652C66.746 94.14 53.313 84.574 46.81 84.508c-14.844.191-30.016 46.465-36.094 75.586-.39 1.863-2.219 3.062-4.07 2.668a3.446 3.446 0 0 1-2.668-4.075c1.722-8.261 17.57-80.738 42.742-81.062h.187c15.711 0 29.094 25.742 42.117 80.977a3.441 3.441 0 0 1-3.355 4.23zM244.223 165.695a3.448 3.448 0 0 1-3.348-2.652c-15.504-65.746-28.816-75.672-35.422-75.672-.027 0-.058.004-.086.004-14.844.191-30.012 46.46-36.09 75.582-.394 1.863-2.222 3.066-4.074 2.668a3.446 3.446 0 0 1-2.668-4.074c1.727-8.262 17.574-80.738 42.746-81.059 15.938-.16 29.227 25.524 42.297 80.973a3.447 3.447 0 0 1-2.558 4.144 3.686 3.686 0 0 1-.797.086zM400.871 159.86a3.445 3.445 0 0 1-3.348-2.653c-15.503-65.746-28.816-75.672-35.421-75.672-.032 0-.059.004-.086.004-14.844.191-30.012 46.461-36.09 75.582-.39 1.863-2.223 3.063-4.074 2.668a3.446 3.446 0 0 1-2.668-4.074c1.722-8.262 17.574-80.738 42.746-81.059 15.699-.289 29.226 25.524 42.297 80.973a3.447 3.447 0 0 1-2.559 4.144c-.27.059-.531.086-.797.086zm0 0"
                      data-original="#ffd7e5"
                    ></path>
                    <path
                      fill="#ffd7e5"
                      d="M125.715 241.824c-.063 0-.121-.004-.192-.004-25.761-.324-41.984-72.797-43.75-81.058-.398-1.864.825-3.688 2.73-4.075 1.903-.386 3.774.805 4.169 2.668 6.223 29.122 21.762 75.391 36.945 75.583l.086.003c6.766 0 20.395-9.918 36.262-75.671.441-1.848 2.344-2.985 4.238-2.563 1.899.438 3.07 2.293 2.621 4.145-13.328 55.218-27.031 80.972-43.11 80.972zM283.79 241.824c-.067 0-.126-.004-.188-.004-25.172-.324-41.024-72.797-42.747-81.058a3.444 3.444 0 0 1 6.742-1.406c6.079 29.12 21.255 75.39 36.09 75.581.028 0 .055.004.086.004 6.606 0 19.918-9.918 35.422-75.671a3.454 3.454 0 0 1 4.14-2.563 3.444 3.444 0 0 1 2.56 4.145c-13.012 55.218-26.403 80.972-42.106 80.972zM418.465 214.52a3.443 3.443 0 0 1-3.133-2.012c-10.562-23.055-16.934-53.25-17.195-54.528a3.443 3.443 0 0 1 2.668-4.074 3.444 3.444 0 0 1 4.07 2.668c.066.305 6.48 30.727 16.719 53.07a3.446 3.446 0 0 1-3.13 4.876zm0 0"
                      data-original="#ffd7e5"
                    ></path>
                    <g fill="#fa759e">
                      <path
                        d="M58.543 160.441a2.786 2.786 0 0 1-2.703-2.144c-10.34-43.84-19.031-48.598-22.38-48.434-8.769.114-18.593 28.348-22.769 48.364a2.78 2.78 0 0 1-3.293 2.152 2.782 2.782 0 0 1-2.156-3.285c1.832-8.781 11.801-52.582 28.14-52.793h.13c10.445 0 19.265 16.758 27.742 52.719a2.787 2.787 0 0 1-2.07 3.347c-.211.043-.426.074-.641.074zM160.938 162.29a2.783 2.783 0 0 1-2.708-2.145c-10.289-43.645-19.015-48.434-22.335-48.434h-.043c-8.766.113-18.59 28.348-22.766 48.363a2.785 2.785 0 0 1-3.293 2.153 2.779 2.779 0 0 1-2.156-3.286c1.832-8.78 11.8-52.582 28.14-52.793h.125c10.446 0 19.266 16.758 27.743 52.72a2.787 2.787 0 0 1-2.708 3.421zM262.09 158.516a2.783 2.783 0 0 1-2.707-2.145c-10.336-43.836-19.106-48.496-22.38-48.43-8.769.114-18.593 28.348-22.769 48.364a2.771 2.771 0 0 1-3.289 2.152 2.783 2.783 0 0 1-2.156-3.289c1.832-8.781 11.8-52.578 28.14-52.793h.126c10.445 0 19.265 16.762 27.742 52.723a2.787 2.787 0 0 1-2.07 3.347c-.211.047-.426.07-.637.07zM364.227 162.29a2.782 2.782 0 0 1-2.704-2.145c-10.336-43.836-19.109-48.497-22.378-48.434-8.77.117-18.594 28.348-22.77 48.363-.316 1.504-1.79 2.477-3.29 2.153a2.776 2.776 0 0 1-2.155-3.286c1.832-8.78 11.797-52.582 28.136-52.793h.13c10.445 0 19.265 16.758 27.741 52.72a2.787 2.787 0 0 1-2.71 3.421zm0 0"
                        fill="#fa759e"
                        data-original="#fa759e"
                      ></path>
                      <path
                        d="M85.328 214.098H85.2c-16.344-.215-26.308-44.012-28.14-52.793a2.781 2.781 0 0 1 2.152-3.29 2.774 2.774 0 0 1 3.293 2.153c4.18 20.012 14.008 48.254 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.43.352-1.492 1.852-2.41 3.344-2.07a2.781 2.781 0 0 1 2.067 3.348c-8.473 35.957-17.29 52.719-27.735 52.719zM186.48 211.016h-.128c-16.344-.211-26.309-44.012-28.141-52.793a2.775 2.775 0 0 1 2.152-3.286 2.774 2.774 0 0 1 3.293 2.153c4.18 20.012 14.008 48.25 22.77 48.363h.043c3.32 0 12.043-4.789 22.336-48.433.351-1.497 1.847-2.407 3.343-2.067a2.781 2.781 0 0 1 2.067 3.348c-8.473 35.953-17.29 52.715-27.735 52.715zM288.71 211.512h-.124c-16.348-.211-26.309-44.012-28.14-52.793a2.775 2.775 0 0 1 2.152-3.285 2.767 2.767 0 0 1 3.289 2.152c4.18 20.012 14.008 48.25 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.433.352-1.493 1.852-2.407 3.344-2.067a2.784 2.784 0 0 1 2.07 3.348c-8.476 35.957-17.293 52.715-27.738 52.715zM390.04 214.098h-.13c-16.344-.215-26.305-44.012-28.137-52.793a2.781 2.781 0 0 1 2.153-3.29 2.77 2.77 0 0 1 3.289 2.153c4.18 20.012 14.008 48.254 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.43.352-1.492 1.852-2.41 3.344-2.07a2.784 2.784 0 0 1 2.07 3.348c-8.472 35.957-17.293 52.719-27.738 52.719zm0 0"
                        fill="#fa759e"
                        data-original="#fa759e"
                      ></path>
                    </g>
                    <path
                      fill="#0089ef"
                      d="M109.383 159.227a3.72 3.72 0 0 1-3.613-2.864C85.527 70.52 67.855 57.57 59.055 57.57h-.114c-19.707.258-39.636 60.672-47.57 98.7a3.72 3.72 0 0 1-7.281-1.523C6.316 144.085 26.758 50.542 58.844 50.128h.218c19.723 0 37.368 34.191 53.946 104.523a3.725 3.725 0 0 1-2.766 4.477 3.791 3.791 0 0 1-.86.098zM315.18 159.227a3.728 3.728 0 0 1-3.618-2.864c-20.238-85.843-37.91-98.793-46.71-98.793h-.118c-19.703.258-39.629 60.672-47.566 98.7a3.718 3.718 0 0 1-4.398 2.878 3.725 3.725 0 0 1-2.887-4.402c2.23-10.66 22.668-104.203 54.754-104.617h.218c19.715 0 37.36 34.191 53.946 104.523a3.725 3.725 0 0 1-2.766 4.477c-.281.066-.57.098-.855.098zm0 0"
                      data-original="#0089ef"
                    ></path>
                    <path
                      fill="#0089ef"
                      d="M163.2 266.344h-.22c-32.085-.414-52.527-93.957-54.757-104.621a3.719 3.719 0 0 1 2.886-4.399 3.719 3.719 0 0 1 4.399 2.88c7.941 38.023 27.875 98.444 47.566 98.694h.117c8.805 0 26.473-12.941 46.711-98.789.473-1.996 2.48-3.222 4.473-2.77a3.72 3.72 0 0 1 2.766 4.477c-16.578 70.332-34.227 104.528-53.942 104.528zM366.52 263.59h-.22c-32.085-.418-52.527-93.957-54.757-104.621a3.722 3.722 0 0 1 7.285-1.52c7.942 38.024 27.875 98.442 47.567 98.696h.117c8.804 0 26.472-12.946 46.71-98.793.473-1.997 2.481-3.22 4.473-2.766a3.712 3.712 0 0 1 2.766 4.473c-16.578 70.332-34.227 104.53-53.941 104.53zm0 0"
                      data-original="#0089ef"
                    ></path>
                    <path
                      fill="#3a2c60"
                      d="M413.922.46H12c-6.617 0-12 5.384-12 12v291.563c0 6.618 5.383 12 12 12h401.922c6.613 0 12-5.382 12-12v-186.68a4 4 0 0 0-8 0v36.891H347.48c-4.59-24.863-24.406-125.324-48.168-145.773h114.61c2.203 0 4 1.793 4 4v43.887a4 4 0 0 0 8 0V12.46c0-6.621-5.383-12-12-12zm-73.785 161.774c5.68 24.524 30.27 125.305 54.957 145.786H185.695c23.77-20.45 43.586-120.926 48.172-145.786zM177.379 303.711c-13.977 0-38.84-71.418-55.192-141.477h103.54c-13.016 70.028-34.454 141.477-48.348 141.477zm-65.395-149.477H8.445C21.508 84.214 42.988 12.766 56.88 12.766c13.973 0 38.793 71.418 55.105 141.468zM12 8.461h36.559C31.758 22.92 16.895 77.34 8 116.828V12.461c0-2.207 1.793-4 4-4zM8 304.02V162.234h105.973c5.68 24.524 30.27 125.305 54.957 145.786H12c-2.207 0-4-1.793-4-4zm405.922 4h-1.527c1.917-1.641 3.785-3.86 5.527-6.778v2.778c0 2.207-1.797 4-4 4zm4-32.86c-3.219 20.938-10.356 28.55-14.379 28.55-13.977 0-38.84-71.417-55.191-141.476h69.562V275.16zM339.34 154.234H235.805c16.347-70.05 41.21-141.468 55.187-141.468 13.895 0 35.332 71.449 48.348 141.468zm-111.754 0H120.199C114.531 129.7 90.004 28.945 65.336 8.461H282.53c-24.676 20.488-49.261 121.246-54.945 145.773zm0 0"
                      data-original="#3a2c60"
                      className=""
                    ></path>
                    <path
                      fill="#3a2c60"
                      d="M421.922 67.844c-2.211 0-4 1.789-4 4v29a4 4 0 0 0 8 0v-29c0-2.207-1.793-4-4-4zm0 0"
                      data-original="#3a2c60"
                      className=""
                    ></path>
                  </g>
                </svg>
                <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
              </div>
              <div className="relative group h-fit">
                <label
                  className={
                    signalDuration
                      ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs text-white"
                      : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
                  }
                >
                  Duration(in sec)
                </label>
                <input
                  type="number"
                  name="Duration"
                  value={signalDuration}
                  onChange={(e) => setsignalDuration(e.target.value)}
                  className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                >
                  <g>
                    <g data-name="Layer 2">
                      <path
                        fill="#fdfeff"
                        d="M18 2.25H6a.76.76 0 0 0-.75.75v3a5.75 5.75 0 0 0 2.42 4.68 1.3 1.3 0 0 1 .58 1.05v.54a1.3 1.3 0 0 1-.58 1.05A5.75 5.75 0 0 0 5.25 18v3a.76.76 0 0 0 .75.75h12a.76.76 0 0 0 .75-.75v-3a5.75 5.75 0 0 0-2.42-4.68 1.3 1.3 0 0 1-.58-1.05v-.54a1.3 1.3 0 0 1 .58-1.05A5.75 5.75 0 0 0 18.75 6V3a.76.76 0 0 0-.75-.75z"
                        data-original="#fdfeff"
                        className=""
                      ></path>
                      <g fill="#004fac">
                        <path
                          d="M18 22.75H6a.76.76 0 0 1-.75-.75v-4a5.75 5.75 0 0 1 2.42-4.68 1.3 1.3 0 0 0 .58-1.05v-.54a1.3 1.3 0 0 0-.58-1.05A5.75 5.75 0 0 1 5.25 6V2A.76.76 0 0 1 6 1.25h12a.75.75 0 0 1 0 1.5H6.75V6a4.26 4.26 0 0 0 1.79 3.46 2.78 2.78 0 0 1 1.21 2.27v.54a2.78 2.78 0 0 1-1.21 2.27A4.26 4.26 0 0 0 6.75 18v3.25h10.5V18a4.26 4.26 0 0 0-1.79-3.46 2.78 2.78 0 0 1-1.21-2.27v-.54a2.78 2.78 0 0 1 1.21-2.27A4.26 4.26 0 0 0 17.25 6V5a.75.75 0 0 1 1.5 0v1a5.75 5.75 0 0 1-2.42 4.68 1.3 1.3 0 0 0-.58 1.05v.54a1.3 1.3 0 0 0 .58 1.05A5.75 5.75 0 0 1 18.75 18v4a.76.76 0 0 1-.75.75z"
                          fill="#004fac"
                          data-original="#004fac"
                        ></path>
                        <path
                          d="M20 2.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5zM20 22.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5z"
                          fill="#004fac"
                          data-original="#004fac"
                        ></path>
                      </g>
                      <path
                        fill="#3e96ed"
                        d="M9 20h6a1 1 0 0 0 1-1v-1.17a2 2 0 0 0-.59-1.42l-2.7-2.7a1 1 0 0 0-1.42 0l-2.7 2.7A2 2 0 0 0 8 17.83V19a1 1 0 0 0 1 1z"
                        data-original="#3e96ed"
                      ></path>
                    </g>
                  </g>
                </svg>
                <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
              </div>
            </div>
          </div>
          {/* {type == 1 ? ( */}
          <div
            className={
              !msgSignal
                ? " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[-200%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-0"
                : " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[35%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-100"
            }
          >
            <DynamicPlot
              className=" shadow-md shadow-black w-full h-full"
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: time,
                  y: pulse,
                  name: "Message Signal",
                },
              ]}
              layout={{
                title: "Message Signal",
                xaxis: { title: "Time (s)" },
                yaxis: {
                  title: "Amplitude",
                  range: [-2 * amplitude, 2 * amplitude],
                },
              }}
            />
          </div>
          <div
            className={
              !pamGraph
                ? " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[-200%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-0"
                : " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[35%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-100"
            }
          >
            <DynamicPlot
              className=" w-full h-full"
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: time,
                  y: PAM,
                  name: "Modulated Signal",
                },
              ]}
              layout={{
                title: "Modulated Signal",
                xaxis: { title: "Time (s)" },
                yaxis: {
                  title: "Amplitude",
                  range: [-2 * amplitude, 2 * amplitude],
                },
              }}
            />
          </div>
          <div
            className={
              !pwmGraph
                ? " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[-200%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-0"
                : " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[35%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-100"
            }
          >
            <DynamicPlot
              className=" w-full h-full"
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: time,
                  y: pulse,
                  name: "Message Signal",
                },
              ]}
              layout={{
                title: "Message Signal",
                xaxis: { title: "Time (s)" },
                yaxis: {
                  title: "Amplitude",
                  range: [-2 * amplitude, 2 * amplitude],
                },
              }}
            />
          </div>
          <div
            className={
              !pwmModGraph
                ? " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[-200%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-0"
                : " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[35%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-100"
            }
          >
            <DynamicPlot
              className=" w-full h-full"
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: time,
                  y: PWM,
                  name: "Modulated Signal",
                },
              ]}
              layout={{
                title: "Modulated Signal",
                xaxis: { title: "Time (s)" },
                yaxis: {
                  title: "Amplitude",
                  range: [-2 * amplitude, 2 * amplitude],
                },
              }}
            />
          </div>
          <div
            className={
              !ppmGraph
                ? " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[-200%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-0"
                : " bg-gray-700 absolute left-[50%] translate-x-[-50%] top-[35%] w-[500px] h-[500px] gap-10 flex flex-col items-center justify-around transition-all ease-in duration-500 opacity-100"
            }
          >
            <DynamicPlot
              className=" w-full h-full"
              data={[
                {
                  type: "scatter",
                  mode: "lines",
                  x: time,
                  y: PPM,
                  name: "Modulated Signal",
                },
              ]}
              layout={{
                title: "Modulated Signal",
                xaxis: { title: "Time (s)" },
                yaxis: {
                  title: "Amplitude",
                  range: [-2 * amplitude, 2 * amplitude],
                },
              }}
            />
          </div>
          {/* ) : type == 2 ? (
            
          ) : type == 3 ? (
            <div className=" w-full flex flex-col px-2">
              <DynamicPlot
                className=" shadow-md shadow-black w-full h-full"
                data={[
                  {
                    type: "scatter",
                    mode: "lines",
                    x: time,
                    y: PWM,
                    name: "Message Signal",
                  },
                ]}
                layout={{
                  title: "Message Signal",
                  xaxis: { title: "Time (s)" },
                  yaxis: {
                    title: "Amplitude",
                    range: [-2 * amplitude, 2 * amplitude],
                  },
                }}
              />
            </div>
          ) : (
            <></>
          )}

          {type == 1 ? (
            
          ) : type == 2 ? (
            
          ) : type == 3 ? (
            <div className=" w-full flex flex-col px-2">
              <DynamicPlot
                className=" shadow-md shadow-black w-full h-full"
                data={[
                  {
                    type: "scatter",
                    mode: "lines",
                    x: time,
                    y: PPM,
                    name: "Message Signal",
                  },
                ]}
                layout={{
                  title: "Message Signal",
                  xaxis: { title: "Time (s)" },
                  yaxis: {
                    title: "Amplitude",
                    range: [-2 * amplitude, 2 * amplitude],
                  },
                }}
              />
            </div>
          ) : (
            <></>
          )} */}
          {/* <div className="w-full flex flex-col gap-5 items-center justify-center shadow-md shadow-black bg-white p-4"> */}
          {/* <div className="relative group h-fit">
              <label
                className={
                  amplitude
                    ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs"
                    : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
                }
              >
                Amplitude
              </label>
              <input
                type="number"
                name="Amplitude"
                value={amplitude}
                onChange={(e) => setAmplitude(e.target.value)}
                className="text-black p-6 px-4 h-8 rounded-md  focus-within:outline-none bg-gray-200"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 354.987 354"
                className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
              >
                <g>
                  <path
                    d="M6.828 102.895A6.824 6.824 0 0 0 0 109.719v34.133a6.825 6.825 0 0 0 6.828 6.828 6.824 6.824 0 0 0 6.824-6.828v-34.133a6.823 6.823 0 0 0-6.824-6.824zM40.984 74.941a6.83 6.83 0 0 0-6.828 6.829v94.515a6.828 6.828 0 1 0 13.656 0V81.77a6.83 6.83 0 0 0-6.828-6.829zM75.094 27.8a6.827 6.827 0 0 0-6.828 6.825v191.148c0 3.77 3.058 6.829 6.828 6.829s6.828-3.059 6.828-6.829V34.625a6.827 6.827 0 0 0-6.828-6.824zM109.227 61.934a6.828 6.828 0 0 0-6.829 6.828v116.05a6.83 6.83 0 0 0 6.829 6.829 6.83 6.83 0 0 0 6.828-6.828V68.761a6.828 6.828 0 0 0-6.828-6.828zM212.293 45.406a6.824 6.824 0 0 0-6.824 6.828v153.59c0 3.77 3.054 6.824 6.824 6.824s6.828-3.054 6.828-6.824V52.234a6.828 6.828 0 0 0-6.828-6.828zM279.895 55.105a6.83 6.83 0 0 0-6.829 6.829v136.53c0 3.774 3.059 6.829 6.829 6.829s6.824-3.055 6.824-6.828V61.934a6.827 6.827 0 0 0-6.824-6.829zM314.027 89.238a6.83 6.83 0 0 0-6.828 6.828v68.266a6.827 6.827 0 1 0 13.652 0V96.066a6.827 6.827 0 0 0-6.824-6.828zM245.762.492a6.828 6.828 0 0 0-6.828 6.828v245.758a6.825 6.825 0 0 0 6.828 6.828 6.824 6.824 0 0 0 6.824-6.828V7.32a6.827 6.827 0 0 0-6.824-6.828zM143.36 109.719a6.827 6.827 0 0 0-6.825 6.828v27.305c0 3.773 3.055 6.828 6.824 6.828s6.828-3.055 6.828-6.828v-27.305a6.83 6.83 0 0 0-6.828-6.828zM348.16 107.434a6.827 6.827 0 0 0-6.828 6.824v29.539a6.83 6.83 0 0 0 6.828 6.828 6.83 6.83 0 0 0 6.828-6.828v-29.54a6.827 6.827 0 0 0-6.828-6.823zM176.852 94.418a6.824 6.824 0 0 0-6.829 6.824v55.57a6.827 6.827 0 1 0 13.652 0v-55.57a6.823 6.823 0 0 0-6.823-6.824zm0 0"
                    fill="#000000"
                    data-original="#000000"
                    className=" w-5 h-5 "
                  ></path>
                </g>
              </svg>

              <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
            </div>

            {type == 1 ? (
              <div className="relative group h-fit">
                <label
                  className={
                    carrierFrequency
                      ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs"
                      : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
                  }
                >
                  Message Frequency(in Hz)
                </label>
                <input
                  type="number"
                  name="Frequency"
                  value={frequency}
                  onChange={(e) => setfreq(e.target.value)}
                  className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 441.92 441"
                  className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                >
                  <g>
                    <path
                      fill="#e6e7e8"
                      d="M429.922 16.46H28c-6.617 0-12 5.384-12 12v291.563c0 6.618 5.383 12 12 12h401.922c6.613 0 12-5.382 12-12V28.461c0-6.621-5.383-12-12-12zm0 0"
                      data-original="#e6e7e8"
                    ></path>
                    <path
                      fill="#ffffff"
                      d="M421.922 12.46v291.56c0 4.421-3.582 8-8 8H12c-4.422 0-8-3.579-8-8V12.46c0-4.42 3.578-8 8-8h401.922c4.418 0 8 3.58 8 8zm0 0"
                      data-original="#ffffff"
                    ></path>
                    <path
                      fill="#d4fbff"
                      d="M4 304.02c0 4.417 3.578 8 8 8h401.922a8 8 0 0 0 8-8V16.46H4zm0 0"
                      data-original="#d4fbff"
                      className=""
                    ></path>
                    <path
                      fill="#ffd7e5"
                      d="M85.668 162.832a3.445 3.445 0 0 1-3.348-2.652C66.746 94.14 53.313 84.574 46.81 84.508c-14.844.191-30.016 46.465-36.094 75.586-.39 1.863-2.219 3.062-4.07 2.668a3.446 3.446 0 0 1-2.668-4.075c1.722-8.261 17.57-80.738 42.742-81.062h.187c15.711 0 29.094 25.742 42.117 80.977a3.441 3.441 0 0 1-3.355 4.23zM244.223 165.695a3.448 3.448 0 0 1-3.348-2.652c-15.504-65.746-28.816-75.672-35.422-75.672-.027 0-.058.004-.086.004-14.844.191-30.012 46.46-36.09 75.582-.394 1.863-2.222 3.066-4.074 2.668a3.446 3.446 0 0 1-2.668-4.074c1.727-8.262 17.574-80.738 42.746-81.059 15.938-.16 29.227 25.524 42.297 80.973a3.447 3.447 0 0 1-2.558 4.144 3.686 3.686 0 0 1-.797.086zM400.871 159.86a3.445 3.445 0 0 1-3.348-2.653c-15.503-65.746-28.816-75.672-35.421-75.672-.032 0-.059.004-.086.004-14.844.191-30.012 46.461-36.09 75.582-.39 1.863-2.223 3.063-4.074 2.668a3.446 3.446 0 0 1-2.668-4.074c1.722-8.262 17.574-80.738 42.746-81.059 15.699-.289 29.226 25.524 42.297 80.973a3.447 3.447 0 0 1-2.559 4.144c-.27.059-.531.086-.797.086zm0 0"
                      data-original="#ffd7e5"
                    ></path>
                    <path
                      fill="#ffd7e5"
                      d="M125.715 241.824c-.063 0-.121-.004-.192-.004-25.761-.324-41.984-72.797-43.75-81.058-.398-1.864.825-3.688 2.73-4.075 1.903-.386 3.774.805 4.169 2.668 6.223 29.122 21.762 75.391 36.945 75.583l.086.003c6.766 0 20.395-9.918 36.262-75.671.441-1.848 2.344-2.985 4.238-2.563 1.899.438 3.07 2.293 2.621 4.145-13.328 55.218-27.031 80.972-43.11 80.972zM283.79 241.824c-.067 0-.126-.004-.188-.004-25.172-.324-41.024-72.797-42.747-81.058a3.444 3.444 0 0 1 6.742-1.406c6.079 29.12 21.255 75.39 36.09 75.581.028 0 .055.004.086.004 6.606 0 19.918-9.918 35.422-75.671a3.454 3.454 0 0 1 4.14-2.563 3.444 3.444 0 0 1 2.56 4.145c-13.012 55.218-26.403 80.972-42.106 80.972zM418.465 214.52a3.443 3.443 0 0 1-3.133-2.012c-10.562-23.055-16.934-53.25-17.195-54.528a3.443 3.443 0 0 1 2.668-4.074 3.444 3.444 0 0 1 4.07 2.668c.066.305 6.48 30.727 16.719 53.07a3.446 3.446 0 0 1-3.13 4.876zm0 0"
                      data-original="#ffd7e5"
                    ></path>
                    <g fill="#fa759e">
                      <path
                        d="M58.543 160.441a2.786 2.786 0 0 1-2.703-2.144c-10.34-43.84-19.031-48.598-22.38-48.434-8.769.114-18.593 28.348-22.769 48.364a2.78 2.78 0 0 1-3.293 2.152 2.782 2.782 0 0 1-2.156-3.285c1.832-8.781 11.801-52.582 28.14-52.793h.13c10.445 0 19.265 16.758 27.742 52.719a2.787 2.787 0 0 1-2.07 3.347c-.211.043-.426.074-.641.074zM160.938 162.29a2.783 2.783 0 0 1-2.708-2.145c-10.289-43.645-19.015-48.434-22.335-48.434h-.043c-8.766.113-18.59 28.348-22.766 48.363a2.785 2.785 0 0 1-3.293 2.153 2.779 2.779 0 0 1-2.156-3.286c1.832-8.78 11.8-52.582 28.14-52.793h.125c10.446 0 19.266 16.758 27.743 52.72a2.787 2.787 0 0 1-2.708 3.421zM262.09 158.516a2.783 2.783 0 0 1-2.707-2.145c-10.336-43.836-19.106-48.496-22.38-48.43-8.769.114-18.593 28.348-22.769 48.364a2.771 2.771 0 0 1-3.289 2.152 2.783 2.783 0 0 1-2.156-3.289c1.832-8.781 11.8-52.578 28.14-52.793h.126c10.445 0 19.265 16.762 27.742 52.723a2.787 2.787 0 0 1-2.07 3.347c-.211.047-.426.07-.637.07zM364.227 162.29a2.782 2.782 0 0 1-2.704-2.145c-10.336-43.836-19.109-48.497-22.378-48.434-8.77.117-18.594 28.348-22.77 48.363-.316 1.504-1.79 2.477-3.29 2.153a2.776 2.776 0 0 1-2.155-3.286c1.832-8.78 11.797-52.582 28.136-52.793h.13c10.445 0 19.265 16.758 27.741 52.72a2.787 2.787 0 0 1-2.71 3.421zm0 0"
                        fill="#fa759e"
                        data-original="#fa759e"
                      ></path>
                      <path
                        d="M85.328 214.098H85.2c-16.344-.215-26.308-44.012-28.14-52.793a2.781 2.781 0 0 1 2.152-3.29 2.774 2.774 0 0 1 3.293 2.153c4.18 20.012 14.008 48.254 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.43.352-1.492 1.852-2.41 3.344-2.07a2.781 2.781 0 0 1 2.067 3.348c-8.473 35.957-17.29 52.719-27.735 52.719zM186.48 211.016h-.128c-16.344-.211-26.309-44.012-28.141-52.793a2.775 2.775 0 0 1 2.152-3.286 2.774 2.774 0 0 1 3.293 2.153c4.18 20.012 14.008 48.25 22.77 48.363h.043c3.32 0 12.043-4.789 22.336-48.433.351-1.497 1.847-2.407 3.343-2.067a2.781 2.781 0 0 1 2.067 3.348c-8.473 35.953-17.29 52.715-27.735 52.715zM288.71 211.512h-.124c-16.348-.211-26.309-44.012-28.14-52.793a2.775 2.775 0 0 1 2.152-3.285 2.767 2.767 0 0 1 3.289 2.152c4.18 20.012 14.008 48.25 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.433.352-1.493 1.852-2.407 3.344-2.067a2.784 2.784 0 0 1 2.07 3.348c-8.476 35.957-17.293 52.715-27.738 52.715zM390.04 214.098h-.13c-16.344-.215-26.305-44.012-28.137-52.793a2.781 2.781 0 0 1 2.153-3.29 2.77 2.77 0 0 1 3.289 2.153c4.18 20.012 14.008 48.254 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.43.352-1.492 1.852-2.41 3.344-2.07a2.784 2.784 0 0 1 2.07 3.348c-8.472 35.957-17.293 52.719-27.738 52.719zm0 0"
                        fill="#fa759e"
                        data-original="#fa759e"
                      ></path>
                    </g>
                    <path
                      fill="#0089ef"
                      d="M109.383 159.227a3.72 3.72 0 0 1-3.613-2.864C85.527 70.52 67.855 57.57 59.055 57.57h-.114c-19.707.258-39.636 60.672-47.57 98.7a3.72 3.72 0 0 1-7.281-1.523C6.316 144.085 26.758 50.542 58.844 50.128h.218c19.723 0 37.368 34.191 53.946 104.523a3.725 3.725 0 0 1-2.766 4.477 3.791 3.791 0 0 1-.86.098zM315.18 159.227a3.728 3.728 0 0 1-3.618-2.864c-20.238-85.843-37.91-98.793-46.71-98.793h-.118c-19.703.258-39.629 60.672-47.566 98.7a3.718 3.718 0 0 1-4.398 2.878 3.725 3.725 0 0 1-2.887-4.402c2.23-10.66 22.668-104.203 54.754-104.617h.218c19.715 0 37.36 34.191 53.946 104.523a3.725 3.725 0 0 1-2.766 4.477c-.281.066-.57.098-.855.098zm0 0"
                      data-original="#0089ef"
                    ></path>
                    <path
                      fill="#0089ef"
                      d="M163.2 266.344h-.22c-32.085-.414-52.527-93.957-54.757-104.621a3.719 3.719 0 0 1 2.886-4.399 3.719 3.719 0 0 1 4.399 2.88c7.941 38.023 27.875 98.444 47.566 98.694h.117c8.805 0 26.473-12.941 46.711-98.789.473-1.996 2.48-3.222 4.473-2.77a3.72 3.72 0 0 1 2.766 4.477c-16.578 70.332-34.227 104.528-53.942 104.528zM366.52 263.59h-.22c-32.085-.418-52.527-93.957-54.757-104.621a3.722 3.722 0 0 1 7.285-1.52c7.942 38.024 27.875 98.442 47.567 98.696h.117c8.804 0 26.472-12.946 46.71-98.793.473-1.997 2.481-3.22 4.473-2.766a3.712 3.712 0 0 1 2.766 4.473c-16.578 70.332-34.227 104.53-53.941 104.53zm0 0"
                      data-original="#0089ef"
                    ></path>
                    <path
                      fill="#3a2c60"
                      d="M413.922.46H12c-6.617 0-12 5.384-12 12v291.563c0 6.618 5.383 12 12 12h401.922c6.613 0 12-5.382 12-12v-186.68a4 4 0 0 0-8 0v36.891H347.48c-4.59-24.863-24.406-125.324-48.168-145.773h114.61c2.203 0 4 1.793 4 4v43.887a4 4 0 0 0 8 0V12.46c0-6.621-5.383-12-12-12zm-73.785 161.774c5.68 24.524 30.27 125.305 54.957 145.786H185.695c23.77-20.45 43.586-120.926 48.172-145.786zM177.379 303.711c-13.977 0-38.84-71.418-55.192-141.477h103.54c-13.016 70.028-34.454 141.477-48.348 141.477zm-65.395-149.477H8.445C21.508 84.214 42.988 12.766 56.88 12.766c13.973 0 38.793 71.418 55.105 141.468zM12 8.461h36.559C31.758 22.92 16.895 77.34 8 116.828V12.461c0-2.207 1.793-4 4-4zM8 304.02V162.234h105.973c5.68 24.524 30.27 125.305 54.957 145.786H12c-2.207 0-4-1.793-4-4zm405.922 4h-1.527c1.917-1.641 3.785-3.86 5.527-6.778v2.778c0 2.207-1.797 4-4 4zm4-32.86c-3.219 20.938-10.356 28.55-14.379 28.55-13.977 0-38.84-71.417-55.191-141.476h69.562V275.16zM339.34 154.234H235.805c16.347-70.05 41.21-141.468 55.187-141.468 13.895 0 35.332 71.449 48.348 141.468zm-111.754 0H120.199C114.531 129.7 90.004 28.945 65.336 8.461H282.53c-24.676 20.488-49.261 121.246-54.945 145.773zm0 0"
                      data-original="#3a2c60"
                      className=""
                    ></path>
                    <path
                      fill="#3a2c60"
                      d="M421.922 67.844c-2.211 0-4 1.789-4 4v29a4 4 0 0 0 8 0v-29c0-2.207-1.793-4-4-4zm0 0"
                      data-original="#3a2c60"
                      className=""
                    ></path>
                  </g>
                </svg>
                <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
              </div>
            ) : type == 2 ? (
              <div className="relative group h-fit">
                <label
                  className={
                    carrierFrequency
                      ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs"
                      : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
                  }
                >
                  Duty Cycle(0-50)
                </label>
                <input
                  type="number"
                  name="Frequency"
                  value={dutyCycle}
                  onChange={(e) => setDCycle(e.target.value)}
                  className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 441.92 441"
                  className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                >
                  <g>
                    <path
                      fill="#e6e7e8"
                      d="M429.922 16.46H28c-6.617 0-12 5.384-12 12v291.563c0 6.618 5.383 12 12 12h401.922c6.613 0 12-5.382 12-12V28.461c0-6.621-5.383-12-12-12zm0 0"
                      data-original="#e6e7e8"
                    ></path>
                    <path
                      fill="#ffffff"
                      d="M421.922 12.46v291.56c0 4.421-3.582 8-8 8H12c-4.422 0-8-3.579-8-8V12.46c0-4.42 3.578-8 8-8h401.922c4.418 0 8 3.58 8 8zm0 0"
                      data-original="#ffffff"
                    ></path>
                    <path
                      fill="#d4fbff"
                      d="M4 304.02c0 4.417 3.578 8 8 8h401.922a8 8 0 0 0 8-8V16.46H4zm0 0"
                      data-original="#d4fbff"
                      className=""
                    ></path>
                    <path
                      fill="#ffd7e5"
                      d="M85.668 162.832a3.445 3.445 0 0 1-3.348-2.652C66.746 94.14 53.313 84.574 46.81 84.508c-14.844.191-30.016 46.465-36.094 75.586-.39 1.863-2.219 3.062-4.07 2.668a3.446 3.446 0 0 1-2.668-4.075c1.722-8.261 17.57-80.738 42.742-81.062h.187c15.711 0 29.094 25.742 42.117 80.977a3.441 3.441 0 0 1-3.355 4.23zM244.223 165.695a3.448 3.448 0 0 1-3.348-2.652c-15.504-65.746-28.816-75.672-35.422-75.672-.027 0-.058.004-.086.004-14.844.191-30.012 46.46-36.09 75.582-.394 1.863-2.222 3.066-4.074 2.668a3.446 3.446 0 0 1-2.668-4.074c1.727-8.262 17.574-80.738 42.746-81.059 15.938-.16 29.227 25.524 42.297 80.973a3.447 3.447 0 0 1-2.558 4.144 3.686 3.686 0 0 1-.797.086zM400.871 159.86a3.445 3.445 0 0 1-3.348-2.653c-15.503-65.746-28.816-75.672-35.421-75.672-.032 0-.059.004-.086.004-14.844.191-30.012 46.461-36.09 75.582-.39 1.863-2.223 3.063-4.074 2.668a3.446 3.446 0 0 1-2.668-4.074c1.722-8.262 17.574-80.738 42.746-81.059 15.699-.289 29.226 25.524 42.297 80.973a3.447 3.447 0 0 1-2.559 4.144c-.27.059-.531.086-.797.086zm0 0"
                      data-original="#ffd7e5"
                    ></path>
                    <path
                      fill="#ffd7e5"
                      d="M125.715 241.824c-.063 0-.121-.004-.192-.004-25.761-.324-41.984-72.797-43.75-81.058-.398-1.864.825-3.688 2.73-4.075 1.903-.386 3.774.805 4.169 2.668 6.223 29.122 21.762 75.391 36.945 75.583l.086.003c6.766 0 20.395-9.918 36.262-75.671.441-1.848 2.344-2.985 4.238-2.563 1.899.438 3.07 2.293 2.621 4.145-13.328 55.218-27.031 80.972-43.11 80.972zM283.79 241.824c-.067 0-.126-.004-.188-.004-25.172-.324-41.024-72.797-42.747-81.058a3.444 3.444 0 0 1 6.742-1.406c6.079 29.12 21.255 75.39 36.09 75.581.028 0 .055.004.086.004 6.606 0 19.918-9.918 35.422-75.671a3.454 3.454 0 0 1 4.14-2.563 3.444 3.444 0 0 1 2.56 4.145c-13.012 55.218-26.403 80.972-42.106 80.972zM418.465 214.52a3.443 3.443 0 0 1-3.133-2.012c-10.562-23.055-16.934-53.25-17.195-54.528a3.443 3.443 0 0 1 2.668-4.074 3.444 3.444 0 0 1 4.07 2.668c.066.305 6.48 30.727 16.719 53.07a3.446 3.446 0 0 1-3.13 4.876zm0 0"
                      data-original="#ffd7e5"
                    ></path>
                    <g fill="#fa759e">
                      <path
                        d="M58.543 160.441a2.786 2.786 0 0 1-2.703-2.144c-10.34-43.84-19.031-48.598-22.38-48.434-8.769.114-18.593 28.348-22.769 48.364a2.78 2.78 0 0 1-3.293 2.152 2.782 2.782 0 0 1-2.156-3.285c1.832-8.781 11.801-52.582 28.14-52.793h.13c10.445 0 19.265 16.758 27.742 52.719a2.787 2.787 0 0 1-2.07 3.347c-.211.043-.426.074-.641.074zM160.938 162.29a2.783 2.783 0 0 1-2.708-2.145c-10.289-43.645-19.015-48.434-22.335-48.434h-.043c-8.766.113-18.59 28.348-22.766 48.363a2.785 2.785 0 0 1-3.293 2.153 2.779 2.779 0 0 1-2.156-3.286c1.832-8.78 11.8-52.582 28.14-52.793h.125c10.446 0 19.266 16.758 27.743 52.72a2.787 2.787 0 0 1-2.708 3.421zM262.09 158.516a2.783 2.783 0 0 1-2.707-2.145c-10.336-43.836-19.106-48.496-22.38-48.43-8.769.114-18.593 28.348-22.769 48.364a2.771 2.771 0 0 1-3.289 2.152 2.783 2.783 0 0 1-2.156-3.289c1.832-8.781 11.8-52.578 28.14-52.793h.126c10.445 0 19.265 16.762 27.742 52.723a2.787 2.787 0 0 1-2.07 3.347c-.211.047-.426.07-.637.07zM364.227 162.29a2.782 2.782 0 0 1-2.704-2.145c-10.336-43.836-19.109-48.497-22.378-48.434-8.77.117-18.594 28.348-22.77 48.363-.316 1.504-1.79 2.477-3.29 2.153a2.776 2.776 0 0 1-2.155-3.286c1.832-8.78 11.797-52.582 28.136-52.793h.13c10.445 0 19.265 16.758 27.741 52.72a2.787 2.787 0 0 1-2.71 3.421zm0 0"
                        fill="#fa759e"
                        data-original="#fa759e"
                      ></path>
                      <path
                        d="M85.328 214.098H85.2c-16.344-.215-26.308-44.012-28.14-52.793a2.781 2.781 0 0 1 2.152-3.29 2.774 2.774 0 0 1 3.293 2.153c4.18 20.012 14.008 48.254 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.43.352-1.492 1.852-2.41 3.344-2.07a2.781 2.781 0 0 1 2.067 3.348c-8.473 35.957-17.29 52.719-27.735 52.719zM186.48 211.016h-.128c-16.344-.211-26.309-44.012-28.141-52.793a2.775 2.775 0 0 1 2.152-3.286 2.774 2.774 0 0 1 3.293 2.153c4.18 20.012 14.008 48.25 22.77 48.363h.043c3.32 0 12.043-4.789 22.336-48.433.351-1.497 1.847-2.407 3.343-2.067a2.781 2.781 0 0 1 2.067 3.348c-8.473 35.953-17.29 52.715-27.735 52.715zM288.71 211.512h-.124c-16.348-.211-26.309-44.012-28.14-52.793a2.775 2.775 0 0 1 2.152-3.285 2.767 2.767 0 0 1 3.289 2.152c4.18 20.012 14.008 48.25 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.433.352-1.493 1.852-2.407 3.344-2.067a2.784 2.784 0 0 1 2.07 3.348c-8.476 35.957-17.293 52.715-27.738 52.715zM390.04 214.098h-.13c-16.344-.215-26.305-44.012-28.137-52.793a2.781 2.781 0 0 1 2.153-3.29 2.77 2.77 0 0 1 3.289 2.153c4.18 20.012 14.008 48.254 22.77 48.363h.042c3.32 0 12.043-4.789 22.336-48.43.352-1.492 1.852-2.41 3.344-2.07a2.784 2.784 0 0 1 2.07 3.348c-8.472 35.957-17.293 52.719-27.738 52.719zm0 0"
                        fill="#fa759e"
                        data-original="#fa759e"
                      ></path>
                    </g>
                    <path
                      fill="#0089ef"
                      d="M109.383 159.227a3.72 3.72 0 0 1-3.613-2.864C85.527 70.52 67.855 57.57 59.055 57.57h-.114c-19.707.258-39.636 60.672-47.57 98.7a3.72 3.72 0 0 1-7.281-1.523C6.316 144.085 26.758 50.542 58.844 50.128h.218c19.723 0 37.368 34.191 53.946 104.523a3.725 3.725 0 0 1-2.766 4.477 3.791 3.791 0 0 1-.86.098zM315.18 159.227a3.728 3.728 0 0 1-3.618-2.864c-20.238-85.843-37.91-98.793-46.71-98.793h-.118c-19.703.258-39.629 60.672-47.566 98.7a3.718 3.718 0 0 1-4.398 2.878 3.725 3.725 0 0 1-2.887-4.402c2.23-10.66 22.668-104.203 54.754-104.617h.218c19.715 0 37.36 34.191 53.946 104.523a3.725 3.725 0 0 1-2.766 4.477c-.281.066-.57.098-.855.098zm0 0"
                      data-original="#0089ef"
                    ></path>
                    <path
                      fill="#0089ef"
                      d="M163.2 266.344h-.22c-32.085-.414-52.527-93.957-54.757-104.621a3.719 3.719 0 0 1 2.886-4.399 3.719 3.719 0 0 1 4.399 2.88c7.941 38.023 27.875 98.444 47.566 98.694h.117c8.805 0 26.473-12.941 46.711-98.789.473-1.996 2.48-3.222 4.473-2.77a3.72 3.72 0 0 1 2.766 4.477c-16.578 70.332-34.227 104.528-53.942 104.528zM366.52 263.59h-.22c-32.085-.418-52.527-93.957-54.757-104.621a3.722 3.722 0 0 1 7.285-1.52c7.942 38.024 27.875 98.442 47.567 98.696h.117c8.804 0 26.472-12.946 46.71-98.793.473-1.997 2.481-3.22 4.473-2.766a3.712 3.712 0 0 1 2.766 4.473c-16.578 70.332-34.227 104.53-53.941 104.53zm0 0"
                      data-original="#0089ef"
                    ></path>
                    <path
                      fill="#3a2c60"
                      d="M413.922.46H12c-6.617 0-12 5.384-12 12v291.563c0 6.618 5.383 12 12 12h401.922c6.613 0 12-5.382 12-12v-186.68a4 4 0 0 0-8 0v36.891H347.48c-4.59-24.863-24.406-125.324-48.168-145.773h114.61c2.203 0 4 1.793 4 4v43.887a4 4 0 0 0 8 0V12.46c0-6.621-5.383-12-12-12zm-73.785 161.774c5.68 24.524 30.27 125.305 54.957 145.786H185.695c23.77-20.45 43.586-120.926 48.172-145.786zM177.379 303.711c-13.977 0-38.84-71.418-55.192-141.477h103.54c-13.016 70.028-34.454 141.477-48.348 141.477zm-65.395-149.477H8.445C21.508 84.214 42.988 12.766 56.88 12.766c13.973 0 38.793 71.418 55.105 141.468zM12 8.461h36.559C31.758 22.92 16.895 77.34 8 116.828V12.461c0-2.207 1.793-4 4-4zM8 304.02V162.234h105.973c5.68 24.524 30.27 125.305 54.957 145.786H12c-2.207 0-4-1.793-4-4zm405.922 4h-1.527c1.917-1.641 3.785-3.86 5.527-6.778v2.778c0 2.207-1.797 4-4 4zm4-32.86c-3.219 20.938-10.356 28.55-14.379 28.55-13.977 0-38.84-71.417-55.191-141.476h69.562V275.16zM339.34 154.234H235.805c16.347-70.05 41.21-141.468 55.187-141.468 13.895 0 35.332 71.449 48.348 141.468zm-111.754 0H120.199C114.531 129.7 90.004 28.945 65.336 8.461H282.53c-24.676 20.488-49.261 121.246-54.945 145.773zm0 0"
                      data-original="#3a2c60"
                      className=""
                    ></path>
                    <path
                      fill="#3a2c60"
                      d="M421.922 67.844c-2.211 0-4 1.789-4 4v29a4 4 0 0 0 8 0v-29c0-2.207-1.793-4-4-4zm0 0"
                      data-original="#3a2c60"
                      className=""
                    ></path>
                  </g>
                </svg>
                <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
              </div>
            ) : (
              <></>
            )}
            */}
          {/* {type == 3 ? (
            <div className="relative group h-fit">
            <label
            className={
              signalDuration
              ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs"
              : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
            }
            >
            Pulse Position(0-1)
            </label>
            <input
            type="number"
            name="Duration"
            value={pulsePosition}
            onChange={(e) => setPposition(e.target.value)}
            className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
            required
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                >
                <g>
                <g data-name="Layer 2">
                <path
                fill="#fdfeff"
                d="M18 2.25H6a.76.76 0 0 0-.75.75v3a5.75 5.75 0 0 0 2.42 4.68 1.3 1.3 0 0 1 .58 1.05v.54a1.3 1.3 0 0 1-.58 1.05A5.75 5.75 0 0 0 5.25 18v3a.76.76 0 0 0 .75.75h12a.76.76 0 0 0 .75-.75v-3a5.75 5.75 0 0 0-2.42-4.68 1.3 1.3 0 0 1-.58-1.05v-.54a1.3 1.3 0 0 1 .58-1.05A5.75 5.75 0 0 0 18.75 6V3a.76.76 0 0 0-.75-.75z"
                data-original="#fdfeff"
                      className=""
                      ></path>
                    <g fill="#004fac">
                    <path
                    d="M18 22.75H6a.76.76 0 0 1-.75-.75v-4a5.75 5.75 0 0 1 2.42-4.68 1.3 1.3 0 0 0 .58-1.05v-.54a1.3 1.3 0 0 0-.58-1.05A5.75 5.75 0 0 1 5.25 6V2A.76.76 0 0 1 6 1.25h12a.75.75 0 0 1 0 1.5H6.75V6a4.26 4.26 0 0 0 1.79 3.46 2.78 2.78 0 0 1 1.21 2.27v.54a2.78 2.78 0 0 1-1.21 2.27A4.26 4.26 0 0 0 6.75 18v3.25h10.5V18a4.26 4.26 0 0 0-1.79-3.46 2.78 2.78 0 0 1-1.21-2.27v-.54a2.78 2.78 0 0 1 1.21-2.27A4.26 4.26 0 0 0 17.25 6V5a.75.75 0 0 1 1.5 0v1a5.75 5.75 0 0 1-2.42 4.68 1.3 1.3 0 0 0-.58 1.05v.54a1.3 1.3 0 0 0 .58 1.05A5.75 5.75 0 0 1 18.75 18v4a.76.76 0 0 1-.75.75z"
                    fill="#004fac"
                    data-original="#004fac"
                      ></path>
                      <path
                        d="M20 2.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5zM20 22.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5z"
                        fill="#004fac"
                        data-original="#004fac"
                        ></path>
                        </g>
                        <path
                        fill="#3e96ed"
                        d="M9 20h6a1 1 0 0 0 1-1v-1.17a2 2 0 0 0-.59-1.42l-2.7-2.7a1 1 0 0 0-1.42 0l-2.7 2.7A2 2 0 0 0 8 17.83V19a1 1 0 0 0 1 1z"
                        data-original="#3e96ed"
                        ></path>
                        </g>
                        </g>
                        </svg>
                        <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
                        </div>
                        ) : type == 4 ? (
            <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
              <label>Enter comma-separated values:</label>
              <input
              type="text"
                value={inputValue}
                onChange={handleInputChange}
                />
                <div className="relative group h-fit">
                <label
                className={
                  signalDuration
                  ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs"
                  : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
                }
                >
                  Step Size(0-1)
                  </label>
                  <input
                  type="number"
                  name="Duration"
                  value={stepSize}
                  onChange={(e) => setStepSize(e.target.value)}
                  className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
                  required
                  />
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                >
                  <g>
                    <g data-name="Layer 2">
                      <path
                        fill="#fdfeff"
                        d="M18 2.25H6a.76.76 0 0 0-.75.75v3a5.75 5.75 0 0 0 2.42 4.68 1.3 1.3 0 0 1 .58 1.05v.54a1.3 1.3 0 0 1-.58 1.05A5.75 5.75 0 0 0 5.25 18v3a.76.76 0 0 0 .75.75h12a.76.76 0 0 0 .75-.75v-3a5.75 5.75 0 0 0-2.42-4.68 1.3 1.3 0 0 1-.58-1.05v-.54a1.3 1.3 0 0 1 .58-1.05A5.75 5.75 0 0 0 18.75 6V3a.76.76 0 0 0-.75-.75z"
                        data-original="#fdfeff"
                        className=""
                        ></path>
                        <g fill="#004fac">
                        <path
                        d="M18 22.75H6a.76.76 0 0 1-.75-.75v-4a5.75 5.75 0 0 1 2.42-4.68 1.3 1.3 0 0 0 .58-1.05v-.54a1.3 1.3 0 0 0-.58-1.05A5.75 5.75 0 0 1 5.25 6V2A.76.76 0 0 1 6 1.25h12a.75.75 0 0 1 0 1.5H6.75V6a4.26 4.26 0 0 0 1.79 3.46 2.78 2.78 0 0 1 1.21 2.27v.54a2.78 2.78 0 0 1-1.21 2.27A4.26 4.26 0 0 0 6.75 18v3.25h10.5V18a4.26 4.26 0 0 0-1.79-3.46 2.78 2.78 0 0 1-1.21-2.27v-.54a2.78 2.78 0 0 1 1.21-2.27A4.26 4.26 0 0 0 17.25 6V5a.75.75 0 0 1 1.5 0v1a5.75 5.75 0 0 1-2.42 4.68 1.3 1.3 0 0 0-.58 1.05v.54a1.3 1.3 0 0 0 .58 1.05A5.75 5.75 0 0 1 18.75 18v4a.76.76 0 0 1-.75.75z"
                        fill="#004fac"
                        data-original="#004fac"
                        ></path>
                        <path
                        d="M20 2.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5zM20 22.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5z"
                        fill="#004fac"
                        data-original="#004fac"
                        ></path>
                        </g>
                        <path
                        fill="#3e96ed"
                        d="M9 20h6a1 1 0 0 0 1-1v-1.17a2 2 0 0 0-.59-1.42l-2.7-2.7a1 1 0 0 0-1.42 0l-2.7 2.7A2 2 0 0 0 8 17.83V19a1 1 0 0 0 1 1z"
                        data-original="#3e96ed"
                        ></path>
                        </g>
                        </g>
                        </svg>
                        <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
                        </div>
                        </form>
                        ) : type == 5 ? (
            <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
              <label>Enter comma-separated values:</label>
              <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              />
              <div className="relative group h-fit">
              <label
              className={
                signalDuration
                ? "absolute top-[-16px] translate-y-[0] left-[0px] text-xs"
                : "absolute top-[50%] translate-y-[-50%] left-[2px] group-focus-within:text-xs group-focus-within:top-[-16px] group-focus-within:translate-y-[0] group-focus-within:left-0 transition-all duration-300 delay-75 "
              }
              >
              NUmber of Bits
              </label>
              <input
                  type="number"
                  name="Duration"
                  value={numberOfBits}
                  onChange={(e) => setNO(e.target.value)}
                  className="text-black h-8 rounded-md p-6 px-4 focus-within:outline-none bg-gray-200"
                  required
                  />
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  className=" w-10 h-5  absolute top-[50%] translate-y-[-50%] right-[2px] "
                  >
                  <g>
                  <g data-name="Layer 2">
                  <path
                  fill="#fdfeff"
                  d="M18 2.25H6a.76.76 0 0 0-.75.75v3a5.75 5.75 0 0 0 2.42 4.68 1.3 1.3 0 0 1 .58 1.05v.54a1.3 1.3 0 0 1-.58 1.05A5.75 5.75 0 0 0 5.25 18v3a.76.76 0 0 0 .75.75h12a.76.76 0 0 0 .75-.75v-3a5.75 5.75 0 0 0-2.42-4.68 1.3 1.3 0 0 1-.58-1.05v-.54a1.3 1.3 0 0 1 .58-1.05A5.75 5.75 0 0 0 18.75 6V3a.76.76 0 0 0-.75-.75z"
                  data-original="#fdfeff"
                  className=""
                  ></path>
                  <g fill="#004fac">
                  <path
                  d="M18 22.75H6a.76.76 0 0 1-.75-.75v-4a5.75 5.75 0 0 1 2.42-4.68 1.3 1.3 0 0 0 .58-1.05v-.54a1.3 1.3 0 0 0-.58-1.05A5.75 5.75 0 0 1 5.25 6V2A.76.76 0 0 1 6 1.25h12a.75.75 0 0 1 0 1.5H6.75V6a4.26 4.26 0 0 0 1.79 3.46 2.78 2.78 0 0 1 1.21 2.27v.54a2.78 2.78 0 0 1-1.21 2.27A4.26 4.26 0 0 0 6.75 18v3.25h10.5V18a4.26 4.26 0 0 0-1.79-3.46 2.78 2.78 0 0 1-1.21-2.27v-.54a2.78 2.78 0 0 1 1.21-2.27A4.26 4.26 0 0 0 17.25 6V5a.75.75 0 0 1 1.5 0v1a5.75 5.75 0 0 1-2.42 4.68 1.3 1.3 0 0 0-.58 1.05v.54a1.3 1.3 0 0 0 .58 1.05A5.75 5.75 0 0 1 18.75 18v4a.76.76 0 0 1-.75.75z"
                  fill="#004fac"
                  data-original="#004fac"
                  ></path>
                  <path
                  d="M20 2.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5zM20 22.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5z"
                  fill="#004fac"
                  data-original="#004fac"
                  ></path>
                  </g>
                  <path
                  fill="#3e96ed"
                  d="M9 20h6a1 1 0 0 0 1-1v-1.17a2 2 0 0 0-.59-1.42l-2.7-2.7a1 1 0 0 0-1.42 0l-2.7 2.7A2 2 0 0 0 8 17.83V19a1 1 0 0 0 1 1z"
                  data-original="#3e96ed"
                  ></path>
                  </g>
                  </g>
                  </svg>
                  <div className="w-0 bg-[#33D7E6] h-[2px] group-focus-within:w-full transition-all duration-300 delay-75"></div>
                  </div>
                  </form>
                  ) : (
                    <></>
                  )} */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Page;
