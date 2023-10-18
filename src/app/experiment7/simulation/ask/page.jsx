"use client";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import dynamic from "next/dynamic";
import styles from "./ask.module.css";

const ASKModulation = () => {
  const DynamicPlot = dynamic(() => import("react-plotly.js"), {
    ssr: false, // Prevents server-side rendering
  });
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const openModal1 = () => {
    setIsModalOpen1(true);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };
  const openModal3 = () => {
    setIsModalOpen3(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
  };

  const [duration, setDuration] = useState(3);
  const [pulseWidth, setPulseWidth] = useState(0.6);
  const [messageFrequency, setMessageFrequency] = useState(10);
  const [askSignal, setASKSignal] = useState([]);
  const [messageAmplitude, setMessageAmplitude] = useState(1);
  const [messageSignal, setMessageSignal] = useState([]);
  const [pulseSignal, setPulseSignal] = useState([]);

  const sampleRate = 1000;
  const time = Array.from(
    { length: sampleRate * duration },
    (_, i) => i / sampleRate
  );
  useEffect(() => {
    const mS = time.map(
      (t) => messageAmplitude * Math.sin(2 * Math.PI * messageFrequency * t)
    );
    setMessageSignal(mS);
  }, [messageFrequency]);

  useEffect(() => {
    const pS = time.map((t) => (t % 1 < pulseWidth ? 1 : 0));
    setPulseSignal(pS);
  }, [pulseWidth]);

  useEffect(() => {
    const askSignal = messageSignal.map((msg, i) => msg * pulseSignal[i]);
    setASKSignal(askSignal);
  }, [messageSignal, pulseSignal]);

  return (
    <div>
      <div className={styles.backgroundDiv}>
        <button
          onClick={openModal1}
          className="absolute left-[5vw] top-[19vh] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Change Digital Signal
        </button>
        <button
          onClick={openModal2}
          className="absolute left-[32vw] top-[52vh] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Change Carrier Signal
        </button>
        <button
          onClick={openModal3}
          className="absolute right-[3vw] top-[19vh] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Check Output
        </button>
      </div>
      <div
        onClick={() => (window.location = "/experiment7/simulation")}
        className="cursor-pointer hover:bg-blue-300 py-2 px-5 rounded text-center border border-blue-500 bg-blue-200"
      >
        Go Back
      </div>

      {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-50"
            onClick={closeModal1}
          ></div>

          <div className="modal-container bg-white w-70vw  mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Digital Signal</p>
                <button
                  className="modal-close cursor-pointer z-50"
                  onClick={closeModal1}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M1 1l16 16M1 17L17 1"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <p>Modal Content Goes Here</p> */}
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
              <input
                id="steps-range"
                type="range"
                min="5"
                max="15"
                value={messageFrequency}
                onChange={(e) => setMessageFrequency(e.target.value)}
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="mt-4">
                <button
                  onClick={closeModal1}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-50"
            onClick={closeModal2}
          ></div>

          <div className="modal-container bg-white w-70vw  mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Carrier Signal</p>
                <button
                  className="modal-close cursor-pointer z-50"
                  onClick={closeModal2}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M1 1l16 16M1 17L17 1"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <p>Modal Content Goes Here</p> */}
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
              <input
                id="steps-range"
                type="range"
                min="0.1"
                max="0.9"
                value={pulseWidth}
                onChange={(e) => setPulseWidth(e.target.value)}
                step="0.1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="mt-4">
                <button
                  onClick={closeModal2}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen3 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-50"
            onClick={closeModal3}
          ></div>

          <div className="modal-container bg-white w-70vw  mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">ASK Output</p>
                <button
                  className="modal-close cursor-pointer z-50"
                  onClick={closeModal3}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M1 1l16 16M1 17L17 1"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <p>Modal Content Goes Here</p> */}
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
              <div className="mt-4">
                <button
                  onClick={closeModal3}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ASKModulation;
