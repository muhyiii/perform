/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdViewModule,
  MdViewStream,
  MdSearch,
  MdOutlineCancel,
  MdDelete,
} from "react-icons/md";
import User from "../../Component/User";
import Loadings from "../../Component/Loading";
import ColView from "./goals component/ColView";
import RowView from "./goals component/RowView";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiPencil } from "react-icons/hi";
import {
  functionDeleteMultiGoals,
  functionGetGoals,
  functionGetGoalsByUserNow,
} from "../../redux/actions/goalsAction";
import AddGoals from "./addGoal";
import jwtDecode from "jwt-decode";
import { functionUpdateMultiGoals } from "../../redux/actions/goalsAction";
import Scrollbars from "react-custom-scrollbars-2";
import { IoArchiveOutline } from "react-icons/io5";

const Goals = () => {
  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState(true);
  const [multiId, setMultiId] = React.useState([]);
  const [multiStatus, setMultiStatus] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [isAll, setIsAll] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [progress, setProgress] = React.useState("onprogress");
  const [thisDateMonth, setThisDateMonth] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const optionDateString = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  //// BUAT MULTI ID
  const handleChange = (state) => {
    const target = state.target.value;
    const idData = target.split("|")[0];
    const statusData = target.split("|")[1];
    console.log(idData);
    console.log(multiStatus, multiId);
    const { checked } = state.target;

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
    const response = await dispatch(functionDeleteMultiGoals(multiId));
    console.log(response);
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        setMultiId([]);
        getData();
      }, 1000);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
  };

  //// UPDATE MULTI GOALS
  const updateMultiGoals = async (value, archive) => {
    const response = await dispatch(
      functionUpdateMultiGoals(multiId, value, archive)
    );
    console.log(response);
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        setMultiId([]);
        getData();
      }, 1000);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
  };

  const getData = async () => {
    const response = await dispatch(functionGetGoals());
    if (response.status === "Success") {
      setData(response.data.rows);
      // console.log(response.data.rows);
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
  function getAllDaysInMonth() {
    const now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    // console.log(dates);
    return setThisDateMonth(dates);
  }

  React.useEffect(() => {
    setIsLoading(true);
    getAllDaysInMonth();
    // console.log(location);
    isAll ? getData() : getAsUser();
  }, [isAll]);

  if (isLoading) return <Loadings />;

  // console.log(data.filter((e) => e.task.toLowerCase().includes(query)));
  return (
    <div
      className={`overflow-hidden
      relative h-screen capitalize`}
    >
      <User />
      <div className="px-10 pt-5   w-full   ">
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
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 ml-4">
            <p
              onClick={() => setProgress("onprogress")}
              className={` ${
                progress === "onprogress" && "border-b-2  border-b-blue-400"
              } hover:bg-blue-50 hover:cursor-pointer px-2 py-1  rounded`}
            >
              Active This Month
            </p>
            <p
              onClick={() => setProgress("completedDate")}
              className={` ${
                progress === "completedDate" && "border-b-2  border-b-blue-400"
              } hover:bg-blue-50 hover:cursor-pointer px-2 py-1  rounded`}
            >
              Complete Date
            </p>
          </div>
          <div className="flex items-center space-x-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate(".", { state: { isAddGoal: true }, replace: true });
              }}
              className=" bg-white ring-1 ring-blue-400 px-2 rounded-full py-1 font-semibold hover:text-white hover:bg-blue-400 hover:ring-2 hover:shadow-lg"
            >
              Add Goals
            </motion.button>{" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-xl border m-auto"
              title="Change View"
              onClick={() => {
                setRow(!row);
              }}
            >
              {row ? <MdViewModule size={30} /> : <MdViewStream size={30} />}
            </motion.button>
          </div>
        </div>
        <div className="border-b-2  mt-3    ">
          <div className="flex  px-3 justify-between text-black ">
            <div className=" flex items-center space-x-2 w-1/2 ">
              <div className="flex items-center space-x-4  w-2/5">
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
                    className="outline-none bg-transparent  placeholder-gray-400 bg-none text-sm placeholder:text-sm  px-2 py-1 w-full group-focus:border "
                  />
                  <MdOutlineCancel
                    className="cursor-pointer"
                    onClick={(e) => setQuery("")}
                  />
                </label>
              </div>
              <div className="border flex justify-center rounded">
                <select
                  name="status"
                  id="status"
                  className=" flex m-auto space-x-5 appearance-none outline-none px-2  rounded-md hover:cursor-pointer  space-y-1"
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setMultiId([]);
                  }}
                  value={status}
                >
                  <option className="text-left" value="">
                    All
                  </option>
                  <option className="text-left" value={"to-do"}>
                    To Do
                  </option>
                  <option className="text-left" value={"ongoing"}>
                    Ongoing{" "}
                  </option>
                  <option className="text-left" value={"hold"}>
                    Hold
                  </option>
                  <option className="text-left" value={"done"}>
                    Done
                  </option>
                </select>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={` space-x-5  text-white ring-1 py-1 rounded-full group px-5 font-medium${
                isAll
                  ? "ring-2 bg-blue-400 text-white font-medium"
                  : " bg-black"
              }`}
              onClick={() => {
                setIsAll(!isAll);
                setMultiId([]);
              }}
            >
              {isAll ? "Show All" : "Only showing me"}
            </motion.button>
          </div>
          {/* {isFilter && ( */}
          <div className="mx-4 mt-4 text-base font-semibold flex items-center justify-between ">
            {" "}
          </div>
          {/* )} */}
        </div>
        {multiId.length > 0 && (
          <div className="text-white flex mt-2">
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
                              updateMultiGoals(value, false);
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
              className="px-2 space-x-1 py-1 bg-blue-500 my-1 rounded-lg mx-3 shadow-md flex items-center"
            >
              <HiPencil />
              <span>Update</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You want to archive this goal!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, archive it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    updateMultiGoals(null, true);
                  }
                });
              }}
              className="px-2 space-x-1 py-1 bg-green-500 my-1 rounded-lg mx-3 shadow-md flex items-center"
            >
              <IoArchiveOutline />
              <span>Archive</span>
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
              className="px-2 space-x-1 py-1 bg-red-500 my-1 rounded-lg mx-3 shadow-md flex items-center "
            >
              <MdDelete />
              <span>Delete</span>
            </motion.button>
          </div>
        )}
      </div>
      <motion.div layout className="h-[75%]  w-full">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <motion.div layout className="px-10">
            <AnimatePresence>
              {" "}
              {row ? (
                <div className="grid grid-cols-12">
                  {data
                    ?.filter(
                      (e) =>
                        e.task.toLowerCase().includes(query) ||
                        e.description.toLowerCase().includes(query) ||
                        e.users[0].name.toLowerCase().includes(query)
                    )
                    ?.filter((e) =>
                      progress === "onprogress"
                        ? new Date(e.fromDate).getTime() >= thisDateMonth[0] &&
                          new Date(e.toDate).getTime() <= thisDateMonth.at(-1)
                        : new Date(e.fromDate).getTime()
                    )
                    ?.filter((e) => e.isArchive === false)
                    ?.filter((e) =>
                      status !== "" ? e.status === status : e.status !== null
                    )

                    ?.map((e,index) => {
                      let fromDate = new Date(e.fromDate).toLocaleDateString(
                        "id",
                        optionDateString
                      );
                      let toDate = new Date(e.toDate).toLocaleDateString(
                        "id",
                        optionDateString
                      );
                      console.log(
                        new Date(e.fromDate).toLocaleDateString(
                          "id",
                          optionDateString
                        ) +
                          "  " +
                          thisDateMonth
                      );
                      return (
                        <RowView
                          data={e}
                          key={index}
                          id={e.id}
                          name={e.users[0].name}
                          image={e.users[0].image}
                          role={e.users[0].role}
                          rate={e.rate}
                          fromDate={e.fromDate}
                          toDate={e.toDate}
                          task={e.task}
                          description={e.description}
                          value={e.value}
                          goalId={e.goalId}
                          status={e.status}
                          fromDateA={fromDate}
                          toDateA={toDate}
                          createdAt={e.createdAt}
                          getData={getData}
                          handleChange={handleChange}
                          length={index}
                        />
                      );
                    })}
                </div>
              ) : (
                <div>
                  {data
                    ?.filter((e) =>
                      progress === "onprogress"
                        ? new Date(e.fromDate).getTime() >= thisDateMonth[0] &&
                          new Date(e.toDate).getTime() <= thisDateMonth.at(-1)
                        : new Date(e.fromDate).getTime()
                    )
                    ?.filter((e) => e.isArchive === false)
                    ?.filter((e) =>
                      status !== "" ? e.status === status : e.status !== null
                    )
                    ?.filter(
                      (e) =>
                        e.task.toLowerCase().includes(query) ||
                        e.users[0].name.toLowerCase().includes(query)
                    )
                    ?.map((e, index) => {
                      let fromDate = new Date(e.fromDate).toLocaleDateString(
                        "id",
                        optionDateString
                      );
                      let toDate = new Date(e.toDate).toLocaleDateString(
                        "id",
                        optionDateString
                      );
                      return (
                        <ColView
                          data={e}
                          key={index}
                          id={e.id}
                          name={e.users[0].name}
                          image={e.users[0].image}
                          role={e.users[0].role}
                          rate={e.rate}
                          fromDate={e.fromDate}
                          toDate={e.toDate}
                          task={e.task}
                          description={e.description}
                          value={e.value}
                          goalId={e.goalId}
                          status={e.status}
                          fromDateA={fromDate}
                          toDateA={toDate}
                          createdAt={e.createdAt}
                          updateMultiGoals={updateMultiGoals}
                          getData={getData}
                          length={index}
                        />
                      );
                    })}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </Scrollbars>
      </motion.div>
    </div>
  );
};

export default Goals;
