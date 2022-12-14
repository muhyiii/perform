/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { functionGetUsers } from "../../redux/actions/authAction";
import { functionAddGoal } from "../../redux/actions/goalsAction";
import { useLocation, useNavigate } from "react-router-dom";
import Loadings from "../../Component/Loading";
import Scrollbars from "react-custom-scrollbars-2";
import { FiChevronDown } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { functionGetPeriods } from "../../redux/actions/periodActions";

const AddGoals = (props) => {
  let [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [method, setMethod] = React.useState();
  let [selectedUser, setSelectedUser] = React.useState("");
  const [openUser, setOpenUser] = React.useState(false);
  const [periods, setPeriods] = React.useState([]);
  let [selectedPeriod, setSelectedPeriod] = React.useState("");
  const [openPeriod, setOpenPeriod] = React.useState(false);
  const [modalMethod, setModalMethod] = React.useState(false);

  const toDay = new Date().toISOString().substring(0, 10);
  let [data, setData] = React.useState({
    userId: 0,
    task: "",
    description: "",
    fromDate: toDay,
    toDate: toDay,
  });
  // SUBMIT
  const sendData = async () => {
    console.log(data);
    setIsLoading(true);
    if (
      data.description === "" ||
      data.fromDate === "" ||
      data.toDate === "" ||
      data.task === "" ||
      data.userId === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please fill the input requirement.",
        timer: 3000,
      });
    } else {
      const response = await dispatch(functionAddGoal(data));
      console.log(response);
      if (response.status === "Success") {
        props.onClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.messege,
          showConfirmButton: false,
          timer: 1000,
        });
        setData({});
        setTimeout(() => {
          if (location.state.prevPath)
            navigate(location.state.prevPath, {
              replace: true,
              state: { isAddMA: true },
            });
          else {
            props.getData();
            navigate(".", { state: { isAddGoal: false }, replace: true });
          }
        }, 1000);
        setIsLoading(false);
      }
      if (response.status !== "Success")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.messege,
          timer: 3000,
        });
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
  const getDataUsers = async () => {
    setIsLoading(true);
    const response = await dispatch(functionGetUsers());
    if (response.status === "Success") {
      setUsers(response.data.rows);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getDataUsers();
    getPeriod();
    console.log(location);
    if (location.state.dataSession) {
      setData({
        task: location.state.dataSession.task,
        description: location.state.dataSession.description,
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {/* {props.AddGoals && ( */}
      <motion.div>
        <div data-cy="modal-add" variant="primary" className="rounded-lg">
          <motion.div className="w-[450px] pb-8 bg-white rounded-lg shadow-lg relative h-[650px]   ">
            <Scrollbars autoHide style={{ height: "100%" }}>
              {" "}
              {isLoading ? (
                <Loadings />
              ) : (
                <div>
                  {" "}
                  <div
                    className="top-3 right-3 absolute cursor-pointer"
                    onClick={props.onClose}
                  >
                    <CgClose size={30} color={"white"} />
                  </div>
                  <div className="p-5 pt-6 rounded-t-lg text-white bg-gradient-to-tr from-[#101424] to-[#091546]  ">
                    <h1 className="text-3xl font-semibold ">Add Goals</h1>
                    <p className="text-sm ">Adding goals for another person</p>
                  </div>
                  <div className="px-5 mt-10 ">
                    <div className="mb-3 relative">
                      <p className="text-sm pl-2">Name</p>
                      <div
                        onClick={() => {
                          setOpenUser(!openUser);
                        }}
                        className={`border hover:cursor-pointer focus:border-black rounded-md w-full py-2 outline-none px-2  capitalize flex justify-between items-center`}
                      >
                        {selectedUser
                          ? selectedUser?.length > 25
                            ? selectedUser?.substring(0, 25) + "..."
                            : selectedUser
                          : "Select User"}
                        <BiChevronDown />
                      </div>
                      <div
                        className={`bg-white z-10 shadow-lg  capitalize mt-2 rounded-md   w-full mr-10 left-0 ${
                          openUser ? "h-[100px] absolute left-0  " : "h-0"
                        } `}
                      >
                        <Scrollbars autoHide style={{ height: " 100%" }}>
                          {users?.map((e, index) => (
                            <p
                              onClick={() => {
                                setSelectedUser(e.name);
                                setData({ ...data, userId: e.id });
                                setOpenUser(false);
                              }}
                              className={`p-2 text-sm hover:bg-gray-200  hover:text-black hover:cursor-pointer`}
                              value={`${e.id}`}
                              key={index}
                            >
                              {e.name}
                            </p>
                          ))}{" "}
                        </Scrollbars>
                      </div>{" "}
                    </div>

                    <div className="mb-3">
                      <p className="text-sm pl-2">Task</p>
                      <input
                        type="text"
                        className="border focus:border-black rounded-md w-full py-2 outline-none px-2 placeholder:italic "
                        placeholder="Input task here"
                        value={data.task}
                        onChange={(e) => {
                          setData({
                            ...data,
                            task: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <p className="text-sm pl-2">Description</p>
                      <textarea
                        type="text"
                        className="border focus:border-black rounded-md w-full py-2 outline-none px-2 placeholder:italic "
                        placeholder="Input description here"
                        value={data.description}
                        onChange={(e) => {
                          setData({
                            ...data,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className={`w-full  mb-4`}>
                      <p className="text-sm pl-2">Method Date</p>{" "}
                      <div className={` flex justify-between relative `}>
                        {" "}
                        <div
                          onClick={() => setModalMethod(!modalMethod)}
                          className=" w-1/2 flex justify-between items-center border focus:border-black rounded-md  py-2 outline-none px-2 "
                        >
                          <p>{method ? method : "Select method of date"}</p>
                          <FiChevronDown />
                        </div>
                        {modalMethod && (
                          <div
                            className="absolute right-0 z-20 h-24 w-full flex justify-end "
                            onClick={() => setModalMethod(false)}
                          >
                            <div className=" w-1/3 p-1  bg-white shadow-xl rounded-md drop-shadow-md  border-dashed">
                              <p
                                onClick={() => {
                                  setMethod("period");
                                  setModalMethod(false);
                                }}
                                className=" px-5 py-2  hover:bg-gray-100 hover:cursor-pointer"
                              >
                                Period
                              </p>
                              <div
                                onClick={() => {
                                  setMethod("date range");
                                  setModalMethod(false);
                                }}
                                className=" px-5 py-2  hover:bg-gray-100 hover:cursor-pointer"
                              >
                                Date Range
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      {method === "date range" ? (
                        <div
                          className={`grid grid-cols-2 gap-x-5  opacity-0 ${
                            method === "date range" && "opacity-100"
                          }`}
                        >
                          <div className="mb-3">
                            <p className="text-sm pl-2">From Date</p>{" "}
                            <input
                              className=" border focus:border-black rounded-md w-full py-2 outline-none px-2 "
                              type="date"
                              name="fromDate"
                              id="fromDate"
                              value={data.fromDate}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  fromDate: e.target.value,
                                });
                              }}
                            />
                          </div>

                          <div className="mb-3">
                            <p className="text-sm pl-2">To Date</p>{" "}
                            <input
                              className="border focus:border-black rounded-md w-full py-2 outline-none px-2 "
                              type="date"
                              name="toDate"
                              id="toDate"
                              min={data.fromDate}
                              value={data.toDate}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  toDate: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        method === "period" && (
                          <div className="mb-3 relative">
                            <p className="text-sm pl-2">Period</p>
                            <div
                              onClick={() => {
                                setOpenPeriod(!openPeriod);
                              }}
                              className={`border hover:cursor-pointer focus:border-black rounded-md w-full py-2 outline-none px-2  capitalize flex justify-between items-center`}
                            >
                              {selectedPeriod
                                ? selectedPeriod?.length > 25
                                  ? selectedPeriod?.substring(0, 25) + "..."
                                  : selectedPeriod
                                : "Select Period"}
                              <BiChevronDown />
                            </div>
                            <div
                              className={`bg-white z-10 shadow-lg  capitalize mt-2 rounded-md   w-full mr-10 left-0 ${
                                openPeriod
                                  ? "h-[100px] absolute left-0  "
                                  : "h-0"
                              } `}
                            >
                              <Scrollbars autoHide style={{ height: " 100%" }}>
                                {periods.length !== 0 ? (
                                  <div>
                                    {periods?.map((e, index) => (
                                      <p
                                        onClick={() => {
                                          setSelectedPeriod(e.period);
                                          setData({
                                            ...data,
                                            fromDate: e.fromDate,
                                            toDate: e.toDate,
                                          });
                                          setOpenPeriod(false);
                                        }}
                                        className={`p-2 text-sm hover:bg-gray-200  hover:text-black hover:cursor-pointer`}
                                        value={`${e.id}`}
                                        key={index}
                                      >
                                        {e.period}
                                      </p>
                                    ))}
                                    <p
                                      className=" p-2 hover:bg-gray-200  hover:text-black text-red-600 font-semibold hover:cursor-pointer"
                                      onClick={() => {
                                        Swal.fire({
                                          title: "Period is not emtpy.",
                                          text: "You want to add new period?.",
                                          icon: "warning",
                                          showCancelButton: true,
                                          allowOutsideClick: false,
                                          confirmButtonColor: "#3085d6",
                                          cancelButtonColor: "#d33",
                                          confirmButtonText:
                                            "Yes, i want add !",
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            console.log(location);
                                            navigate("/acc/archives", {
                                              state: {
                                                isAddPeriods: true,
                                                isArchivePage: false,
                                                prevPath: location.pathname,
                                                isAdd: true,
                                                dataSession: data,
                                              },
                                            });
                                          }
                                        });
                                      }}
                                    >
                                      Add Period
                                    </p>
                                  </div>
                                ) : (
                                  <p
                                    className=" p-2 hover:bg-gray-200  hover:text-black text-red-600 font-semibold hover:cursor-pointer"
                                    onClick={() => {
                                      Swal.fire({
                                        title: "Period is emtpy.",
                                        text: "You must create period first.",
                                        icon: "warning",
                                        showCancelButton: true,
                                        allowOutsideClick: false,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, create it!",
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          localStorage.setItem(
                                            "addGoal",
                                            JSON.stringify(data)
                                          );
                                          console.log(location);
                                          navigate("/acc/archives", {
                                            state: {
                                              isAddPeriod: true,
                                              isArchivePage: false,
                                              prevPath: location.pathname,
                                              isAdd: true,
                                              dataSession: data,
                                            },
                                          });
                                        }
                                      });
                                    }}
                                  >
                                    Period is emtpy
                                  </p>
                                )}
                              </Scrollbars>
                            </div>{" "}
                          </div>
                        )
                      )}
                    </div>

                    <div className=" w-full absolute left-0 px-10 bottom-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="  w-full border rounded-md  py-2 my-5 outline-none px-2 hover:bg-blue-400 hover:text-white hover:font-semibold uppercase transition-colors duration-500 ease-linear "
                        onClick={sendData}
                      >
                        Send
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </Scrollbars>
          </motion.div>
        </div>
      </motion.div>
      {/* )} */}
    </AnimatePresence>
  );
};

export default AddGoals;
