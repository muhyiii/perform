import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import {
  functionGetGoalsById,
  functionUpdateGoal,
  functionUpdateGoalImage,
} from "../../redux/actions/goalsAction";
import {
  functionGetMeasuredActivityById,
  functionUpdateMeasuredActivity,
} from "../../redux/actions/maAction";
import Loadings from "../../Component/Loading";
import { Player } from "@lottiefiles/react-lottie-player";
import ReviewsProvider from "../../Component/Support/ReviewsProvider";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { date } from "yup";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MaDetail = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [user, setUser] = React.useState({});
  const [goal, setGoal] = React.useState({});
  const [yearDate, setYearDate] = React.useState([]);
  const uploadImage = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [allDates, setAllDates] = React.useState([]);
  const [previewSource, setPreviewSource] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  function getAllDaysInYear() {
    const now = new Date();

    let year = now.getFullYear();
    const date = new Date(year, 0, 1);
    const dates = [];
    while (date.getFullYear() === year) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return setAllDates(dates);
  }
  console.log(allDates);
  const getData = async () => {
    const response = await dispatch(functionGetMeasuredActivityById(id));
    if (response.status === "Success") {
      console.log(response.data);
      setData(response.data);
      setUser(response.data.users[0]);
      setGoal(response.data.goals[0]);
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
        getData();
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
    getData();
    getAllDaysInYear();
  }, [id]);
  let fromDate = new Date(data.fromDate).toLocaleDateString("id", options);
  let toDate = new Date(data.toDate).toLocaleDateString("id", options);
  let filteredDates = allDates.filter(
    (e) =>
      new Date(e).getTime() >= new Date(data.fromDate).getTime() &&
      new Date(e).getTime() <= new Date(data.toDate).getTime()
  );
  // console.log(new Date(data[0].fromDate).getTime());
  console.log(filteredDates);
  const dataa = [{ name: "Page A", uv: 40, pv: 20, amt: 24 }];
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
            src={previewSource ? previewSource : data.image}
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
      <div className=" flex  w-full p-10 space-x-5 h-screen overflow-hidden">
        <div className="w-[35%] space-y-5 h-[100%]  relative">
          <div className="h-[7%]  ">
            <h1 className="text-3xl font-bold ">
              {" "}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hover:cursor-pointer hover:text-blue-700 "
                onClick={() => {
                  navigate(-1);
                }}
              >
                Measure Activity
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
                valueEnd={data.rate}
                size={12}
              ></ReviewsProvider>
              {data.rate === 100 ? (
                <p className="text-center mt-5 font-semibold">Completed</p>
              ) : (
                <div className="flex justify-center mt-5">
                  {" "}
                  <motion.button
                    onClick={() => {
                      if (
                        data.status === "to-do" ||
                        data.status === "ongoing"
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
                                data.status !== "ongoing"
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
                                    updateStatusMa(data.maId, value);
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
              {data.image === null ? (
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
                    src={data.image}
                    className="h-40 rounded-md shadow-md drop-shadow-md"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[69%]  bg-white shadow-lg   mr-5 rounded-xl p-5 capitalize relative">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">{data.task}</h1>
            <p className="font-semibold">
              from <span className="">{fromDate}</span> to{" "}
              <span className="text-red-700 font-bold">{toDate}</span>
            </p>
          </div>

          <div>
            <p>{data.description}</p>
          </div>
          <div className="w-full bg-slate-100">
            {/* <div className="flex w-full justify-between h-[400px] relative bg-slate-500">
              {filteredDates.map((e, index) => {
                return (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full bg-red-500 ${
                      index === 2 ? "mt-[200px]" : "mt-[396px]"
                    }  flex justify-center`}
                  >
                    <svg width="500" height="500">
                      <line x1=""  y1="" x2="" y2="" stroke="black" />
                    </svg>
                  </div>
                );
              })}
            </div> */}
            <LineChart
              width={750}
              
              height={400}
              data={{}}
              margin={{ top: 15, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaDetail;
