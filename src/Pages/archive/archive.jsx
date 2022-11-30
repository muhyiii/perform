import React from "react";
import User from "../../Component/User";

const Archive = () => {
  return (
    <div className="h-screen  relative overflow-hidden">
      <User />
      <div className="px-10 py-5 w-full h-full space-y-5">
        {/* <h1 className='text-5xl font-bold'>Archive </h1> */}
        <div className="h-1/6 flex space-x-6">
          {" "}
          <div className=" h-full rounded-lg w-1/2 bg-gray-200 text-center  shadow-lg">
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold">Archive</h1>
            </div>
          </div>
          <div className="h-full w-1/2 rounded-lg bg-gray-400 flex justify-center items-center shadow-lg">
            <p>Displaying an archives data that user cannot see it</p>
          </div>
        </div>
        <div className="h-1/3 rounded-lg w-full bg-slate-800 shadow-lg">
          <div className="flex items-center pl-40 h-full">
            <h1 className="text-white font-semibold text-4xl">Goals</h1>
          </div>
        </div>
        <div className="h-1/3 rounded-lg w-full bg-slate-600 shadow-lg">
          {" "}
          <div className="flex items-center pl-40 h-full">
            <h1 className="text-white font-semibold text-4xl">Measured Activity</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
