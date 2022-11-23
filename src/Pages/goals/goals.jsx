/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
// CommonJS

import {
  MdViewModule,
  MdViewStream,
  MdSearch,
  MdOutlineFilterAlt,
  MdOutlineCancel,
} from "react-icons/md";
import User from "../../Component/User";
import Loadings from "../../Component/Loading";
import AddGoals from "./addGoal";
import axios from "axios";
import ColView from "../../Component/Page Component/ColView";
import RowView from "../../Component/Page Component/RowView";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  functionGetGoals,
  functionGetGoalsByUserNow,
} from "../../redux/actions/goalsAction";
import { api } from "../../Functions/axiosClient";

const Goals = () => {
  const [addGoals, setAddGoals] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState(true);
  const [multiId, setMultiId] = React.useState([]);
  const [multiStatus, setMultiStatus] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [isAll, setIsAll] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //// BUAT MULTI ID
  const handleChange = (state) => {
    const target = state.target.value;
    const idData = target.split("|")[0];
    const statusData = target.split("|")[1];
    console.log(idData);
    console.log(multiStatus, multiId);
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
    console.log(payload);
    const response = await axios.post(api + "/data/goals/multiple/update", {
      goalId: multiId,
      status: value,
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

  const getData = async () => {
    setIsLoading(true);
    const response = await dispatch(functionGetGoals());
    if (response.status === "Success") {
      setData(response.data.rows);
      setIsLoading(false);
    }
  };
  const getAsUser = async () => {
    setIsLoading(true);
    const response = await dispatch(functionGetGoalsByUserNow());
    if (response.status === "Success") {
      setData(response.data.rows);
      setIsLoading(false);
    }
  };

  /////
  React.useEffect(() => {
    isAll ? getData() : getAsUser();
  }, [isAll]);

  if (isLoading) return <Loadings />;

  return (
    <div className="relative h-screen">
      <User />
      <div className="p-10    w-full capitalize  ">
        {" "}
        <AddGoals
          onClose={() => {
            setAddGoals(false);
          }}
          addGoals={addGoals}
          getData={getData}
          setAddGoals={setAddGoals}
        ></AddGoals>
        <div>
          <h1 className="text-5xl font-bold ">Goals</h1>
        </div>
        <div className="shadow-md border-b-2  my-3 pb-2  ">
          <div className="flex  px-3 justify-between text-black ">
            <div className="flex items-center space-x-4">
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
              {/* <div>
                <motion.button
                          whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFilter(!isFilter)}
                  className={`flex items-center font-semibold space-x-2 bg-white ring-1 ${
                    isFilter && "ring-[#4284f5] ring-2"
                  } px-2 py-1 rounded`}
                >
                  <h1>filter</h1>
                  <MdOutlineFilterAlt size={25} />
                </motion.button>
              </div> */}
            </div>

            <div className=" text-black  cursor-pointer ">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="rounded-xl border m-auto"
                title="change view"
                onClick={() => {
                  setRow(!row);
                }}
              >
                {row ? <MdViewModule size={30} /> : <MdViewStream size={30} />}
              </motion.div>
            </div>
          </div>
          {/* {isFilter && ( */}
          <div className="mx-4 mt-4 text-base font-semibold">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`bg-white ring-1 ring-blue-400 px-2 rounded ${
                isAll && "ring-2 bg-blue-400 text-white"
              }`}
              onClick={() => {
                setIsAll(!isAll);
              }}
            >
              Show All
            </motion.button>
          </div>
          {/* )} */}
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setAddGoals(!addGoals);
            }}
            className="w-full bg-[#4284f5] py-1 mb-1  rounded-md text-center text-white  font-semibold hover:shadow-md hover:ring-[#4284f5] hover:ring-1"
          >
            Tambah Goals
          </motion.button>
        </div>
        {multiId.length > 0 && (
          <div className="text-white">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                let a = multiStatus.findIndex(
                  (e) => e === "to-do" || e === "ongoing"
                );

                if (a === 0) {
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
                        inputOptions: {
                          ongoing: "Ongoing",
                          hold: "Hold",
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
                    text: "You cannot update to stage before, cause one of your choice is done or held",
                  });
                }
              }}
              className="px-5 py-1 bg-blue-500 my-3 rounded-lg mx-3"
            >
              {" "}
              Update
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
            </motion.button>
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
                    value={e.value}
                    goalId={e.goalId}
                    status={e.status}
                    fromDateA={fromDate}
                    toDateA={toDate}
                    getData={getData}
                    handleChange={handleChange}
                  />
                );
              })}
            </div>
          ) : (
            <div>
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
                    value={e.value}
                    goalId={e.goalId}
                    status={e.status}
                    fromDateA={fromDate}
                    toDateA={toDate}
                    getData={getData}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="h-20 w-full"></div>
      </div>
    </div>
  );
};

export default Goals;
