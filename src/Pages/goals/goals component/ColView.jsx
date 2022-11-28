import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Swal from "sweetalert2";
import ModalOptionGoal from "./ModalOptionGoal";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { functionUpdateGoal } from "../../../redux/actions/goalsAction";
import ReviewsProvider from "../../../Component/Support/ReviewsProvider";

const ColView = (props) => {
  const [isOption, setIsOption] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateStatus = async (id, status) => {
    const payload = { status: status };
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

  return (
    <div
      key={props.id}
      className=" items-center shadow-md border p-4 grid grid-cols-11 m-3 rounded-lg h-24 peer-checked:border-blue-500"
    >
      <div className="grid grid-cols-6">
        <div></div>
        <div className="col-span-3">
          <ReviewsProvider valueStart={0} valueEnd={props.rate}>
            {(percentage) => (
              <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={18}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  pathTransitionDuration: 0.5,
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
          </ReviewsProvider>
        </div>
      </div>
      <div
        className=" col-span-5 space-y-3 text-ellipsis "
        onClick={() => {
          navigate(`${props.goalId}`);
        }}
      >
        <p className="text-xl font-bold  truncate">{props.task}</p>
        <p className={`text-xs capitalize font-semibold`}>
          {props.rate == 100
            ? "Completed"
            : props.fromDateA + " - " + props.toDateA}
        </p>
      </div>{" "}
      <div className="text-left col-start-7 col-span-2  space-x-2 flex ">
        {" "}
        <img
          src={props.image}
          className="h-10 rounded-full w-10 bg-cover"
          alt=""
        />
        <div className="truncate text-ellipsis mr-1 px-1">
          {" "}
          <p className="">{props.name}</p>
          <p className="text-xs text-gray-400  h-5">{props.role}</p>
        </div>
      </div>
      <p
        className="cursor-pointer hover:font-semibold ml-3"
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
                      if (value !== props.status) {
                        updateStatus(props.goalId, value);
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
      <p>{props.value}.00</p>
      <div className="col-start-13 relative">
        {" "}
        <BiDotsVerticalRounded
          className="hover:cursor-pointer"
          size={25}
          onClick={() => {
            setIsOption(!isOption);
          }}
        />
        <ModalOptionGoal
          onCloseOption={() => {
            setIsOption(false);
          }}
          getData={props.getData}
          goalId={props.goalId}
          isOption={isOption}
          setIsOption={setIsOption}
        />
      </div>
    </div>
  );
};

export default ColView;
