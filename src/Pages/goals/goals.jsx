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

import AddGoals from "./addGoal";

import ColView from "../../Component/Page Component/ColView";
import RowView from "../../Component/Page Component/RowView";
import { api, getGoals } from "../../Functions/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { functionGetGoals } from "../../redux/actions/goalsAction";
import { functionGetUserAfterLogin } from "../../redux/actions/authAction";

const Goals = () => {
  const [addGoals, setAddGoals] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState(true);
  const [multiId, setMultiId] = React.useState([]);
  const [multiStatus, setMultiStatus] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //// BUAT MULTI ID
  const handleChange = (state) => {
    const target = state.target.value;
    const idData = target.split("|")[0];
    const statusData = target.split("|")[1];
    console.log(idData);
    const { id, checked } = state.target;

    if (checked) {
      setMultiId((item) => [...item, idData]);
      setMultiStatus((item) => [...item, statusData]);
    } else {
      setMultiId((item) => [...item.filter((count) => count != idData)]);
      setMultiStatus((item) => [
        ...item.filter((count) => count != statusData),
      ]);
    }
  };

  //// DELETE MULTI GOALS
  const deleteMultiGoals = async () => {
    // console.log(id);
    const response = await axios.post(api + "/data/goals/multiple/delete", {
      multiId,
    });
    console.log(response);
    if (response.status === 200) {
      Swal.fire("Succesfull!", response.data.messege, "success");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
    if (response.statusText !== "OK")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.messege,
      });
  };

  //// UPDATE MULTI GOALS
  const updateMultiGoals = async (value) => {
    const payload = {
      goalId: multiId,
      status: value,
    };
    const response = await axios.post(
      api + "/data/goals/multiple/update",
      payload
    );
    console.log(response);
    if (response.status === 200) {
      Swal.fire("Succesfull!", response.data.messege, "success");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
    if (response.statusText !== "OK")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.messege,
      });
  };

  // console.log(multiId);
  const setArchive = (id) => {
    let archive = JSON.parse(localStorage.getItem("archiveDummy"));
    let checkArchive = archive.find((item) => item.id == id);
    if (checkArchive === undefined) {
      let dataa = data.find((item) => item.id == id);
      archive.push(dataa);
      localStorage.setItem("archiveDummy", JSON.stringify(archive));
    }
    let remove = data.filter((item) => item.id != id);
    console.log(archive);
    localStorage.setItem("dummyData", JSON.stringify(remove));
    setData(JSON.parse(localStorage.getItem("dummyData")));
  };
  const getData = async () => {
    const response = await dispatch(functionGetGoals());
    setData(response.data);
    await dispatch(functionGetUserAfterLogin(1))
  };
  /////
  React.useEffect(() => {
    getData();
  }, []);

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
      {multiId.length > 0 && (
        <div className="text-white">
          <button
            onClick={() => {
              // return console.log(multiStatus);
              let a = multiStatus.map((e) => e === "to-do" || e === "ongoing");

              if (a) {
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
                        localStorage.getItem("someStatus") !== "ongoing"
                          ? {
                              ongoing: "Ongoing",
                              hold: "Hold",
                              done: "Done",
                            }
                          : {
                              hold: "Held",
                              done: "Done",
                            },
                      inputPlaceholder: "Select a status",
                      showCancelButton: true,
                      inputValidator: (value) => {
                        return new Promise((resolve) => {
                          if (
                            value === "done" ||
                            value === "hold" ||
                            value === "procces"
                          ) {
                            updateMultiGoals(value);
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
          </button>
          <button
            onClick={() => {
              // return console.log(multiId);

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
                  deleteMultiGoals();
                }
              });
            }}
            className="px-5 py-1 bg-red-500 my-3 rounded-lg mx-3"
          >
            Delete
          </button>
        </div>
      )}
      <div className=" w-full">
        {row ? (
          <div className="grid grid-cols-12">
            {data?.map((e) => {
              let fromDate = new Date(e.fromDate).toLocaleDateString("id", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              let toDate = new Date(e.toDate).toLocaleDateString("id", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              return (
                <RowView
                  data={e}
                  key={e.id}
                  id={e.id}
                  name={e.users[0].name}
                  role={e.users[0].role}
                  rate={e.rate}
                  fromDate={e.fromDate}
                  toDate={e.toDate}
                  task={e.task}
                  goalId={e.goalId}
                  status={e.status}
                  fromDateA={fromDate}
                  toDateA={toDate}
                  handleChange={handleChange}
                />
              );
            })}
          </div>
        ) : (
          <div>
            {data.map((e) => {
              let fromDate = new Date(e.fromDate).toLocaleDateString("id", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              let toDate = new Date(e.toDate).toLocaleDateString("id", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              });
              return (
                <ColView
                  data={e}
                  key={e.id}
                  id={e.id}
                  name={e.users[0].name}
                  role={e.users[0].role}
                  rate={e.rate}
                  fromDate={e.fromDate}
                  toDate={e.toDate}
                  task={e.task}
                  goalId={e.goalId}
                  status={e.status}
                  fromDateA={fromDate}
                  toDateA={toDate}
                  handleChange={handleChange}
                  setArchive={setArchive}
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
