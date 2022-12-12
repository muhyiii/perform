/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { functionGetUsers } from "../../redux/actions/authAction";
import { functionGetGoalsByUserNow } from "../../redux/actions/goalsAction";
import Loadings from "../../Component/Loading";
import { functionAddMeasuredActivity } from "../../redux/actions/maAction";
import { useLocation, useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { FiChevronDown } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { functionGetPeriods } from "../../redux/actions/periodActions";

const AddMA = (props) => {
  let [users, setUsers] = React.useState([]);
  let [goals, setGoals] = React.useState([]);
  let [selectedUser, setSelectedUser] = React.useState("");
  const [openUser, setOpenUser] = React.useState(false);
  let [selectedGoal, setSelectedGoal] = React.useState("");
  const [openGoal, setOpenGoal] = React.useState(false);
  const [periods, setPeriods] = React.useState([]);
  let [selectedPeriod, setSelectedPeriod] = React.useState("");
  const [openPeriod, setOpenPeriod] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [method, setMethod] = React.useState();
  const toDay = new Date().toISOString().substring(0, 10);
  const [modalMethod, setModalMethod] = React.useState(false);
  let [data, setData] = React.useState({
    userId: 0,
    goalId: 0,
    task: "",
    description: "",
    fromDate: toDay,
    toDate: toDay,
  });
  // SUBMIT
  const sendData = async () => {
    console.log(data);

    if (
      data.description === "" ||
      data.fromDate === "" ||
      data.toDate === "" ||
      data.task === "" ||
      data.userId === 0 ||
      data.idGoal === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please fill the input requirement.",
        timer: 3000,
      });
    }

    const response = await dispatch(functionAddMeasuredActivity(data));
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
        props.getData();
        navigate(".", { replace: true, state: { isAddMA: false } });
      }, 1000);
      //   await dispatch(props.getData());
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
        timer: 3000,
      });
  };

  const getDataUsers = async () => {
    const response = await dispatch(functionGetUsers());
    if (response.status === "Success") {
      setUsers(response.data.rows);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const getDataGoalAfterUser = async () => {
    const response = await dispatch(functionGetGoalsByUserNow(data.userId));
    if (response.status === "Success") {
      setGoals(response.data.rows);
      // console.log(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
  React.useEffect(() => {
    setIsLoading(true);
    getDataUsers();
    getPeriod();
  }, []);
  ///////////////////////
  React.useEffect(() => {
    getDataGoalAfterUser();
  }, [data.userId]);

  return (
    <motion.div>
      <div data-cy="modal-add" variant="primary" className="">
        <motion.div className="w-[450px] pb-5 bg-white rounded-lg shadow-lg relative overflow-auto h-[700px]   ">
          {" "}
          <Scrollbars autoHide style={{ height: "100%" }}>
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
                <div className=" text-white bg-gradient-to-tr from-[#101424] to-[#091546] p-5 ">
                  <h1 className="text-2xl font-semibold ">
                    Add Measured Activity
                  </h1>
                  <p className="text-sm ">
                    Adding submission measured activity of goal target
                  </p>
                </div>
                <div className="px-5 mt-5">
                  <div className="mb-3 relative">
                    <p className="text-sm pl-2">Name</p>
                    <div
                      onClick={() => {
                        setOpenUser(!openUser);
                        setOpenGoal(false);
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
                  <div className="mb-3 relative">
                    <p className="text-sm pl-2">Goal</p>
                    <div
                      onClick={() => {
                        if (data.userId === 0)
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "You must choose user first!",
                          });
                        else {
                          setOpenGoal(!openGoal);
                          setOpenUser(false);
                        }
                      }}
                      className={`border hover:cursor-pointer focus:border-black rounded-md w-full py-2 outline-none px-2  capitalize flex justify-between items-center`}
                    >
                      {selectedGoal
                        ? selectedGoal?.length > 25
                          ? selectedGoal?.substring(0, 25) + "..."
                          : selectedGoal
                        : "Select Goal"}
                      <BiChevronDown />
                    </div>
                    <div
                      className={`bg-white shadow-lg  capitalize mt-2 rounded-md   w-full mr-10 left-0 ${
                        openGoal
                          ? goals.length !== 0
                            ? "h-[100px] absolute left-0  "
                            : "h-[40px]"
                          : "max-h-0"
                      } `}
                    >
                      <Scrollbars
                        autoHide
                        style={{
                          height: "100%",
                        }}
                      >
                        {goals.length !== 0 ? (
                          goals?.map((e, index) => (
                            <p
                              onClick={() => {
                                setSelectedGoal(e.task);
                                setData({ ...data, goalId: e.id });
                                setOpenGoal(false);
                              }}
                              className={`p-2 text-sm hover:bg-gray-200 hover:text-black hover:cursor-pointer`}
                              value={`${e.id}`}
                              key={index}
                            >
                              {e.task}
                            </p>
                          ))
                        ) : (
                          <p
                            className=" p-2 hover:bg-gray-200  hover:text-black text-red-600 font-semibold hover:cursor-pointer"
                            onClick={() => {
                              Swal.fire({
                                title: "Goals of this user is undefined.",
                                text: "You must create goal first.",
                                icon: "warning",
                                showCancelButton: true,
                                allowOutsideClick: false,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, create it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  console.log(location);
                                  navigate("/acc/goals", {
                                    state: {
                                      isAddGoal: true,
                                      prevPath: location.pathname,
                                    },
                                  });
                                }
                              });
                            }}
                          >
                            Goals is undefined
                          </p>
                        )}
                      </Scrollbars>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm pl-2">Task</p>
                    <input
                      type="text"
                      className="border rounded-md w-full py-2 outline-none px-2 placeholder:italic "
                      placeholder="Input description here"
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
                      className="border rounded-md w-full py-2 outline-none px-2 placeholder:italic "
                      placeholder="Input task here"
                      onChange={(e) => {
                        setData({
                          ...data,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className={`w-full  mb-4 capitalize`}>
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
                        className={`grid grid-cols-2 gap-x-5 opacity-0 ${
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
                              openPeriod ? "h-[100px] absolute left-0  " : "h-0"
                            } `}
                          >
                            <Scrollbars autoHide style={{ height: " 100%" }}>
                              {periods.length !== 0 ? (
                                periods?.map((e, index) => (
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
                                ))
                              ) : (
                                <p
                                  className=" p-2 hover:bg-gray-200  hover:text-black text-red-600 font-semibold hover:cursor-pointer"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Peroid is emtpy.",
                                      text: "You must create period first.",
                                      icon: "warning",
                                      showCancelButton: true,
                                      allowOutsideClick: false,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, create it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        console.log(location);
                                        navigate("/acc/archives", {
                                          state: {
                                            isArchivePage: false,
                                            isAddPeriods: true,
                                            prevPath: location.pathname,
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
            )}{" "}
          </Scrollbars>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddMA;
