import axios from "axios";
import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../Functions/api";
import ChangingProgressProvider from "../Support/ChangingProggresProvider";

const RowView = (props) => {
  const navigate = useNavigate();
  const updateStatus = async (id, status) => {
    const response = await axios.put(api + `/data/goals/${id}/update`, {
      status: status,
    });
    if (response.status === 200) {
      Swal.fire("Succesfull!", response.data.messege, "success");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
    if (response.statusText !== "OK")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.messege,
      });
  };
  const deleteGoal = async (id) => {
    const response = await axios.delete(api + `/data/goals/${id}/delete`);
    if (response.status === 200) {
      Swal.fire("Succesfull!", response.data.messege, "success");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
    if (response.statusText !== "OK")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.messege,
      });
  };

  return (
    <div className="col-span-4 relative ">
      <div className="shadow-md m-1 px-4 py-2 border rounded-xl ">
        <label
          className="flex justify-between items-center cursor-pointer relative"
          onClick={() => {}}
        >
          <input
            type="checkbox"
            name="goals"
            id=""
            value={props.id}
            onChange={props.handleChange}
            className="peer sr-only"
          />{" "}
          <span className="absolute left-1/2 z-10 opacity-0 transition-all peer-checked:opacity-100">
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
          <div className="flex space-x-3  ">
            <div className="text-left ">
              <p>{props.name}</p>
              <p className="text-xs text-gray-400">{props.role}</p>
            </div>
          </div>
          <p
            className={`text-xs lowercase ${
              props.status === "to-do" || props.status === "procces"
                ? props.remain === 0
                  ? "text-red-500"
                  : props.remain === 1
                  ? "text-yellow-500"
                  : "text-blue-500"
                : "text-black capitalize"
            } font-semibold`}
          >
            {props.status === "to-do" || props.status === "procces"
              ? props.remain === 0
                ? "last today"
                : props.remain === 1
                ? "tomorrow is last"
                : props.remain + " days remaining"
              : "Completed"}
          </p>
        </label>
        <div
          className="text-lg grid grid-cols-11 items-center space-x-2 my-5 hover:cursor-pointer"
          onClick={() => {
            navigate(`${props.goalId}`);
          }}
        >
          <div className="col-span-2">
            <ChangingProgressProvider values={[0, `${props.rate}`]}>
              {(percentage) => (
                <CircularProgressbarWithChildren
                  value={percentage}
                  strokeWidth={20}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(${percentage / 100}, 152, 199 ,${
                      percentage / 100
                    })`,

                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                >
                  <p className="text-[10px]">{props.rate}%</p>
                </CircularProgressbarWithChildren>
              )}
            </ChangingProgressProvider>
          </div>
          <p className="truncate col-span-9 text-ellipsis font-semibold ">
            {props.task}
          </p>
        </div>
        <div className="flex justify-between border-t-2 mt-2">
          <p>Status</p>
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
                              held: "Held",
                              done: "Done",
                            }
                          : {
                              held: "Held",
                              done: "Done",
                            },
                      inputPlaceholder: "Select a status",
                      showCancelButton: true,
                      inputValidator: (value) => {
                        return new Promise((resolve) => {
                          if (
                            value === "done" ||
                            value === "held" ||
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
    </div>
  );
};

export default RowView;
