import React from "react";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import ChangingProgressProvider from "../../Component/Support/ChangingProggresProvider";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "../measured/ma";

const Ma = () => {
  let a = [1, 2, 3, 4, 5, 2, 2, 2, 2, 2, 2, 2, 12, 2, 1, 12, 12];
  let b = [3, 3, 5, 6];
  const [row, setRow] = React.useState(true);
  return (
    <div className="p-10  h-screen w-full">
      <div>
        <h1 className="text-5xl font-bold ">Measured Actifity</h1>
      </div>
      {/* NAV ////////////>....................... */}
      <nav class="flex justify-start space-x-4 py-10 justify-between">
        <div className="">

          <button className=" border-4 border-white " onClick={a}>
            <diva>
              Approve{" "}
              <span class="hover:underline-offset-[3px] rounded-full border-transparent bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                204
              </span>
            </diva>
          </button>

          <button className=" border-4 border-white " onClick={b}>
            <diva>
              Active{" "}
              <span class="rounded-full border-transparent bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                204
              </span>
            </diva>
          </button>

          <button className=" border-4 border-white ">
            <diva>
              Overdue{" "}
              <span class="rounded-full border-transparent bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                204
              </span>
            </diva>
          </button>

          <button className=" border-4 border-white ">
            <diva>
              Complete{" "}
              <span class="rounded-full border-transparent bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                204
              </span>
            </diva>
          </button>
        </div>
        <a
          href="#_"
          class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
        >
          <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
          <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
            Buat Measure Activity Baru
          </span>
        </a>
      </nav>
      {/* NAV ////////////>....................... */}

      <div className="text-white grid grid-cols-3 space-x-3 my-5">
        <label htmlFor="" className="">
          <input
            type="text"
            placeholder="Search.."
            className="outline-none bg-slate-100 text-base placeholder:text-sm :border-2 border-rose-600 text-black px-3 py-1 rounded-lg w-full"
          />
        </label>

        <a
          onClick={() => {
            setRow(!row);
          }}
          href="#_"
          class="inline-flex overflow-hidden text-white bg-gray-900 rounded group w-32 h-8"
        >
          <span class="place-items-center  font-medium font-medium px-3.5 py-2 text-gray bg-gray group-hover:bg-gray-800 flex items-center justify-center">
            <div>
              {row ? <VscFilter size={20} /> : <VscFilterFilled size={20} />}
            </div>
          </span>
          <span class="pl-4 pr-5 py-1">Filter</span>
        </a>

        <div className="pl-25">
          <a
            href="#_"
            class="inline-flex items-center ml-40 justify-center px-6 tracking-wide text-white transition duration-200 bg-gray-900 rounded hover:bg-gray-800 focus:shadow-outline focus:outline-none w-36 h-8"
          >
            <span class="text-center text-sm">Export CSV</span>
          </a>
        </div>
      </div>

      <p className="border-b-2 w-full my-5 "></p>

      <table
        cellPadding="35"
        className="justify-items-center"
        // className="place-items-center flex justify-items-center  p-4 grid grid-cols-5 gap-4 border-2 rounded-lg justify-round"
      >
        <tr>
          <th></th>
          <th class="justify-start">Achievement</th>
          <th class="">Measured Activity</th>
          <th class="pr-20">User</th>
          <th class="py-2 pr-5">Result Value</th>
          <th class="...">Last Update</th>
          <th></th>
        </tr>
      </table>

      {/* list>>>>>>>>>>>>>>>>>>>>>>>>> */}

      
        <div>
          {a.map((e) => (
            <div className=" items-center border-2 p-4 grid grid-cols-11 m-3 rounded-lg">
              <input type="checkbox" name="" id="" className="col-end-2" />

              <div
                className=" container mx-auto"
                style={{ width: 80, height: 80 }}
              >
                <ChangingProgressProvider values={[80, `${20}`]}>
                  {(percentage) => (
                    <CircularProgressbarWithChildren
                      value={percentage}
                      strokeWidth={15}
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "button",

                        pathTransitionDuration: 0.5,

                        pathColor: `rgba(62, 152, 199, ${percentage / 100})`,

                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    >
                      <p className="text-center text-xl ">{percentage}%</p>
                    </CircularProgressbarWithChildren>
                  )}
                </ChangingProgressProvider>
              </div>

              <div className="col-span-3 p-10">
                <p className="text-sm font-bold ">
                  Membuat halaman di html dengan bantuan css
                </p>
                <p className="text-xs">12 Nov</p>
              </div>

              <div className="flex col-span-2 place-items-center justify-evenly">
                <FaUserCircle className="flex " />
                <div className="col-span-2 ">
                  <p>Kamu Nanya?</p>
                  <p className="text-xs">Farhan</p>
                </div>
              </div>

              <p>100.00</p>

              <div className="flex col-span-2 place-items-center justify-evenly">
                <div className="col-span-2 ">
                  <p>02 November 2022</p>
                  <p className="text-xs">1:53:24 pm</p>
                </div>
              </div>

              <button class="justify-end cursor-not-allowed opacity-50 p-0 w-16 h-16 bg-gray-200 hover:bg-gray-500 rounded-full mouse shadow transition ease-in duration-200 focus:outline-none">
                <BsThreeDotsVertical
                  size={30}
                  className="w-6 h-6 inline-block "
                />
              </button>
            </div>
          ))}
        </div>

      {/* list>>>>>>>>>>>>>>>>>>>>>>>>> */}

      <div className="h-20 w-full"></div>
    </div>
  );
};

export default Ma;
