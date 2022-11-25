// import React from "react";
// import { motion } from "framer-motion";

// const Prototype = () => {
//   return (
//     <div className="flex items-center justify-center h-screen w-screen">
//       <div className="relative">
//         <motion.div
//           className="w-20 h-20 bg-blue-500 absolute"
//           animate={{
//             borderRadius: ["70%", "50%", "80%", "60%"],
//             x: [150, -150, 0, 150],
//             y: [0, 0, -200, 0],
//           }}
//           //   initial={{ x: [150, -150], y: [0, 0] }}
//           transition={{
//             duration: 2,
//             ease: "easeInOut",
//             times: [0, 0.2, 0.5, 0.8, 1],
//             repeat: Infinity,
//             // repeatDelay: 1,
//           }}
//         ></motion.div>
//         <motion.div
//           className="w-20 h-20 bg-yellow-300 absolute"
//           animate={{
//             borderRadius: ["70%", "50%", "80%", "60%"],
//             x: [0, 150, -150, 0],
//             y: [-200, 0, 0, -200],
//           }}
//           //   initial={{ x: 0, y: -200 }}
//           transition={{
//             duration: 2,
//             ease: "easeInOut",
//             times: [0, 0.2, 0.5, 0.8, 1],
//             repeat: Infinity,
//             // repeatDelay: 1,
//           }}
//         ></motion.div>
//         <motion.div
//           className="w-20 h-20 bg-blue-500 absolute"
//           animate={{
//             borderRadius: ["70%", "50%", "80%", "60%"],
//             x: [-150, 0, 150, -150],
//             y: [0, -200, 0, 0],
//           }}
//           //   initial={{ x: [-150, 0], y: [0, -200] }}
//           transition={{
//             duration: 2,
//             ease: "easeInOut",
//             repeat: Infinity,
//             // repeatDelay: 1,
//           }}
//         ></motion.div>

//         <motion.div
//           className="triangle absolute   "
//           animate={{ rotate: [0,-180,0,-180] }}
//           transition={{
//             duration: 2,
//             ease: "easeInOut",
//             repeat: Infinity,
//             repeatDelay: 1,
//           }}
//         ></motion.div>
//         {/* <motion.div className="trianglee  absolute  "></motion.div> */}
//       </div>
//     </div>
//   );
// };

// export default Prototype;
