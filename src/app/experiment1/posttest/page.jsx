"use client";
import Subnavbar from "../../../components/Subnavbar";

import React, { useState } from 'react';

const links = [
  { label: "Aim", url: "/experiment1" },
  { label: "Theory", url: "/experiment1/theory" },
  { label: "Pretest", url: "/experiment1/pretest" },
  { label: "Procedure", url: "/experiment1/procedure" },
  { label: "Simulation", url: "/experiment1/simulation" },
  { label: "Posttest", url: "/experiment1/posttest" },
  { label: "References", url: "/experiment1/reference" },
  { label: "Feedback", url: "/experiment1/feedback" },

];

const questions = [
  {
    question: '1. What does PAM stand for in the context of communication systems?',
    options: [
      'Phase Amplitude Modulation',
      'Pulse Amplitude Modulation',
      'Periodic Amplitude Modulation',
      'Phase Angle Modulation',
    ],
    correctAnswer: 1,
  },
  {
    question: '2. In PAM, what is the primary characteristic that varies to represent the analog signal?',
    options: [
      'Pulse Width',
      'Pulse Frequency',
      'Pulse Amplitude',
      'Pulse Phase',
    ],
    correctAnswer: 2,
  },
  {
    question: '3. In PAM, the Nyquist theorem states that the sampling rate should be at least ________ times the highest frequency component of the signal.',
    options: ['2', '4', '8', '16'],
    correctAnswer: 0,
  },
  {
    question: '4. Which of the following is a disadvantage of Pulse Amplitude Modulation (PAM)?',
    options: [
      'High bandwidth efficiency',
      'Susceptible to noise',
      'Low power consumption',
      'Narrow bandwidth',
    ],
    correctAnswer: 1,
  },
  {
    question: '5. In PAM, if you increase the number of discrete amplitude levels used to represent the analog signal, what effect does it have on signal quality?',
    options: [
      'Decreases signal quality',
      'No effect on signal quality',
      'Increases signal quality',
      'Increases the bandwidth',
    ],
    correctAnswer: 2,
  },
];

function MCQTest() {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(-1)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (optionIndex, questionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setSelectedOptions(Array(questions.length).fill(-1));
    setIsCompleted(false);
  };


  return (
    <>
<Subnavbar links={links} />
   
    <div className="bg-gray-100 h-full p-4">
      <div className="w-full lg:px-24 mx-auto bg-white rounded-md shadow-md p-4">

        <h2 className="text-xl lg:text-4xl font-semibold my-6">Multiple Choice Questions</h2>
        {!isCompleted ? (
          <form onSubmit={(e) => e.preventDefault()}>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <p className="font-semibold mt-16">{question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 cursor-pointer ${
                      selectedOptions[questionIndex] === optionIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } rounded-md my-4 max-w-md`}
                    onClick={() => handleOptionSelect(optionIndex, questionIndex)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            ))}
             <button
              onClick={handleSubmit}
              className="my-6 px-12 w-[100%] border-blue-400 border-2 bg-blue-100 hover:bg-white text-blue-600 p-4 rounded-md"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-semibold">Test Completed</h2>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <p className="font-semibold">{question.question}</p>
                <p className="mt-2">
                  Your Answer: {question.options[selectedOptions[questionIndex]]}
                </p>
                <p className="mt-2">
                  Correct Answer: {question.options[question.correctAnswer]}
                </p>
              </div>
            ))}
            <p className="mt-4 border-2 px-6 font-bold mx-auto bg-yellow-200 border-red-400 rounded-md p-4 max-w-sm">
              Your Score: {selectedOptions.filter(
                (optionIndex, questionIndex) =>
                  optionIndex === questions[questionIndex].correctAnswer
              ).length}{' '}
              out of {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="my-6 px-12 w-[100%] border-green-400 border-2 bg-green-200 hover:bg-white text-green-600 hover:text-green-600 p-4 rounded-md"
            >
              Restart Test
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default MCQTest;
