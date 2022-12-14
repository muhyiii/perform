import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

import {
  functionGetGoalsById,
  functionUpdateGoal,
  functionUpdateGoalImage,
} from "../../redux/actions/goalsAction";
import {
  functionGetMeasuredActivityByGoalId,
  functionUpdateMeasuredActivity,
} from "../../redux/actions/maAction";
import Loadings from "../../Component/Loading";
import { Player } from "@lottiefiles/react-lottie-player";
import ReviewsProvider from "../../Component/Support/ReviewsProvider";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";

const GoalsDetail = () => {
  const [goal, setGoal] = React.useState({});
  let { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [ma, setMa] = React.useState([]);
  const uploadImage = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [fileInputState, setFileInputState] = React.useState("");
  const [previewSource, setPreviewSource] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState();

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
        getGoalById()
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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file.type.split("/")[0] !== "image") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Choose an image!",
      });
      previewFile();
      setSelectedFile();
    } else {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
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
        getMaByGoalId();
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
  const handleSubmitFile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(selectedFile);
    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Choose an image!",
      });
    } else {
      const response = await dispatch(functionUpdateGoalImage(id, formData));
      console.log(response);
      if (response.status === "Success") {
        Swal.fire({
          title: "Succesfull!",
          text: response.messege,
          icon: "success",
          timer: 1000,
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate(0, { replace: true });
        }, 500);
      }
    }
    setIsLoading(false);
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
    <div>
      {" "}
      {show && (
        <div
          data-cy="modal-add"
          variant="primary"
          className="absolute modal z-50 h-full w-full bg-black bg-opacity-80  flex items-center justify-center "
        >
          <motion.img
            key={1}
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            exit={{ y: +100 }}
            src={previewSource ? previewSource : goal.image}
            className=" w-1/4 rounded-md shadow-lg"
          />
          <IoClose
            onClick={() => setShow(false)}
            size={25}
            color="white"
            className="absolute right-5 top-5 cursor-pointer"
          />
        </div>
      )}
      <div className="grid grid-cols-12  w-full p-10 space-x-5 h-screen overflow-hidden">
        <div className=" col-span-3 space-y-5 h-[100%]  relative">
          <div className="h-[7%]  ">
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
          <div className="bg-gradient-to-tr from-slate-300 to-white rounded-lg h-[50%]  shadow-lg">
            <div className="m-auto text-center pt-10 capitalize ">
              <h1 className="text-xl font-semibold">{user.name}</h1>
              <p className="text-sm">{user.role}</p>
            </div>
            <div className="mt-10 w-1/3 m-auto ">
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
                      if (
                        goal.status === "to-do" ||
                        goal.status === "ongoing"
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
                                    navigate(0);
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
          <div className="h-[37.5%]  w-full bg-gradient-to-br from-white to-slate-100 py-5 rounded-md flex justify-center shadow-md ">
            <div className="flex justify-center items-start text-center">
              {goal.image === null ? (
                <div className="text-xs">
                  <p className="text-sm">no image</p>
                  <p
                    className="cursor-pointer hover:underline hover:text-blue-400 "
                    title="upload image"
                    onClick={() => uploadImage.current.click()}
                  >
                    {previewSource ? "change image" : " upload image"}
                  </p>
                  <input
                    ref={uploadImage}
                    onChange={handleFileInputChange}
                    type="file"
                    className="opacity-0"
                  />
                  {previewSource && (
                    <div>
                      {" "}
                      <img
                        onClick={() => setShow(!show)}
                        src={previewSource}
                        alt="chosen"
                        className="h-24  m-auto"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-blue-400 px-5 py-1 mt-5 rounded-md text-white"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You want to set image of this goal",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, set it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              handleSubmitFile();
                            }
                          });
                        }}
                      >
                        Submit
                      </motion.button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium mb-4">Proove Image</p>
                  <img
                    onClick={() => setShow(!show)}
                    src={goal.image}
                    className="h-40 rounded-md shadow-md drop-shadow-md"
                    alt=""
                  />
                </div>
              )}
            </div>
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
                        className="border grid grid-cols-12 items-center rounded-lg px-2 py-1 shadow-sm  hover:shadow-lg"
                      >
                        <h1
                          onClick={() => navigate(`/acc/ma/${e.maId}`)}
                          className="hover:cursor-pointer truncate hover:text-clip col-span-2"
                        >
                          {e.task}
                        </h1>
                        <h1
                          onClick={() => navigate(`/acc/ma/${e.maId}`)}
                          className="hover:cursor-pointer truncate hover:text-clip col-span-3"
                        >
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
                                            updateStatusMa(
                                              e.maId,
                                              value,
                                              false
                                            );
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
    </div>
  );
};

export default GoalsDetail;
