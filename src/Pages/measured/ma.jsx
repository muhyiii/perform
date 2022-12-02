/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { MdSearch, MdOutlineCancel } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import "../measured/ma";
import User from "../../Component/User";
import AddMA from "./addMa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  functionDeleteMultiMeasuredActivity,
  functionGetMeasuredActivities,
  functionGetMeasuredActivityByUserNow,
  functionUpdateMultiMeasuredActivity,
} from "../../redux/actions/maAction";
import ListView from "./ma component/ListView";
import Loadings from "../../Component/Loading";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import Scrollbars from "react-custom-scrollbars-2";

const Ma = () => {
  const [data, setData] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [isAll, setIsAll] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
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
      // console.log(typeof(status));

      setData(response.data.rows);
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
      setData(response.data.rows);
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
        navigate(0);
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
  const updateMultiMa = async (value) => {
    const response = await dispatch(
      functionUpdateMultiMeasuredActivity(multiId, value)
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
        navigate(0);
      }, 1000);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
  };

  React.useEffect(() => {
    setIsLoading(true);
    isAll ? getData() : getDataUserNow();
  }, [isAll]);
  // React.useEffect(() => {
  //   setIsLoading(true);
  //   getData();
  // }, []);
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
                onClose={() =>
                  navigate(".", { state: { isAddMA: false }, replace: true })
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold ">Measured Activity</h1>{" "}
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
                setIsAll(!isAll);
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
                              updateMultiMa(value,);
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
              className="px-5 py-1 bg-blue-500 my-1 rounded-lg mx-3"
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
                    deleteMultiMa();
                  }
                });
              }}
              className="px-5 py-1 bg-red-500 my-1 rounded-lg mx-3"
            >
              Delete
            </motion.button>
          </div>
        )}
      </div>
      <div className="mt-2 overflow-auto h-[75%]">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <div className="px-10">
            {data
              ?.filter((e) => e.isArchive === false)
              .filter((e) =>
                status !== "" ? e.status === status : e.status !== null
              )
              ?.filter(
                (e) =>
                  e.task.toLowerCase().includes(query) ||
                  e.description.toLowerCase().includes(query) ||
                  e.goals[0].task.toLowerCase().includes(query) ||
                  e.users[0].name.toLowerCase().includes(query)
              )
              ?.map((e) => (
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
                />
              ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Ma;
