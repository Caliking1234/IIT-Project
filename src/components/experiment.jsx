// import React, { useState } from "react";

// const Experiment = () => {
//   const [Am, setAM] = useState < Number > 0;
//   const [Ac, setAC] = useState < Number > 0;
//   const [Fm, setFM] = useState < Number > 0;
//   const [Fc, setFC] = useState < Number > 0;

//   const SubmitHandler = (e) => {
//     e.preventDefault();
//     console.log(Am, Ac, Fm, Fc);
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => SubmitHandler(e)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-5"
//       >
//         <div>
//           <p className="text-xl font-bold">Message Signal</p>
//           <div>
//             <p className="font-semibold text-md">Message Signal Frequency:</p>
//             <input
//               className=""
//               placeholder=""
//               onChange={(e) => setFM(e.target.value)}
//             />
//           </div>
//           <div>
//             <p className="font-semibold text-md">Message Signal Amplitude:</p>
//             <input
//               className=""
//               placeholder=""
//               onChange={(e) => setAM(e.target.value)}
//             />
//           </div>
//         </div>
//         <div>
//           <p className="text-xl font-bold">Carrier Signal</p>
//           <div>
//             <p className="font-semibold text-md">Carrier Signal Frequency:</p>
//             <input
//               className=""
//               placeholder=""
//               onChange={(e) => setFC(e.target.value)}
//             />
//           </div>
//           <div>
//             <p className="font-semibold text-md">Carrier Signal Amplitude:</p>
//             <input
//               className=""
//               placeholder=""
//               onChange={(e) => setAC(e.target.value)}
//             />
//           </div>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Experiment;
