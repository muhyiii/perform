import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { functionGetGoalsById, functionUpdateGoal } from "../../redux/actions/goalsAction";
import {
  functionGetMeasuredActivityByGoalId,
  functionUpdateMeasuredActivity,
} from "../../redux/actions/maAction";
import Loadings from "../../Component/Loading";
import { Player } from "@lottiefiles/react-lottie-player";
import ReviewsProvider from "../../Component/Support/ReviewsProvider";
import Swal from "sweetalert2";

const GoalsDetail = () => {
  const [goal, setGoal] = React.useState({});
  let { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [ma, setMa] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const updateStatusGoal = async (id, status) => {
    console.log(status);
    const response = await dispatch(functionUpdateGoal(id, status));
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
      }, 500);
    }
    if (response.status !== "Success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
    }
  };
  const getGoalById = async () => {
    const response = await dispatch(functionGetGoalsById(id));
    if (response.status === "Success") {
      console.log(response.data);
      setGoal(response.data);
      setUser(response.data.users[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const updateStatusMa = async (id, status, archive) => {
    console.log(id, status);
    const response = await dispatch(
      functionUpdateMeasuredActivity(id, status, archive)
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
    if (response.status !== "Success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
    }
  };
  const getMaByGoalId = async () => {
    const response = await dispatch(
      functionGetMeasuredActivityByGoalId(goal.id)
    );
    if (response.status === "Success") {
      console.log(response.data.rows);
      setMa(response.data.rows);
      setTimeout(() => {
        // setIsLoading(false);
      }, 500);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getMaByGoalId();
  }, [goal.id]);
  React.useEffect(() => {
    setIsLoading(true);
    getGoalById();
  }, [id]);
  let fromDate = new Date(goal.fromDate).toLocaleDateString("id", options);
  let toDate = new Date(goal.toDate).toLocaleDateString("id", options);

  if (isLoading) return <Loadings />;
  return (
    <div className="grid grid-cols-12  w-full p-10 space-x-5 h-screen overflow-hidden">
      <div className=" col-span-3 h-full space-y-5  relative">
        <div className="  ">
          <h1 className="text-5xl font-bold ">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:cursor-pointer hover:text-blue-700 "
              onClick={() => {
                navigate(-1);
              }}
            >
              Goal
            </motion.button>{" "}
            Detail
          </h1>
        </div>
        <div className="bg-gradient-to-tr from-slate-300 to-white rounded-lg h-3/5  shadow-lg">
          <div className="m-auto text-center pt-10 capitalize ">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-sm">{user.role}</p>
          </div>
          <div className="mt-10 w-1/2 m-auto ">
            <ReviewsProvider
              valueStart={0}
              valueEnd={goal.rate}
              size={12}
            ></ReviewsProvider>
            {goal.rate === 100 ? (
              <p className="text-center mt-5 font-semibold">Completed</p>
            ) : (
              <div className="flex justify-center mt-5">
                {" "}
                <motion.button
                  onClick={() => {
                    if (goal.status === "to-do" || goal.status === "ongoing") {
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
                            inputOptions:
                              goal.status !== "ongoing"
                                ? {
                                    ongoing: "Ongoing",
                                    hold: "Hold",
                                    done: "Done",
                                  }
                                : {
                                    hold: "Hold",
                                    done: "Done",
                                  },
                            inputPlaceholder: "Select a status",
                            showCancelButton: true,
                            inputValidator: (value) => {
                              return new Promise((resolve) => {
                                if (
                                  value === "done" ||
                                  value === "Hold" ||
                                  value === "ongoing"
                                ) {
                          
                                  updateStatusGoal(goal.goalId, value);
                                  navigate(0)
                                } else {
                                  resolve(
                                    "Choose the next stage of your status"
                                  );
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
                        text: "You cannot update to stage before!",
                      });
                    }
                  }}
                  className="bg-slate-300 px-5 py-1 rounded-md uppercase text-sm font-medium h-7 m-auto text-center"
                >
                  Update
                </motion.button>
              </div>
            )}
          </div>
        </div>
        <div className="h-1/4  w-full bg-gradient-to-br from-white to-slate-100 py-5 rounded-md flex justify-center shadow-md ">
          <div>{goal.image === null ? <p>no image</p> : goal.image}</div>
        </div>
      </div>
      <div className="col-span-9  bg-white shadow-lg   mr-5 rounded-xl p-5 capitalize relative">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{goal.task}</h1>
          <p className="font-semibold">
            from <span className="">{fromDate}</span> to{" "}
            <span className="text-red-700 font-bold">{toDate}</span>
          </p>
        </div>

        <div>
          <p>{goal.description}</p>
        </div>
        <div className="flex justify-between">
          <h1
            className="
        my-5 text-2xl font-bold"
          >
            Measured Activities
          </h1>
        </div>
        <p className="border-b-2  w-full my-1 "></p>
        <div>
          {isLoading ? (
            <div className="absolute z-50 h-screen flex items-center backdrop-blur-sm w-full justify-center ">
              <div className="">
                <Player
                  autoplay
                  loop
                  src={
                    "https://lottie.host/3425dfb9-3688-4154-8741-ce55a06174ea/d70t0oUroc.json"
                  }
                  style={{ height: "100px", width: "100px" }}
                ></Player>
              </div>
            </div>
          ) : ma.length !== 0 ? (
            <div>
              <div className="grid grid-cols-12  px-2 py-2 mt-3">
                <p
                  className="font-medium col-span-2"
                  title="It will show you about this task Title"
                >
                  Task
                </p>
                <p
                  className="font-medium col-span-3"
                  title=" It will explain you about this task "
                >
                  Description
                </p>
                <p className="font-medium col-span-3" title="Date to Date ">
                  Date To Date
                </p>
                <p
                  className="font-medium col-start-10 col-span-2"
                  title="It will show you about this task STATUS"
                >
                  Status
                </p>
              </div>

              <p className="border-b-2  w-full my-2 "></p>
              <div className="space-y-2">
                {ma?.map((e) => {
                  let maFromDate = new Date(e.fromDate).toLocaleDateString(
                    "id",
                    options
                  );
                  let maToDate = new Date(e.toDate).toLocaleDateString(
                    "id",
                    options
                  );
                  return (
                    <div
                      key={e.id}
                      onClick={() => navigate(`/acc/ma/${e.maId}`)}
                      className="border grid grid-cols-12 items-center rounded-lg px-2 py-1 shadow-sm hover:cursor-pointer hover:shadow-lg"
                    >
                      <h1 className=" truncate hover:text-clip col-span-2">
                        {e.task}
                      </h1>
                      <h1 className=" truncate hover:text-clip col-span-3">
                        {e.description}
                      </h1>

                      <h1 className=" truncate hover:text-clip col-span-3 text-sm">
                        {maFromDate} -{" "}
                        <span className="text-red-500">{maToDate}</span>
                      </h1>
                      <h1 className=" truncate hover:text-clip col-start-10 col-span-2">
                        {e.status}
                      </h1>
                      {(e.status === "to-do" || e.status === "ongoing") && (
                        <button
                          className=" h-min m-auto p-2 rounded-xl col-start-12"
                          onClick={() => {
                            if (
                              e.status === "to-do" ||
                              e.status === "ongoing"
                            ) {
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
                                    inputOptions:
                                      e.status !== "ongoing"
                                        ? {
                                            ongoing: "Ongoing",
                                            hold: "Hold",
                                            done: "Done",
                                          }
                                        : {
                                            hold: "Hold",
                                            done: "Done",
                                          },
                                    inputPlaceholder: "Select a status",
                                    showCancelButton: true,
                                    inputValidator: (value) => {
                                      return new Promise((resolve) => {
                                        if (value !== e.status) {
                                          updateStatusMa(e.maId, value, false);
                                        } else {
                                          resolve(
                                            "You can only update to next stage"
                                          );
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
                                text: "You cannot update to stage before!",
                              });
                            }
                          }}
                        >
                          <BiEditAlt></BiEditAlt>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="items-center py-22 text-center ">
              <p className="pt-5 font-bold">Nothing to show here,</p>
              <p className="pb-5 text-sm">
                measured activity of this goal is undefined
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  navigate(`/acc/ma`, {
                    state: { isAddMA: true },
                    replace: true,
                  })
                }
                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-2 rounded-2xl font-medium  justify-center shadow-lg"
              >
                Add Measured Activities
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsDetail;
