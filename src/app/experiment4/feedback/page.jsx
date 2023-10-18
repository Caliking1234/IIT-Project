import React from "react";

const page = () => {
  return (
    <div>
      <div className="px-4 lg:px-24 h-full p-4 lg:p-24  items-center justify-center">
        <h1 className="text-4xl font-bold py-8">Feedback</h1>
        <p className="text-2xl font-semibold pb-4">Dear User,</p>
        <p className="text-xl">
          Thanks for using Virtual Labs. Your opinion is valuable to us. To help
          us improve, we&apos;d like to ask you a few questions about your
          experience. It will only take 3 minutes and your answers will help us
          make Virtual Labs better for you and other users.
        </p>

        <button className="my-12 px-12 border-blue-400 border-2 bg-blue-100 hover:bg-white text-blue-600 p-4 rounded-md">
          Share Your Experience
        </button>

        <p className="text-xl mt-6">Thanks for your time !</p>
        <p className="text-xl font-semibold">The Virtual Labs Team</p>
      </div>
    </div>
  );
};

export default page;
