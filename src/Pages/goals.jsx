/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Swal from "sweetalert2";

// CommonJS

import {
  MdViewModule,
  MdViewStream,
  MdSearch,
  MdOutlineCancel,
} from "react-icons/md";



import AddGoals from "./goals/addGoal";

import ColView from "../Component/Page Component/ColView";
import RowView from "../Component/Page Component/RowView";

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

  const updateLocStorage = (id, status) => {
    let rate = 0;
    if (status === "done" || status === "held") {
      rate = 100;
    } else if (status === "procces") {
      rate = 60;
    }
    for (let dataa of data) {
      if (dataa.id === id) {
        dataa.status = status;
        dataa.rate = rate;
      }
    }
    localStorage.setItem("dummyData", JSON.stringify(data));
    setData(JSON.parse(localStorage.getItem("dummyData")));
  };
  const deleteLocStorage = (id) => {
    let temp = data.filter((item) => item.id != id);
    localStorage.setItem("dummyData", JSON.stringify(temp));
    setData(JSON.parse(localStorage.getItem("dummyData")));
  };

  const [isChoosen, setIsChoosen] = React.useState(false);

  const handleChange = (state, idd, statuss) => {
    if (state === "isDelete") {
      // if (isDel === true) {
      //   setWiilDelete(true);
      // }
      setIsChoosen(!isChoosen);
      if (idd || statuss) {
        localStorage.setItem("someId", idd);
        localStorage.setItem("someStatus", statuss);
      } else {
        setIsChoosen(!isChoosen);
        localStorage.removeItem("someId");
        localStorage.removeItem("someStatus");
      }
    }
  };

  React.useEffect(() => {
    setData(JSON.parse(localStorage.getItem("dummyData")));
  }, []);
  React.useEffect(() => {
    setData(JSON.parse(localStorage.getItem("dummyData")));
    localStorage.removeItem("someId");
    localStorage.removeItem("someStatus");
    // setUpdated(JSON.parse(localStorage.getItem("dummyData")));
  }, [localStorage.getItem("dummyData")]);

  const [row, setRow] = React.useState(true);
  return (
    <div className="p-10 relative  h-screen w-full capitalize  ">
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
        <div className=" text-black  cursor-pointer ">
          <div
            className="rounded-xl border m-auto"
            title="change view"
            onClick={() => {
              setRow(!row);
              
            }}
          >
            {row ? (
              <MdViewModule size={30} />
            ) : (
              <MdViewStream size={30} />
            )}
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
      {isChoosen && (
        <div className="text-white">
          {/* <button
            onClick={() => {
              if (
                localStorage.getItem("someStatus") === "to-do" ||
                localStorage.getItem("someStatus") === "procces"
              ) {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You can only update to the next stage",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, update it!",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    await Swal.fire({
                      title: "Select value of status update",
                      input: "select",
                      inputOptions:
                        localStorage.getItem("someStatus") !== "procces"
                          ? {
                              procces: "Procces",
                              held: "Held",
                              done: "Done",
                            }
                          : {
                              held: "Held",
                              done: "Done",
                            },
                      inputPlaceholder: "Select a status",
                      showCancelButton: true,
                      inputValidator: (value) => {
                        return new Promise((resolve) => {
                          if (
                            value === "done" ||
                            value === "held" ||
                            value === "procces"
                          ) {
                            console.log(value);
                            updateLocStorage(
                              localStorage.getItem("someId"),
                              value
                            );
                            localStorage.removeItem("someId");
                            localStorage.removeItem("someStatus");
                            setIsChoosen(false);
                            Swal.fire(
                              "Succesfull!",
                              "Your status has been updated.",
                              "success"
                            );
                          } else {
                            resolve("Choose the next stage of your status");
                          }
                        });
                      },
                    });
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "You cannot update to stage before!",
                });
              }
            }}
            className="px-5 py-1 bg-blue-500 my-3 rounded-lg mx-3"
          >
            {" "}
            Update
          </button> */}
          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteLocStorage(localStorage.getItem("someId"));
                  localStorage.removeItem("someId");
                  localStorage.removeItem("someStatus");
                  setIsChoosen(false);
                  Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
                }
              });
            }}
            className="px-5 py-1 bg-red-500 my-3 rounded-lg mx-3"
          >
            {" "}
            Delete
          </button>
        </div>
      )}
      <div className=" w-full">
        {row ? (
          <div className="grid grid-cols-12">
            {data.map((e) => {
              let deadline = new Date(e.asign).getDate();
              let now = new Date().getDate();

              console.log(now);
              let remain = deadline - now;

              return (
                <RowView
                  data={e}
                  key={e.id}
                  id={e.id}
                  nama={e.nama}
                  role={e.role}
                  rate={e.rate}
                  asign={e.asign}
                  status={e.status}
                  task={e.task}
                  remain={remain}
                  updateLocStorage={updateLocStorage}
                  handleChange={handleChange}
                />
              );
            })}
          </div>
        ) : (
          <div>
            {data.map((e) => {
              let deadline = new Date(e.asign).getDate();
              let now = new Date().getDate();

              console.log(now);
              let remain = deadline - now;

              return (
                <ColView
                  data={e}
                  key={e.id}
                  id={e.id}
                  nama={e.nama}
                  role={e.role}
                  rate={e.rate}
                  asign={e.asign}
                  status={e.status}
                  task={e.task}
                  remain={remain}
                  updateLocStorage={updateLocStorage}
                  deleteLocStorage={deleteLocStorage}
                />
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
