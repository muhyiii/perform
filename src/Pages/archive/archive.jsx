import React, { useState } from "react";
import User from "../../Component/User";
 
function Archive() {
  const [archive, setArchive] = useState("Period");
  const ChangeA = () => {
    setArchive("Archive");
  };
  const ChangeB = () => {
    setArchive("Period");
  };
 
  return (
    <div className="h-screen  relative overflow-hidden">
      <User />
      <div className="px-10 py-5 w-full h-full space-y-5">
        {/* <h1 className='text-5xl font-bold'>Archive </h1> */}
        <div className="h-1/6 flex space-x-6">
          {" "}
          <div
            onClick={() => ChangeA()}
            className={`h-full w-1/2  bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-gray-200 active:bg-gray-700 focus:outline-none focus:ring focus:ring-violet-300 flex justify-center rounded-xl items-center shadow-xl
            ${
              archive === "Archive" && "bg-gray-700 text-gray-200 outline-none"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold justify-start rounded-xl ">
                Archive
              </h1>
            </div>
          </div>
          <div
            onClick={() => ChangeB()}
            className={`h-full w-1/2  bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-gray-200 active:bg-gray-700 focus:outline-none focus:ring focus:ring-violet-300 flex justify-center rounded-xl items-center shadow-xl
            ${
              archive === "Period" && "bg-gray-700 text-gray-200 outline-none"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold justify-start rounded-xl ">
                Period
              </h1>
            </div>
          </div>
        </div>
        <button className="h-1/3 rounded-lg w-full bg-gray-800  text-gray-200 shadow-lg ">
          <div className="flex items-center pl-40 h-full">
            <h1 className="font-semibold text-4xl flex items-center"><div className="bg-gray-200 text-gray-800 py-2 m-2 px-5 rounded-xl">{archive}</div> of Goals </h1>
          </div>
        </button>
        <button className="h-1/3 rounded-lg w-full bg-gray-400  text-gray-700 shadow-lg ">
        <div className="flex items-center pl-40 h-full">
            <h1 className="font-semibold text-4xl flex items-center"><div className="bg-gray-800 text-gray-200 py-2 m-2 px-5 rounded-xl">{archive}</div> of Measured Activity </h1>
          </div>
        </button>
      </div>
    </div>
  );
}
 
export default Archive;
 

