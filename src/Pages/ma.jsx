import React from "react";
import { VscFilter, VscFilterFilled } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import ChangingProgressProvider from "../Component/ChangingProggresProvider";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "../App.css";

const Ma = () => {
  let a = [1, 2, 3, 4, 5, 2, 2, 2, 2, 2, 2, 2, 12, 2, 1, 12, 12];
  const [view, setView] = React.useState(true);
  return (
    <div className="p-10  h-screen w-full">
      <div>
        <h1 className="text-5xl font-bold ">Measured Actifity</h1>
      </div>
      {/* NAV ////////////>....................... */}
      <nav class="flex justify-start space-x-4 py-10 ">
        <button className=" border-4 border-white ">
          <diva>
            Approve{" "}
            <span class="rounded-full border-transparent bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
              204
            </span>
          </diva>
        </button>

        <button className=" border-4 border-white ">
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
      </nav>
      {/* NAV ////////////>....................... */}
      <div className="text-white grid grid-cols-12 space-x-3 my-5">
        <label htmlFor="" className="col-span-3">
          <input
            type="text"
            placeholder="Search.."
            className="outline-none bg-slate-100 text-base placeholder:text-sm :border-2 border-rose-600 text-black px-3 py-1 rounded-lg w-full"
          />
        </label>
        <div className=" text-black col-end-6 col-span-2">
          <a
            href="#"
            class="inline-flex items-center py-0 px-1 text-sm font-medium text-center text-gray-800 bg-white-700 rounded-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white"
            onClick={() => {
              setView(!view);
            }}
          >
            Filter
            {view ? <VscFilter size={30} /> : <VscFilterFilled size={30} />}
          </a>
        </div>
      </div>
      <p className="border-b-2 w-full my-5"></p>

      <div className="flex justify-items-end  p-4 grid grid-cols-8 gap-4 border-2 rounded-lg">
        <div class=""></div>
        <div class="justify-start">Achievement</div>
        <div class="col-span-2">Measured Activity</div>
        <div class="...">User</div>
        <div class="">Result Value</div>
        <div class="...">Last Update</div>
      </div>

      <div>
        {a.map((e) => (
          <div className=" items-center border-2 p-4 grid grid-cols-10 m-3 rounded-lg">
            <input type="checkbox" name="" id="" className="col-end-2" />
            {/* <div className="text h-12 w-12 rounded-full ring-offset-2 ring-4 border ">
              100%
            </div> */}
            <div
              className=" container mx-auto"
              style={{ width: 80, height: 80 }}
            >
              <ChangingProgressProvider values={[80, `${20}`]}>
                {(percentage) => (
                  <CircularProgressbarWithChildren
                    value={percentage}
                    strokeWidth={10}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "butt",

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
            <div className="col-span-3 ">
              <p className="text-sm font-bold">
                Membuat halaman di html dengan bantuan css
              </p>
              <p className="text-xs">12 Nov</p>
            </div>

            <div className="flex col-span-2">
              <FaUserCircle className="flex"/>
              <div className="col-span-2 ">
                <p>Farhan Kebab</p>
                <p className="text-xs ">Farhan</p>
              </div>
            </div>

            <button class="cursor-not-allowed opacity-50 p-0 w-16 h-16 bg-gray-200 hover:bg-gray-500 rounded-full mouse shadow transition ease-in duration-200 focus:outline-none">
              <BsThreeDotsVertical
                size={30}
                className="w-6 h-6 inline-block "
              />
            </button>
          </div>
        ))}
      </div>
      <div className="h-20 w-full"></div>
    </div>
  );
};

export default Ma;
