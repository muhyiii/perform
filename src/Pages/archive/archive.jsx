import React, { useState } from "react";
import User from "../../Component/User";
import { motion } from "framer-motion";

function Archive() {
  const now = Date.now();
  const [state, setState] = useState({
    period: "",
    fromDate:
      new Date(now).getFullYear() +
      "-" +
      new Date(now).getDate() +
      "-" +
      new Date(now).getMonth(),
    toDate:
      new Date(now).getFullYear() +
      "-" +
      new Date(now).getMonth() +
      "-" +
      new Date(now).getDate(),
  });
  console.log(state.fromDate);
  const [archive, setArchive] = useState(true);
  const [isAddPeriod, setIsAddPeriod] = useState(false);

  return (
    <div className="h-screen  relative overflow-hidden">
      <User />
      <div className="px-10 py-5 w-full h-full space-y-5">
        {/* <h1 className='text-5xl font-bold'>Archive </h1> */}
        <div className="h-1/6 flex justify-between space-x-10">
          {" "}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setArchive(true)}
            className={`h-full outline-none  w-1/3   bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-gray-900 active:bg-gray-700  flex justify-center rounded-xl items-center shadow-xl
            ${archive && "bg-gray-700 text-gray-200 outline-none"}`}
          >
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold justify-start rounded-xl ">
                Archive
              </h1>
            </div>
          </motion.button>
          <p className="text-lg m-auto font-medium">
            Click {archive ? "Period" : "Archive"} to see{" "}
            {archive ? "Period" : "Archive"}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setArchive(false)}
            className={`h-full outline-none w-1/3   bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-gray-900 active:bg-gray-700  flex justify-center rounded-xl items-center shadow-xl
            ${!archive && "bg-gray-700 text-gray-200 outline-none"}`}
          >
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold justify-start rounded-xl ">
                Period
              </h1>
            </div>
          </motion.button>
        </div>
        {archive ? (
          <div className="h-full space-y-4">
            <button className="h-1/3 rounded-lg w-full bg-gray-800  text-gray-200 shadow-lg ">
              <div className="flex items-center pl-40 h-full">
                <h1 className="font-semibold text-4xl flex items-center">
                  <div className="bg-gray-200 text-gray-800 py-2 m-2 px-5 rounded-xl">
                    Archive
                  </div>{" "}
                  of Goals{" "}
                </h1>
              </div>
            </button>
            <button className="h-1/3 rounded-lg w-full bg-gray-400  text-gray-700 shadow-lg ">
              <div className="flex items-center pl-40 h-full">
                <h1 className="font-semibold text-4xl flex items-center">
                  <div className="bg-gray-800 text-gray-200 py-2 m-2 px-5 rounded-xl">
                    Archive
                  </div>{" "}
                  of Measured Activity{" "}
                </h1>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex ">
            <div className=" h-full col-span-2 w-3/12">
              <motion.button
                onClick={() => setIsAddPeriod(!isAddPeriod)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`bg-white outline-blue-400 px-3 py-1 outline-1 outline rounded-md hover:bg-blue-400 hover:shadow-md hover:text-white ${
                  isAddPeriod &&
                  "bg-blue-400 text-white shadow-lg outline-blue-400 outline"
                }`}
              >
                Add New Period
              </motion.button>
              {isAddPeriod && (
                <div className="space-y-5 mt-10  border px-1 py-10 rounded-md mr-5">
                  <p className="font-medium">Add new date of period</p>
                  <div>
                    <p className="text-xs">Title Period</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        setState({ ...state, period: e.target.value })
                      }
                      className="bg-slate-100 px-2 py-1 outline-none shadow-md"
                    />
                  </div>
                  <div>
                    <p className="text-xs">From Date</p>
                    <input
                      type="date"
                      value={`${state.fromDate}`}
                      onChange={(e) =>
                        setState({ ...state, fromDate: e.target.value })
                      }
                      className="bg-slate-100 border rounded px-2 py-1 outline-none shadow-md"
                    />
                  </div>
                  <div>
                    <p className="text-xs">To Date</p>
                    <input
                      type="date"
                      value={state.toDate}
                      onChange={(e) =>
                        setState({ ...state, toDate: e.target.value })
                      }
                      className="bg-slate-100 border rounded px-2 py-1 outline-none shadow-md"
                    />
                  </div>

                  <div>
                    <button className="bg-blue-400 ">Submit</button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-full w-9/12  px bg-red-300">Data is here</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Archive;
