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
  functionGetMeasuredActivities,
  functionGetMeasuredActivityByUserNow,
} from "../../redux/actions/maAction";
import ListView from "./ma component/ListView";
import Loadings from "../../Component/Loading";
import jwtDecode from "jwt-decode";

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
      if (status !== "") {
        let filtered = response.data.rows.filter((e) => e.status === status);
        setFiltered(filtered);
      }
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
      if (status !== "") {
        let filtered = response.data.rows.filter((e) => e.status === status);
        setFiltered(filtered);
      }
      setData(response.data.rows);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    isAll ? getData() : getDataUserNow();
  }, [isAll, status]);
  // React.useEffect(() => {
  //   setIsLoading(true);
  //   getData();
  // }, []);
  if (isLoading) return <Loadings />;
  return (
    <div className={`${"overflow-hidden"} relative  h-screen`}>
      <User />
      <div className="px-10 py-5   w-full">
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
        <div>
          <h1 className="text-5xl font-bold ">Measured Activity</h1>
        </div>
        {/* NAV ////////////>....................... */}

        <div className="flex justify-between items-center my-5 font-semibold ml-3">
          <div className=" flex space-x-5">
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`group `}
                onClick={() => setStatus("to-do")}
              >
                <p>
                  To Do{" "}
                  {/* <span
                    className={` px-3 py-1 bg-gray-100 group-hover:bg-slate-300 rounded-full`}
                  >
                    201
                  </span> */}
                </p>
              </motion.button>
              {status === "to-do" && (
                <div className="w-full border-b-2 border-b-black mt-2"></div>
              )}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`group `}
                onClick={() => setStatus("ongoing")}
              >
                <p>
                  Ongoing{" "}
                  {/* <span
                    className={` px-3 py-1 bg-gray-100 group-hover:bg-slate-300 rounded-full`}
                  >
                    201
                  </span> */}
                </p>
              </motion.button>
              {status === "ongoing" && (
                <div className="w-full border-b-2 border-b-black mt-2"></div>
              )}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`group `}
                onClick={() => setStatus("hold")}
              >
                <p>
                  Hold{" "}
                  {/* <span
                    className={` px-3 py-1 bg-gray-100 group-hover:bg-slate-300 rounded-full`}
                  >
                    201
                  </span> */}
                </p>
              </motion.button>
              {status === "hold" && (
                <div className="w-full border-b-2 border-b-black mt-2"></div>
              )}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`group `}
                onClick={() => setStatus("done")}
              >
                <p>
                  Done{" "}
                  {/* <span
                    className={` px-3 py-1 bg-gray-100 group-hover:bg-slate-300 rounded-full`}
                  >
                    201
                  </span> */}
                </p>
              </motion.button>
              {status === "done" && (
                <div className="w-full border-b-2 border-b-black mt-2"></div>
              )}
            </div>
          </div>
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

        <div className="text-black flex my-5 justify-between">
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

          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={` space-x-5  text-white ring-1 py-1 rounded-full group px-5 font-semibold ${
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
              className="bg-white ring-1 ring-blue-400 py-1 text-black font-semibold rounded-full px-5 hover:bg-blue-400 hover:text-white shadow-lg"
            >
              Export CSV
            </motion.button>
          </div>
        </div>

        <p className="border-b-2 w-full my-5 "></p>
        {status !== ""
          ? filtered
              ?.filter((e) => e.isArchive === false)
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
                />
              ))
          : data
              ?.filter((e) => e.isArchive === false)
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
                />
              ))}

        <div className="h-20 w-full"></div>
      </div>
    </div>
  );
};

export default Ma;
