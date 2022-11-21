import axios from "axios";
import React from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../Functions/axiosClient";

import { functionGetUsers } from "../../redux/actions/authAction";
import { functionAddGoal } from "../../redux/actions/goalsAction";

const AddGoals = (props) => {
  let [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  let [data, setData] = React.useState({
    userId: 0,
    task: "",
    description: "",
    fromDate: "",
    toDate: "",
  });
  const navigate = useNavigate();

  // SUBMIT
  const sendData = async () => {
    console.log(data);
    try {
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
      }

      const response = await dispatch(functionAddGoal(data));
      console.log(response);
      if (response.status === "Success") {
        props.onClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.messege,
          showConfirmButton: false,
          timer: 1000,
        });
        setData({});
        await dispatch(props.getData());
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        timer: 3000,
      });
    }
  };

  const getDataUsers = async () => {
    setIsLoading(true);
    const response = await dispatch(functionGetUsers());
    if (response.status === "Success") {
      setUsers(response.data);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getDataUsers();
  }, []);
  ///////////////////////
  if (!props.addGoals) {
    return null;
  }
  return (
    <div>
      <div
        data-cy="modal-add"
        variant="primary"
        className=" bg-black bg-opacity-50 z-20 modal absolute inset-0 flex justify-center items-center overflow-y-hidden h-full"
      >
        <div className="w-2/6 pb-10 bg-white rounded-lg shadow-lg relative    ">
          {isLoading ? (
            <p className="text-center">Loading</p>
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
                      console.log(e.target.value);
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
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGoals;
