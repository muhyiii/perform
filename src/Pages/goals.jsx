import React from "react";
import { MdViewModule, MdViewStream } from "react-icons/md";

const Goals = () => {
  let a = [1, 2, 3, 4, 5, 2, 2, 2, 2, 2, 2, 2, 12, 2, 1, 12, 12];
  const [view, setView] = React.useState(true);
  return (
    <div className="p-10  h-screen w-full   ">
      <div>
        <h1 className="text-5xl font-bold ">Goals</h1>
      </div>
      <div className="text-white grid grid-cols-12 space-x-3 my-5">
        <label htmlFor="" className="col-span-3">
          <input
            type="text"
            placeholder="Search.."
            className="outline-none bg-slate-100 text-base placeholder:text-sm :border-2 text-black px-3 py-1 rounded-lg w-full"
          />
        </label>
        <div className=" text-black col-start-11 col-end-12">
          <button
            className="rounded-xl border m-auto"
            onClick={() => {
          setView(!view)
            }}
          >
            {view  ? (
              <MdViewModule size={30} />
            ) : (
              <MdViewStream size={30} />
            )}
          </button>
        </div>
      </div>
      <p className="border-b-2 w-full my-5"></p>
      {/* <div className="grid grid-cols-12  ">
        {a.map((e) => (
          <div className="col-span-4 m-1 px-4 py-2 border border-red-200 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex space-x-3 ">
                <input type="checkbox" name="" id="" />
                <p className="text-sm">Fudail Ramadhani</p>
              </div>
              <p className="text-xs">12 Nov</p>
            </div>
            <div className="font-bold text-lg flex items-center space-x-2 my-5">
              <div className="border p-2 rounded-full text-xs">100%</div>
              <p>Membuat halaman di html dengan bantuan css</p>
            </div>
            <div className="flex justify-between border-t-2 mt-2">
              <p>Status</p>
              <p>Done</p>
            </div>
          </div>
        ))}
      </div> */}

      <div>
        {a.map((e) => (
          <div className=" items-center border-2 p-4 grid grid-cols-11 m-3 rounded-lg">
            <input type="checkbox" name="" id="" className="col-end-2" />
            <div className="border p-5 rounded-full text-xs text-center m-auto ">
              100%
            </div>
            <div className=" col-span-5">
              <p className="text-xl font-bold">
                Membuat halaman di html dengan bantuan css
              </p>
              <p className="text-xs">12 Nov</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20 w-full"></div>
    </div>
  );
};

export default Goals;
