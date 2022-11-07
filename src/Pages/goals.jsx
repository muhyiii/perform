import React from "react";
import {
  MdViewModule,
  MdViewStream,
  MdSearch,
  MdOutlineCancel,
} from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import ChangingProgressProvider from "../Component/ChangingProggresProvider";
import AddGoals from "./SemiPage/addGoal";

const Goals = () => {
  const [addGoals, setAddGoals] = React.useState(false);
  const [data, setData] = React.useState([]);

  //////////////////////////////////////////////
  // let dummy = [
  //   {
  //     nama: "Fudail Ramadhani",
  //     role: "Magang",
  //     asign: "12 November",
  //     status: "Done",
  //     task: "Membuat halaman HTML dengan baik dan benar",
  //     rate: 60,
  //   },
  //   {
  //     nama: "Fudail Ramadhanwi",
  //     role: "Magang",
  //     asign: "12 November",
  //     status: "Done",
  //     task: "Membuat halaman HTML dengan baik dan benar",
  //     rate: 90,
  //   },
  // ];

  //////////////////////////////////////////////
  React.useEffect(() => {
    setData(JSON.parse(localStorage.getItem("dummyData")));
  }, [localStorage.getItem("dummyData")]);

  const [row, setrow] = React.useState(true);
  return (
    <div className="p-10 relative  h-screen w-full   ">
      <AddGoals
        onClose={() => {
          setAddGoals(false);
        }}
        addGoals={addGoals}
        setAddGoals={setAddGoals}
      ></AddGoals>

      <div>
        <h1 className="text-5xl font-bold ">Goals</h1>
      </div>
      <div className="flex  px-3 my-5 justify-between text-black border-b-2 pb-5 shadow-md">
        <label
          htmlFor=""
          title="search data"
          className="ring hover:ring-1 ring-gray-300 border-none focus-within:ring-2 focus-within:ring-gray-300 px-3 border rounded-md flex items-center"
        >
          <MdSearch />
          <input
            type="text"
            title="search data"
            placeholder="Search.."
            className="outline-none font-semibold placeholder-gray-400 bg-none text-base placeholder:text-sm  px-3 py-1 w-full group-focus:border "
          />
          <MdOutlineCancel />
        </label>
        <div className=" text-black  ">
          <div
            className="rounded-xl border m-auto"
            title="change view"
            onClick={() => {
              setrow(!row);
            }}
          >
            {row ? <MdViewModule size={30} /> : <MdViewStream size={30} />}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setAddGoals(!addGoals);
          }}
          className="w-full bg-slate-500 py-1 rounded-md mx-3 font-semibold"
        >
          Tambah Goals
        </button>
      </div>
      <div className="my-5">
        {row ? (
          <div className="grid grid-cols-12  ">
            {data.map((e) => {
              return (
                <div
                  key={e.id}
                  className="col-span-4 shadow-md m-1 px-4 py-2 border rounded-xl"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => {}}
                  >
                    <div className="flex space-x-3 ">
                      <input type="checkbox" name="" id="" />
                      <div className="text-left ">
                        <p>{e.nama}</p>
                        <p className="text-xs text-gray-400">{e.role}</p>
                      </div>
                    </div>
                    <p className="text-xs">{e.asign}</p>
                  </div>
                  <div className="text-lg grid grid-cols-11 items-center space-x-2 my-5">
                    <div className="col-span-2">
                      <ChangingProgressProvider values={[0, `${e.rate}`]}>
                        {(percentage) => (
                          <CircularProgressbarWithChildren
                            value={percentage}
                            strokeWidth={20}
                            styles={buildStyles({
                              // Rotation of path and trail, in number of turns (0-1)
                              rotation: 0.25,

                              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                              strokeLinecap: "butt",

                              // Text size

                              // How long animation takes to go from one percentage to another, in seconds
                              pathTransitionDuration: 0.5,

                              // Can specify path transition in more detail, or remove it entirely
                              // pathTransition: 'none',

                              // Colors
                              pathColor: `rgba(62, 152, 199, ${
                                percentage / 100
                              })`,

                              trailColor: "#d6d6d6",
                              backgroundColor: "#3e98c7",
                            })}
                          >
                            <p className="text-[10px]">{e.rate}%</p>
                          </CircularProgressbarWithChildren>
                        )}
                      </ChangingProgressProvider>
                    </div>
                    <p className="truncate col-span-9 text-ellipsis font-semibold ">
                      {e.task}
                    </p>
                  </div>
                  <div className="flex justify-between border-t-2 mt-2">
                    <p>Status</p>
                    <p>{e.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {data?.map((e) => {
              return (
                <div
                  key={e.id}
                  className=" items-center shadow-md border p-4 grid grid-cols-11 m-3 rounded-lg h-24"
                >
                  <div className="grid grid-cols-6">
                    <input type="checkbox" name="" id="" className="" />
                    <div></div>
                    <div className="col-span-3">
                      <ChangingProgressProvider values={[0, `${e.rate}`]}>
                        {(percentage) => (
                          <CircularProgressbarWithChildren
                            value={percentage}
                            strokeWidth={20}
                            styles={buildStyles({
                              // Rotation of path and trail, in number of turns (0-1)
                              rotation: 0.25,

                              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                              strokeLinecap: "butt",

                              // Text size

                              // How long animation takes to go from one percentage to another, in seconds
                              pathTransitionDuration: 0.5,

                              // Can specify path transition in more detail, or remove it entirely
                              // pathTransition: 'none',

                              // Colors
                              pathColor: `rgba(62, 152, 199, ${
                                percentage / 100
                              })`,

                              trailColor: "#d6d6d6",
                              backgroundColor: "#3e98c7",
                            })}
                          >
                            <p className="text-[10px]">{e.rate}%</p>
                          </CircularProgressbarWithChildren>
                        )}
                      </ChangingProgressProvider>
                    </div>
                  </div>
                  <div className=" col-span-5 space-y-3 text-ellipsis ">
                    <p className="text-xl font-bold  truncate">{e.task}</p>

                    <p className="text-xs">{e.asign}</p>
                  </div>
                  <div className="text-left col-start-7 col-span-2 ml-5 ">
                    <p>Fudail Ramadhani</p>
                    <p className="text-xs text-gray-400">{e.role}</p>
                  </div>
                  <div>
                    <select
                      id="countries"
                      className="bg-gray-50 items-center border-gray-300 text-gray-900 text-sm rounded-lg outline-none   focus:border-blue-500  w-full "
                    >
                      <option value="done">Done</option>
                      <option value="to-do">To Do</option>
                      <option value="held">Held</option>
                      <option value="procces">Procces</option>
                    </select>
                  </div>
                  <div className="col-start-12">
                    <BiDotsVerticalRounded size={25} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="h-20 w-full"></div>
    </div>
  );
};

export default Goals;
