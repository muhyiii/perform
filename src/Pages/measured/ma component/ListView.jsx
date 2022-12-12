/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewsProvider from "../../../Component/Support/ReviewsProvider";
import ModalOptionMa from "./ModalOptionMa";
import { BiUndo } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { functionUpdateMeasuredActivity } from "../../../redux/actions/maAction";
import Swal from "sweetalert2";

const ListView = (props) => {
  const [isOption, setIsOption] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let fromDate = new Date(props.fromDate).toLocaleDateString("id", options1);
  let toDate = new Date(props.toDate).toLocaleDateString("id", options1);
  let updatedAt = new Date(props.updatedAt).toLocaleDateString("id", options1);
  let updatedAte = new Date(props.updatedAt).toLocaleTimeString("id", {
    hour: "2-digit",
    minute: "2-digit",

    hour12: true,
  });

  let dateNow = new Date(Date.now()).getDate();
  let createdData = new Date(props.createdAt).getDate();
  const undoArchive = async (id, status, archive) => {
    console.log(id, status);
    const response = await dispatch(
      functionUpdateMeasuredActivity(id, status, archive)
    );
    console.log(response);
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: "Succesfully undo archive data",
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        navigate(".");
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
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: `0.${props.length + 1}`, duration: 0.8}}
    >
      <div
        // onClick={() => setIsOption(!isOption)}
        className=" items-center shadow-md  relative border-2 px-3 py-4 grid grid-cols-12 my-2 rounded-lg capitalize  peer-checked:border-blue-500"
      >
        {dateNow === createdData && (
          <p className="absolute top-1 left-1 text-xs lowercase  text-red-500 font-medium ">
            new
          </p>
        )}

        {location.pathname.split("/")[2] === "ma" ? (
          <label className="flex items-center h-full space-x-3 justify-center py relative ">
            <input
              type="checkbox"
              name="goals"
              id=""
              value={props.maId + "|" + props.data.status}
              onChange={(e) => {
                props.handleChange(e);
                setIsOption(false);
              }}
              // checked={props.setMultiId([])}
              className="peer sr-only"
            />
            <span className="  transition-all opacity-10 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-blue-500 stroke-white"
                width="30"
                height="30"
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
          </label>
        ) : (
          <div />
        )}
        <div className=" " style={{ width: 50, height: 50 }}>
          <ReviewsProvider
            valueStart={0}
            valueEnd={props.rate}
            size={10}
          ></ReviewsProvider>
        </div>
        <div
          className=" truncate col-start-3 px-4 col-span-4 flex items-center  hover:cursor-pointer"
          onClick={() => {
            if (location.pathname.split("/")[2] === "ma") navigate(props.maId);
            navigate(`/acc/ma/${props.maId}`);
          }}
        >
          <div>
            <p className="text-xs text-gray-400">{props.goalTask}</p>
            <div className="">
              <p className="text-xl font-bold  ">{props.task}</p>
              <p className="text-xs">{fromDate + " - " + toDate}</p>
            </div>
          </div>
        </div>

        <div className="flex truncate col-span-2 mx-3  items-start justify-start space-x-5">
          {/* <div className="h-10 w-10  rounded-full bg-contain shadow-md border"> */}
          <img
            className="h-10 w-10  rounded-full bg-contain shadow-md border"
            src={props.image}
            alt="profile"
          />
          {/* </div> */}
          <div className="col-span-2  ">
            <p className="text-sm">{props.name}</p>
            <p className="text-xs">{props.role}</p>
          </div>
        </div>

        <p>{props.value}.00</p>
        <p className="">{props.status}</p>

        {location.pathname.split("/")[2] !== "archives" && (
          <div className="flex col-start-11 col-span-2 place-items-center justify-evenly">
            <div className="col-span-2 ">
              <p>{updatedAt}</p>
              <p className="text-xs">{updatedAte}</p>
            </div>
          </div>
        )}

        {location.pathname.split("/")[2] !== "archives" ? (
          <button className="col-start-13   w-10 h-10 hover:bg-gray-300 rounded-full   transition ease-in duration-200 focus:outline-none">
            <BsThreeDotsVertical
              className="hover:cursor-pointer inline-block"
              size={25}
              onClick={(e) => {
                setIsOption(!isOption);
                // props.setMultiId([])
              }}
            />
            <ModalOptionMa
              onCloseOption={() => {
                setIsOption(false);
              }}
              getData={props.getData}
              data={props.data}
              maId={props.maId}
              isOption={isOption}
              setIsOption={setIsOption}
            />
          </button>
        ) : (
          <motion.button
            whileHover={{ y: -5 }}
            transition={{ type: "spring", bounce: 0.2 }}
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You want to undo archive this measure activity!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, undo it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  undoArchive(props.maId, null, false);
                }
              });
            }}
            className=" cursor-pointer hover:bg-slate-300 col-start-11 space-x-1 col-end-13 m-auto  p-2 rounded-md text-xs flex bg-slate-200 items-center"
          >
            <BiUndo size={15} />
            <p>Undo Archive</p>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ListView;
