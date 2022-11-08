import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChangingProgressProvider from "../Support/ChangingProggresProvider";

const RowView = (props) => {
  const navigate = useNavigate();
  return (
    <label
      className="col-span-4 relative "
      onDoubleClick={() => {
        navigate(`${props.id}`);
      }}
    >
      <input
        type="checkbox"
        name="goals"
        id=""
        onChange={(e) => {
          props.handleChange("isDelete", props.id, props.status);
        }}
        className="peer sr-only"
      />
      <div className="shadow-md m-1 px-4 py-2 border rounded-xl peer-checked:ring-blue-500 peer-checked:ring-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {}}
        >
          <div className="flex space-x-3 ">
            <div className="text-left ">
              <p>{props.nama}</p>
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
        </div>
        <div className="text-lg grid grid-cols-11 items-center space-x-2 my-5">
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
              if (props.status === "to-do" || props.status === "procces") {
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
                        props.status !== "procces"
                          ? {
                              procces: "Procces",
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
                            value === "procces"
                          ) {
                            console.log(value);
                            props.updateLocStorage(props.id, value);
                            Swal.fire(
                              "Succesfull!",
                              "Your status has been updated.",
                              "success"
                            );
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
    </label>
  );
};

export default RowView;
