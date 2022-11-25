import React from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { functionGetUsers } from "../../redux/actions/authAction";
import {
  functionAddGoal,
  functionGetGoalsByUserNow,
} from "../../redux/actions/goalsAction";
import Loadings from "../../Component/Loading";
import { functionAddMeasuredActivity } from "../../redux/actions/maAction";
import { useNavigate } from "react-router-dom";

const AddMA = (props) => {
  let [users, setUsers] = React.useState([]);
  let [goals, setGoals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [data, setData] = React.useState({
    userId: 0,
    goalId: 0,
    task: "",
    description: "",
    fromDate: "",
    toDate: "",
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
      console.log(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataUsers();
  }, []);
  ///////////////////////
  React.useEffect(() => {
    getDataGoalAfterUser();
  }, [data.userId]);

  return (
    <AnimatePresence>
      {/* {props.AddMA && ( */}
      <motion.div>
        <div data-cy="modal-add" variant="primary" className="">
          <motion.div className="w-96 pb-10 bg-white rounded-lg shadow-lg relative    ">
            {isLoading ? (
              <Loadings />
            ) : (
              <div>
                {" "}
                <div
                  className="top-3 right-3 absolute cursor-pointer"
                  onClick={props.onClose}
                >
                  <CgClose size={30} />
                </div>
                <div className="pt-6 mx-5 ">
                  <h1 className="text-2xl font-semibold ">Add Goals</h1>
                  <p className="text-sm ">Adding goals for another person</p>
                </div>
                <div className="px-5 mt-10 ">
                  <div className="mb-3">
                    <p className="text-sm pl-2">Name</p>
                    <select
                      className="border rounded-md w-full py-2 outline-none px-2  capitalize"
                      name=""
                      id=""
                      onChange={(e, index) => {
                        // console.log(e.target.value);
                        setData({
                          ...data,
                          userId: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select User</option>
                      {users?.map((e) => (
                        <option value={`${e.id}`} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm pl-2">Which goal</p>
                    <select
                      onClick={() => {
                        if (data.userId === 0)
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "You must choose user first!",
                          });
                      }}
                      className="border rounded-md w-full py-2 outline-none px-2  capitalize"
                      name=""
                      id=""
                      onChange={(e) => {
                        console.log(e.target.value);
                        if (e.target.value === "create") {
                          Swal.fire({
                            title: "Goals of this user is undefined.",
                            text: "You must create goal first.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, create it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate("/acc/goals", {
                                state: { isAddGoal: true },
                                replace: true,
                              });
                            }
                          });
                          console.log(data);

                          console.log(data);
                        }
                        setData({
                          ...data,
                          goalId: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select User</option>
                      {goals.length !== 0 ? (
                        goals?.map((e) => (
                          <option value={`${e.id}`} key={e.id}>
                            {e.task}
                          </option>
                        ))
                      ) : (
                        <option
                          className="text-red-500 italic font-semibold"
                          value={"create"}
                        >
                          Goals is undefined
                        </option>
                      )}
                    </select>
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

                  <div className="mb-3">
                    <p className="text-sm pl-2">From Date</p>{" "}
                    <input
                      className="border rounded-md w-full py-2 outline-none px-2 "
                      type="date"
                      name="fromDate"
                      id="fromDate"
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
                      className="border rounded-md w-full py-2 outline-none px-2 "
                      type="date"
                      name="toDate"
                      id="toDate"
                      onChange={(e) => {
                        setData({
                          ...data,
                          toDate: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <button
                    className="border rounded-md w-full py-2 my-5 outline-none px-2 hover:bg-blue-400 hover:text-white hover:font-semibold uppercase transition-colors duration-500 ease-linear "
                    onClick={sendData}
                    // onClick={() => console.log(data)}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
      {/* )} */}
    </AnimatePresence>
  );
};

export default AddMA;
