/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdViewModule,
  MdViewStream,
  MdSearch,
  MdOutlineCancel,
} from "react-icons/md";
import User from "../../Component/User";
import Loadings from "../../Component/Loading";
import axios from "axios";
import ColView from "./goals component/ColView";
import RowView from "./goals component/RowView";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  functionGetGoals,
  functionGetGoalsByUserNow,
} from "../../redux/actions/goalsAction";
import { api } from "../../Functions/axiosClient";
import AddGoals from "./addGoal";
import jwtDecode from "jwt-decode";

const Goals = () => {
  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState(true);
  const [multiId, setMultiId] = React.useState([]);
  const [multiStatus, setMultiStatus] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAll, setIsAll] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const decoded = jwtDecode(localStorage.getItem("token"));

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
    const response = await dispatch(functionGetGoals());
    if (response.status === "Success") {
      setData(response.data.rows);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const getAsUser = async () => {
    const response = await dispatch(functionGetGoalsByUserNow(decoded.id));
    if (response.status === "Success") {
      setData(response.data.rows);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  /////
  React.useEffect(() => {
    setIsLoading(true);
    console.log(location);
    // return
    isAll ? getData() : getAsUser();
  }, [isAll]);

  if (isLoading) return <Loadings />;

  console.log(data.filter((e) => e.task.toLowerCase().includes(query)));
  return (
    <div
      className={`${
        location.state?.isAddGoal && "overflow-hidden"
      }relative h-screen`}
    >
      <User />
      <div className="px-10 py-5    w-full capitalize  ">
        <AnimatePresence>
          {location.state?.isAddGoal && (
            <motion.div
              className=" absolute   flex justify-center items-center backdrop-blur-[2px] z-20   inset-0  overflow-y-hidden h-full "
              initial={{ y: -100, x: -100 }}
              animate={{
                y: 0,
                x: 0,
                transitionEnd: {
                  background: "rgba(0, 0, 0, 0.7)",
                },
              }}
              exit={{ opacity: 0, y: +100, x: +100, background: "transparent" }}
              transition={{ ease: "easeInOut", duration: 1 }}
            >
              <AddGoals
                onClose={() => {
                  navigate(".", { state: { isAddGoal: false }, replace: true });
                }}
                getData={getData}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <h1 className="text-5xl font-bold ">Goals</h1>
        </div>
        <div className="border-b-2  my-3 pb-2  ">
          <div className="flex  px-3 justify-between text-black ">
            <div className="flex items-center space-x-4  w-1/3">
              <label
                htmlFor=""
                title="search data"
                className=" bg-slate-100 hover:ring-1 w-full  ring-gray-800 border-none focus-within:ring-1 focus-within:ring-gray-800 px-3 border rounded-md flex items-center"
              >
                <MdSearch />
                <input
                  type="text"
                  title="search data"
                  placeholder="Search.."
                  value={query}
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                  className="outline-none bg-transparent  placeholder-gray-400 bg-none text-base placeholder:text-sm  px-3 py-2 w-full group-focus:border "
                />
                <MdOutlineCancel
                  className="cursor-pointer"
                  onClick={(e) => setQuery("")}
                />
              </label>
            </div>

            <div className=" text-black  cursor-pointer ">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="rounded-xl border m-auto"
                title="Change View"
                onClick={() => {
                  setRow(!row);
                }}
              >
                {row ? <MdViewModule size={30} /> : <MdViewStream size={30} />}
              </motion.div>
            </div>
          </div>
          {/* {isFilter && ( */}
          <div className="mx-4 mt-4 text-base font-semibold flex items-center justify-between ">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={` space-x-5  text-white ring-1 py-1 rounded-full group px-5 ${
                isAll ? "ring-2 bg-blue-400 text-white" : " bg-black"
              }`}
              onClick={() => {
                setIsAll(!isAll);
              }}
            >
              {isAll ? "Show All" : "Only showing me"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate(".", { state: { isAddGoal: true }, replace: true });
              }}
              className=" bg-white ring-1 ring-blue-400 px-2 rounded-full py-1 font-semibold hover:text-white hover:bg-blue-400 hover:ring-2 hover:shadow-lg"
            >
              Add Goals
            </motion.button>
          </div>
          {/* )} */}
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
                              value === "ongoing"
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
              {data
                .filter(
                  (e) =>
                    e.task.toLowerCase().includes(query) ||
                    e.users[0].name.toLowerCase().includes(query)
                )
                ?.map((e) => {
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
                      image={e.users[0].image}
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
              {data
                .filter(
                  (e) =>
                    e.task.toLowerCase().includes(query) ||
                    e.users[0].name.toLowerCase().includes(query)
                )
                ?.map((e) => {
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
                      image={e.users[0].image}
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
