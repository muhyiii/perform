import React, { useState } from "react";
import User from "../../Component/User";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  functionAddPeriod,
  functionGetPeriods,
} from "../../Redux/Actions/PERIOD_ACTION";
import Loadings from "../../Component/Loading";
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import Scrollbars from "react-custom-scrollbars-2";
import { useLocation, useNavigate } from "react-router-dom";

function Archive() {
  const now = Date.now();
  const [state, setState] = useState({
    period: "",
    fromDate:
      new Date(now).getFullYear() +
      "-" +
      new Date(now).getDate() +
      "-" +
      new Date(now).getMonth(),
    toDate:
      new Date(now).getFullYear() +
      "-" +
      new Date(now).getDate() +
      "-" +
      new Date(now).getMonth(),
  });
  // console.log(state.fromDate);
  const [archive, setArchive] = useState(true);
  const [isAddPeriod, setIsAddPeriod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [periods, setPeriods] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const checkPeriods = periods.filter(
    (e) => e.fromDate === state.fromDate && e.toDate === state.toDate
  ).length;
  const sendData = async (e) => {
    const checkPeriods = periods.filter(
      (e) =>
        new Date(e.fromDate).getTime() === new Date(state.fromDate).getTime() &&
        new Date(e.toDate).getTime() === new Date(state.toDate).getTime()
    ).length;
    // return console.log(checkPeriods);
    e.preventDefault();
    setIsLoading(true);
    if (state.period === "" || state.fromDate === "" || state.toDate === "") {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please fill the input requirement.",
        timer: 3000,
      });
    } else {
      if (checkPeriods > 1) {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Date has already exist, please choose another date.",
          timer: 3000,
        });
      } else {
        const response = await dispatch(functionAddPeriod(state));
        if (response.status === "Success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.messege,
            showConfirmButton: false,
            timer: 1000,
          });
          setState({});
          setIsLoading(false);
          setIsAddPeriod(false);
          if (location.state.prevPath) {
            const path = location.state.prevPath.split("/")[2];
            if (path === "goals")
              navigate(location.state.prevPath, {
                state: {
                  isAddGoal: true,
                  dataSession: location.state.dataSession,
                },
              });
            else
              navigate(location.state.prevPath, {
                state: {
                  isAddMa: true,
                  dataSession: location.state.dataSession,
                },
              });
          } else {
            navigate(".", { state: { isAddPeriods: false } });
            getPeriod();
          }
        }
      }
      setIsLoading(false);
    }
  };
  const getPeriod = async () => {
    const response = await dispatch(functionGetPeriods());
    if (response.status === "Success") {
      setPeriods(response.data.rows);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  console.log(location);
  React.useEffect(() => {
    setIsLoading(true);
    getPeriod();
  }, []);
  if (isLoading) return <Loadings />;
  return (
    <div className="h-screen  relative overflow-hidden">
      <User />
      <div className="px-10 py-5 w-full h-full space-y-5">
        {/* <h1 className='text-5xl font-bold'>Archive </h1> */}
        <div className="h-1/6 flex justify-between space-x-10">
          {" "}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigate(".", { state: { isArchivePage: true } });
              setArchive(location.state.isArchivePage);
              // console.log(location.state);
            }}
            className={`h-full outline-none  w-1/3   bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-gray-900 active:bg-gray-700  flex justify-center rounded-xl items-center shadow-xl
            ${
              location.state.isArchivePage &&
              "bg-gray-700 text-gray-200 outline-none"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold justify-start rounded-xl ">
                Archive
              </h1>
            </div>
          </motion.button>
          <p className="text-lg m-auto font-medium">
            Click {location.state.isArchivePage ? "Period" : "Archive"} to see{" "}
            {location.state.isArchivePage ? "Period" : "Archive"}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigate(".", { state: { isArchivePage: false } });
              setArchive(location.state.isArchivePage);
            }}
            className={`h-full outline-none w-1/3   bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-gray-900 active:bg-gray-700  flex justify-center rounded-xl items-center shadow-xl
            ${
              !location.state.isArchivePage &&
              "bg-gray-700 text-gray-200 outline-none"
            }`}
          >
            <div className="flex items-center justify-center h-full">
              {" "}
              <h1 className="text-5xl font-semibold justify-start rounded-xl ">
                Period
              </h1>
            </div>
          </motion.button>
        </div>
        {location.state.isArchivePage ? (
          <div className="h-full space-y-4">
            <AnimatePresence>
              {" "}
              <motion.button
                layout
                initial={{ x: -200, scale: 0 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: 200 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  bounce: 0.3,
                  delay: 0.5,
                }}
                onClick={() => navigate("archive-goals")}
                key={1}
                className="h-1/3 rounded-lg w-full bg-gray-800  text-gray-200 shadow-lg "
              >
                <div className="flex items-center pl-40 h-full">
                  <h1 className="font-semibold text-4xl flex items-center">
                    <div className="bg-gray-200 text-gray-800 py-2 m-2 px-5 rounded-xl">
                      Archive
                    </div>{" "}
                    of Goals{" "}
                  </h1>
                </div>
              </motion.button>
              <motion.button
                layout
                initial={{ x: 200, scale: 0 }}
                animate={{ x: 0, scale: 1 }}
                exit={{ x: -200 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  bounce: 0.3,
                  delay: 1,
                }}
                onClick={() => navigate("archive-measured-activity")}
                key={2}
                className="h-1/3 rounded-lg w-full bg-gray-400  text-gray-700 shadow-lg "
              >
                <div className="flex items-center pl-40 h-full">
                  <h1 className="font-semibold text-4xl flex items-center">
                    <div className="bg-gray-800 text-gray-200 py-2 m-2 px-5 rounded-xl">
                      Archive
                    </div>{" "}
                    of Measured Activity{" "}
                  </h1>
                </div>
              </motion.button>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex ">
            <div className="   col-span-2 w-3/12">
              <motion.button
                onClick={() => {
                  // setIsAddPeriod(!isAddPeriod);
                  navigate(".", {
                    state: { isAddPeriods: !location.state.isAddPeriods, isArchivePage: false },
                    replace: true,
                  });
                  console.log(location.state);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`bg-white outline-blue-400 px-3 py-1 outline-1 outline rounded-md hover:bg-blue-400 hover:shadow-md hover:text-white ${
                  location.state.isAddPeriods &&
                  "bg-blue-400 text-white shadow-lg outline-blue-400 outline"
                }`}
              >
                {location.state.isAddPeriods
                  ? "Cancel Add Period"
                  : "Add New Period"}
              </motion.button>
              <AnimatePresence>
                {" "}
                {location.state.isAddPeriods && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -200, scale: 0 }}
                    animate={{ opacity: 1, x: 0, scale: 1.05 }}
                    exit={{ opacity: 0, x: -200, scale: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-3 mt-10  border px-5 py-10 rounded-lg mr-5 shadow-lg"
                  >
                    <p className="font-medium text-xl capitalize">
                      Add new date of period
                    </p>
                    <div>
                      <p className="text-xs">Title Period</p>
                      <input
                        type="text"
                        onChange={(e) =>
                          setState({ ...state, period: e.target.value })
                        }
                        className=" capitalize bg-slate-100 border w-full focus:border-black rounded px-2 py-1 outline-none shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-xs">From Date</p>
                      <input
                        type="date"
                        value={state.fromDate}
                        onChange={(e) =>
                          setState({ ...state, fromDate: e.target.value })
                        }
                        className="bg-slate-100 border w-full focus:border-black rounded px-2 py-1 outline-none shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-xs">To Date</p>
                      <input
                        type="date"
                        value={state.toDate}
                        min={state.fromDate}
                        onChange={(e) =>
                          setState({ ...state, toDate: e.target.value })
                        }
                        className="bg-slate-100 border w-full focus:border-black rounded px-2 py-1 outline-none shadow-md"
                      />
                    </div>

                    <div className="px-5 mt-20 w-full">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={sendData}
                        className="text-white shadow-md shadow-blue-400 bg-blue-400 w-full px-5 mt-5 py-1 rounded-md "
                      >
                        Submit
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-full w-9/12 mb-20  px-4">
              <hr />
              <Scrollbars
                autoHide
                style={{
                  height: "70vh",
                  margin: "2px",
                  paddingBottom: "200px",
                }}
              >
                <AnimatePresence>
                  {periods.length !== 0 ? (
                    periods.map((e, index) => {
                      let fromDate = new Date(e.fromDate).toLocaleString("id", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                      let toDate = new Date(e.toDate).toLocaleString("id", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                      return (
                        <motion.div
                          layout
                          initial={{ y: -200, scale: 0 }}
                          animate={{ y: 0, scale: 1 }}
                          exit={{ y: 200 }}
                          whileHover={{ scale: 0.95 }}
                          whileTap={{ scale: 1.05 }}
                          transition={{
                            duration: 1,
                            type: "spring",
                            bounce: 0.2,
                            delay: `0.${index + 3} `,
                          }}
                          onClick={() => {
                            navigate(`period-page/${e.period}`, {
                              state: { fromDate: e.fromDate, toDate: e.toDate },
                            });
                          }}
                          key={e.id}
                          className="hover:cursor-pointer capitalize mt-2 mr-3  bg-white px-5 py-3 shadow-md drop-shadow-md rounded-md border-l-[5px] border-l-emerald-700"
                        >
                          <hr />
                          <p className="mt-1 font-medium text-xl">{e.period}</p>
                          <p>{fromDate + " - " + toDate}</p>
                        </motion.div>
                      );
                    })
                  ) : (
                    <p>No Data To Show</p>
                  )}{" "}
                </AnimatePresence>
              </Scrollbars>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Archive;
