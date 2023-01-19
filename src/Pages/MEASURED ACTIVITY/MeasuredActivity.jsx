/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  MdSearch,
  MdOutlineCancel,
  MdDelete,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import User from "../../Component/User";
import AddMA from "./AddMA";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  functionDeleteMultiMeasuredActivity,
  functionGetMeasuredActivities,
  functionGetMeasuredActivityByUserNow,
  functionUpdateMultiMeasuredActivity,
} from "../../Redux/Actions/MA_ACTION";
import ListView from "./MA COMPONENT/ListView";
import Loadings from "../../Component/Loading";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import Scrollbars from "react-custom-scrollbars-2";
import { HiPencil } from "react-icons/hi";
import { IoArchiveOutline } from "react-icons/io5";

const Ma = () => {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const isAll = useSelector((state) => state.MA_REDUCER.isAll);
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [progress, setProgress] = React.useState("onprogress");
  const [thisDateMonth, setThisDateMonth] = React.useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const [multiId, setMultiId] = React.useState([]);
  const [multiStatus, setMultiStatus] = React.useState([]);
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

  const getData = async () => {
    const response = await dispatch(functionGetMeasuredActivities());
    if (response.status === "Success") {
      const notArhive = response.data.rows.filter((e) => e.isArchive === false);
      setData(notArhive);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const getDataUserNow = async () => {
    const response = await dispatch(
      functionGetMeasuredActivityByUserNow(decoded.id)
    );
    if (response.status === "Success") {
      const notArhive = response.data.rows.filter((e) => e.isArchive === false);
      setData(notArhive);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  //// DELETE MULTI MA
  const deleteMultiMa = async () => {
    const response = await dispatch(
      functionDeleteMultiMeasuredActivity(multiId)
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
        navigate(".");
        isAll ? getData() : getDataUserNow();
        setMultiId([]);
      }, 1000);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
  };

  //// UPDATE MULTI MA
  const updateMultiMa = async (value, archive) => {
    const response = await dispatch(
      functionUpdateMultiMeasuredActivity(multiId, value, archive)
    );
    // console.log(response);
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        navigate(".");
        setMultiId([]);
        isAll ? getData() : getDataUserNow();
      }, 1000);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
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
    return setThisDateMonth(dates);
  }

  //////////////////////
  const filteredQuery =
    query === ""
      ? data
      : data.filter(
          (e) =>
            e.task.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.goals[0].task.toLowerCase().includes(query) ||
            e.users[0].name.toLowerCase().includes(query)
        );
  const thisMonth =
    progress === "onprogress"
      ? filteredQuery.filter(
          (e) => new Date(e.toDate).getTime() >= new Date(Date()).getTime()
          // : null
        )
      : filteredQuery;
  // console.log(filteredQuery);
  const filteredStatus =
    status === "" ? thisMonth : thisMonth.filter((e) => e.status === status);

  React.useEffect(() => {
    setIsLoading(true);
    getAllDaysInMonth();
    isAll ? getData() : getDataUserNow();
  }, [isAll]);
  if (isLoading) return <Loadings />;
  return (
    <div className={`overflow-hidden relative  h-screen`}>
      <User />
      <div className="px-10 pt-5  mb-1 w-full">
        <AnimatePresence>
          {location.state?.isAddMA && (
            <motion.div
              className=" absolute    flex justify-center items-center backdrop-blur-[2px] z-20 modal  inset-0   hsc "
              initial={{ y: -100 }}
              animate={{
                y: 0,
                transitionEnd: {
                  background: "rgba(0, 0, 0, 0.7)",
                },
              }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <AddMA
                getData={isAll ? getData : getDataUserNow}
                onClose={() =>
                  navigate(".", { state: { isAddMA: false }, replace: true })
                }
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
          {decoded.position === "atasan" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="py-1 px-3 bg-white ring-1 ring-blue-400 rounded-full hover:ring-2 hover:bg-blue-400 hover:text-white font-semibold hover:shadow-md"
              onClick={() =>
                navigate(".", { state: { isAddMA: true }, replace: false })
              }
            >
              Create New Measure Activity
            </motion.button>
          )}
        </div>
        {/* NAV ////////////>....................... */}

        {/* NAV ////////////>....................... */}

        <div className="text-black flex my-3 justify-between">
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
                className=" flex space-x-5 appearance-none outline-none px-2  rounded-md hover:cursor-pointer"
                onChange={(e) => {
                  setStatus(e.target.value);
                  setMultiId([]);
                }}
                value={status}
              >
                <option value="">All</option>
                <option value={"to-do"}>To Do</option>
                <option value={"ongoing"}>Ongoing </option>
                <option value={"hold"}>Hold</option>
                <option value={"done"}>Done</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={` space-x-5  text-white ring-1 py-1 rounded-full group px-5 font-medium ${
                isAll ? "ring-2 bg-blue-400 text-white" : " bg-black"
              }`}
              onClick={() => {
                dispatch({ type: "CHANGE_ALL_MA" });
                setMultiId([]);
              }}
            >
              {isAll ? "Show All" : "Only showing me"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white ring-1 ring-blue-400 py-1 text-black font-semibold rounded-full px-5 hover:bg-blue-400 hover:text-white shadow-lg"
            >
              Export CSV
            </motion.button>
          </div>
        </div>

        <p className="border-b-2 mt  w-full my-2 "></p>
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
                              updateMultiMa(value, false);
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
            {decoded.position === "atasan " && (
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
                    confirmButtonText: "Yes, archive it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      updateMultiMa(null, true);
                    }
                  });
                }}
                className="px-2 space-x-1 py-1 bg-green-500 my-1 rounded-lg mx-3 shadow-md flex items-center"
              >
                <IoArchiveOutline />
                <span>Archive</span>
              </motion.button>
            )}

            {decoded.position === "atasan " && (
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
                      deleteMultiMa();
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
      <motion.div layout className="mt-2 overflow-auto h-[75%]">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <motion.div layout className="px-10">
            <AnimatePresence>
              {data?.length === 0 ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ delay: `0.4`, duration: 1 }}
                  className="text-xl mt-2 font-medium text-red-400 text-center"
                >
                  Data of Measured Activity is empty...
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
                  className="text-xl mt-2 font-medium text-red-400 text-center"
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
                  className="text-xl mt-2 font-medium text-red-400 text-center col-span-12"
                >
                  Cannot get data of status {status}...
                </motion.div>
              ) : thisMonth.length === 0 && progress !== "onprogress" ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ delay: `0.4`, duration: 1 }}
                  className="text-xl mt-2 font-medium text-red-400 text-center col-span-12"
                >
                  Data of this month is empty
                </motion.div>
              ) : (
                filteredStatus?.map((e, index) => (
                  <ListView
                    key={e.id}
                    data={e}
                    name={e.users[0].name}
                    role={e.users[0].role}
                    image={e.users[0].image}
                    goalTask={e.goals[0].task}
                    idUser={e.idUser}
                    idGoal={e.idGoal}
                    maId={e.maId}
                    task={e.task}
                    description={e.description}
                    status={e.status}
                    rate={e.rate}
                    value={e.value}
                    isArchive={e.isArchive}
                    fromDate={e.fromDate}
                    toDate={e.toDate}
                    createdAt={e.createdAt}
                    updatedAt={e.updatedAt}
                    handleChange={handleChange}
                    setMultiId={setMultiId}
                    getData={isAll ? getData : getDataUserNow}
                    length={index}
                    multiId={multiId}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </Scrollbars>
      </motion.div>
    </div>
  );
};

export default Ma;
