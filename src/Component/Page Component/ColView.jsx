import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Swal from "sweetalert2";
import ModalOption from "./ModalOption";

import ChangingProgressProvider from "../Support/ChangingProggresProvider";

const ColView = (props) => {
  const [isOption, setIsOption] = React.useState(false);

  return (
    <div
      key={props.id}
      className=" items-center shadow-md border p-4 grid grid-cols-11 m-3 rounded-lg h-24 peer-checked:border-blue-500"
    >
      <div className="grid grid-cols-6">
        <div></div>
        <div className="col-span-3">
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
                  pathColor: `rgba(${percentage / 100}, 152, 199  ,${
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
      </div>
      <div className=" col-span-5 space-y-3 text-ellipsis ">
        <p className="text-xl font-bold  truncate">{props.task}</p>

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
      <div className="text-left col-start-7 col-span-2 ml-5 ">
        <p>Fudail Ramadhani</p>
        <p className="text-xs text-gray-400">{props.role}</p>
      </div>
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
                      if (value !== props.status) {
                        console.log(value);
                        props.updateLocStorage(props.id, value);
                        Swal.fire(
                          "Succesfull!",
                          "Your status has been updated.",
                          "success"
                        );
                      } else {
                        resolve("You can only update to next stage");
                      }
                    });
                  },
                }).then((e) => {});
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
      <div className="col-start-12 relative">
        {" "}
        <BiDotsVerticalRounded
          className="hover:cursor-pointer"
          size={25}
          onClick={() => {
            setIsOption(!isOption);
          }}
        />
        <ModalOption
          onCloseOption={() => {
            setIsOption(false);
          }}
          deleteLocStorage={props.deleteLocStorage}
          id={props.id}
          isOption={isOption}
          setIsOption={setIsOption}
        />
      </div>
    </div>
  );
};

export default ColView;