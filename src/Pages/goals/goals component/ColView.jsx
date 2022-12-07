import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Swal from "sweetalert2";
import ModalOptionGoal from "./ModalOptionGoal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { functionUpdateGoal } from "../../../redux/actions/goalsAction";
import ReviewsProvider from "../../../Component/Support/ReviewsProvider";
import { GoPrimitiveDot } from "react-icons/go";

const ColView = (props) => {
  const [isOption, setIsOption] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateStatus = async (id, status) => {
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
  let dateNow = new Date(Date.now()).getDate();
  let createdData = new Date(props.createdAt).getDate();
  console.log(props.length);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ delay: `0.${props.length + 1}`, duration: 1 }}
      key={props.id}
      className=" items-center shadow-md border p-4 grid grid-cols-11 m-3 rounded-lg h-24  relative"
    >
      {dateNow === createdData && (
        <GoPrimitiveDot
          className="absolute -top-4  -left-4 text-red-500"
          size={40}
        />
      )}
      <div className="grid grid-cols-6">
        <div></div>
        <div className="col-span-3">
          <ReviewsProvider
            valueStart={0}
            valueEnd={props.rate}
            size={10}
          ></ReviewsProvider>
        </div>
      </div>
      <div
        className=" col-span-5 space-y-3 text-ellipsis "
        onClick={() => {
          navigate(`${props.goalId}`);
        }}
      >
        <div className="truncate">
          {" "}
          <p className="text-xl font-semibold  ">{props.task}</p>
          <p className="font-medium text-xs">{props.description}</p>
        </div>
        <p
          className={`text-xs capitalize ${
            props.rate === 100 && "font-medium text-lg"
          }`}
        >
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
    </motion.div>
  );
};

export default ColView;
