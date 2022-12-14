import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import ReviewsProvider from "../../../Component/Support/ReviewsProvider";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch } from "react-redux";
import { functionUpdateGoal } from "../../../redux/actions/goalsAction";

const RowView = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateStatus = async (id, status) => {
    // console.log(status);
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
        props.getData();
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
  const [checked, setChecked] = React.useState(false);
  let dateNow = new Date(Date.now()).getDate();
  let createdData = new Date(props.createdAt).getDate();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, delay: `0.${props.length + 3}` }}
      className="col-span-4 my-3 relative "
      key={props.id}
    >
      {dateNow === createdData && (
        <GoPrimitiveDot
          className="absolute -top-2  -left-2 text-red-500 "
          size={40}
        />
      )}
      <div className="shadow-md m-1 px-4 py-2 border rounded-xl ">
        <label
          className="flex justify-between items-center cursor-pointer relative"
          onClick={() => {}}
        >
          <input
            type="checkbox"
            name="goals"
            id=""
            value={props.goalId + "|" + props.status}
            onChange={(e) => {
              props.handleChange(e);
              setChecked(!checked);
            }}
            className="sr-only"
          />{" "}
          <span
            className={`absolute left-1/2 z-10 opacity-0 transition-all ${
              checked && "opacity-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-blue-500 stroke-white"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          </span>
          <div className="flex space-x-3 pl-2 ">
            <div className="text-left truncate text-ellipsis ">
              <p>{props.name.substring(0, 20)}</p>
              <p className="text-xs text-gray-400">{props.role}</p>
            </div>
          </div>
          <p
            className={`text-xs capitalize ${
              props.rate === 100 && "font-medium text-lg"
            }`}
          >
            {props.rate === 100
              ? "Completed"
              : props.fromDateA + " - " + props.toDateA}
          </p>
        </label>
        <div
          className="text-lg grid grid-cols-11 items-center space-x-2 my-5 hover:cursor-pointer"
          onClick={() => {
            navigate(`${props.goalId}`);
          }}
        >
          <div className="col-span-2">
            <ReviewsProvider
              valueStart={0}
              valueEnd={props.rate}
              size={10}
            ></ReviewsProvider>
          </div>
          <div className="truncate col-span-9  font-semibold ">
            {" "}
            <p>{props.task}</p>
            <p className="text-xs">{props.description}</p>
          </div>
        </div>
        <div className="flex justify-between border-t-2 mt-2">
          {props.value}.00
          <p
            className="cursor-pointer hover:font-semibold"
            onClick={() => {
              if (props.status === "to-do" || props.status === "ongoing") {
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
                        props.status !== "ongoing"
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
                            console.log(value);
                            updateStatus(props.goalId, value);
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
                  text: "You cannot update to stage before!",
                });
              }
            }}
          >
            {props.status}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RowView;
