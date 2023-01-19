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
import ColView from "./GOALS COMPONENT/ColumnView";
import RowView from "./GOALS COMPONENT/RowView";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";
import {
  functionDeleteMultiGoals,
  functionGetGoals,
  functionGetGoalsByUserNow,
} from "../../Redux/Actions/GOALS_ACTION";
import AddGoals from "./AddGoal";
import jwtDecode from "jwt-decode";
import { functionUpdateMultiGoals } from "../../Redux/Actions/GOALS_ACTION";
import Scrollbars from "react-custom-scrollbars-2";
import { IoArchiveOutline } from "react-icons/io5";
const Goals = () => {
  const goal = useSelector((state) => state.GOALS_REDUCER);
  const auth = useSelector((state) => state.AUTH_REDUCER);
  const now = Date();

  const [isTitle, setIsTitle] = React.useState(false);
  const [isRow, setIsRow] = React.useState(false);

  const [multiId, setMultiId] = React.useState([]);
  const [multiStatus, setMultiStatus] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [status, setStatus] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [progress, setProgress] = React.useState("onprogress");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const optionDateString = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const handleChange = (state) => {
    const target = state.target.value;
    const idData = target.split("|")[0];
    const statusData = target.split("|")[1];
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

  const deleteMultiGoals = async () => {
    const response = await dispatch(functionDeleteMultiGoals(multiId));
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        setMultiId([]);
        goal.isAll ? getAsUser() : getData();
        setMultiStatus([]);
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
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        setMultiId([]);
        setMultiStatus([]);
        goal.isAll ? getAsUser() : getData();
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
    await dispatch(functionGetGoals());
    setIsTitle(true);
  };

  // console.log(data);
  const getAsUser = async () => {
    await dispatch(functionGetGoalsByUserNow(decoded.id));
    setIsTitle(false);
  };

  React.useEffect(() => {
    goal.isAll ? getData() : getAsUser();
  }, [goal.isAll]);

  React.useEffect(() => {
    goal.isRow ? setIsRow(true) : setIsRow(false);
  }, [goal.isRow]);

  if (isLoading) return <Loadings />;

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
                getData={goal.isAll ? getData : getAsUser}
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
              Active
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
            {auth.position === "atasan" && (
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
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-xl border m-auto"
              title="Change View"
              onClick={() => {
                dispatch({ type: "CHANGE_ROW_GOAL" });
                setMultiId([]);
                setMultiStatus([]);
              }}
            >
              {goal.isRow ? (
                <MdViewModule size={30} />
              ) : (
                <MdViewStream size={30} />
              )}
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
                    setMultiStatus([]);
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
                goal.isAll
                  ? "ring-2 bg-blue-400 text-white font-medium"
                  : " bg-black"
              }`}
              onClick={() => {
                dispatch({ type: "CHANGE_ALL_GOAL" });
                setMultiStatus([]);
                setMultiId([]);
              }}
            >
              {goal.isAll ? "Show All" : "Only showing me"}
            </motion.button>
          </div>
          <div className="mx-4 mt-4 text-base font-semibold flex items-center justify-between "></div>
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

            {auth.position === "atasan " && (
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
            )}

            {auth.position === "atasan " && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                      deleteMultiGoals();
                    }
                  });
                }}
                className="px-2 space-x-1 py-1 bg-red-500 my-1 rounded-lg mx-3 shadow-md flex items-center "
              >
                <MdDelete />
                <span>Delete</span>
              </motion.button>
            )}
          </div>
        )}
      </div>
      <motion.div layout className="h-[75%]  w-full">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <motion.div layout className="px-10 mt-2">
            <AnimatePresence>
              {goal.goals.map((e, i) => {
                const name = e.name;
                const role = e.role;
                const image = e.image;
                const goal = e.goals;
                const filteredQuery =
                  query === ""
                    ? goal
                    : goal.filter(
                        (goal) =>
                          goal.task.toLowerCase().includes(query) ||
                          goal.description.toLowerCase().includes(query) ||
                          e.name.toLowerCase().includes(query)
                      );

                const thisMonth =
                  progress === "onprogress"
                    ? filteredQuery.filter(
                        (e) =>
                          new Date(e.toDate).getTime() >=
                          new Date(now).getTime()
                      )
                    : filteredQuery;
                const filteredStatus =
                  status === ""
                    ? thisMonth
                    : thisMonth.filter((e) => e.status === status);

                return (
                  <motion.div layout>
                    <AnimatePresence>
                      {isTitle && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0, x: -100 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{
                            delay: `0.${i + 3}`,
                            duration: 1,
                            ease: "easeOut",
                          }}
                          className="bg-gray-200 rounded-md py-1 px-5 text-sm"
                        >
                          <p>{e.name}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className={`${isRow && `grid grid-cols-12`}  `}>
                      {goal?.length === 0 ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -100 }}
                          transition={{ delay: `0.4`, duration: 1 }}
                          className="text-xl mt-2 font-medium text-red-400 text-center "
                        >
                          Data of Goals is empty...
                          <p
                            className="hover:text-blue-400 cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(".", {
                                state: { isAddMA: true },
                                replace: false,
                              })
                            }
                          >
                            Create Data
                          </p>
                        </motion.div>
                      ) : filteredQuery.length === 0 && query !== "" ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -100 }}
                          transition={{ delay: `0.4`, duration: 1 }}
                          className="text-xl mt-2 font-medium text-red-400 text-center "
                        >
                          Cannot get data of your requesting...
                        </motion.div>
                      ) : filteredStatus.length === 0 && status !== "" ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -100 }}
                          transition={{ delay: `0.4`, duration: 1 }}
                          className="text-xl mt-2 font-medium text-red-400 text-center "
                        >
                          Cannot get data of status {status}...
                        </motion.div>
                      ) : thisMonth.length === 0 &&
                        progress !== "onprogress" ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -100 }}
                          transition={{ delay: `0.4`, duration: 1 }}
                          className="text-xl mt-2 font-medium text-red-400 text-center "
                        >
                          Data of this month is empty
                        </motion.div>
                      ) : (
                        filteredStatus?.map((e, index) => {
                          let fromDate = new Date(
                            e.fromDate
                          ).toLocaleDateString("id", optionDateString);
                          let toDate = new Date(e.toDate).toLocaleDateString(
                            "id",
                            optionDateString
                          );

                          if (isRow)
                            return (
                              <RowView
                                data={e}
                                key={index}
                                id={e.id}
                                name={name}
                                image={image}
                                role={role}
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
                                getData={goal.isAll ? getData : getAsUser}
                                handleChange={handleChange}
                                length={index}
                                multiId={multiId.length > 0 ? true : false}
                              />
                            );
                          else
                            return (
                              <ColView
                                data={e}
                                key={index}
                                id={e.id}
                                name={name}
                                image={image}
                                role={role}
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
                                getData={goal.isAll ? getData : getAsUser}
                                length={index}
                              />
                            );
                        })
                      )}
                    </div>
                  </motion.div>
                );
              })}
              <div></div>
            </AnimatePresence>
          </motion.div>
        </Scrollbars>
      </motion.div>
    </div>
  );
};

export default Goals;
