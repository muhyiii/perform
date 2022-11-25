import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReviewsProvider from "../../../Component/Support/ReviewsProvider";
import ModalOptionMa from "./ModalOptionMa";

const ListView = (props) => {
  const [isOption, setIsOption] = React.useState(false);

  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let toDate = new Date(props.toDate).toLocaleDateString("id", options1);
  let updatedAt = new Date(props.updatedAt).toLocaleDateString("id", options1);
  let updatedAte = new Date(props.updatedAt).toLocaleTimeString("id", {
    hour: "2-digit",
    minute: "2-digit",

    hour12: true,
  });
  return (
    <div>
      <div className=" items-center  relative border-2 px-3 py-5 grid grid-cols-12 my-2 rounded-lg capitalize  peer-checked:border-blue-500">
        <label className="flex items-center col-span-1 space-x-3 justify-center py relative ">
          <input
            type="checkbox"
            name="goals"
            id=""
            // value={props.goalId + "|" + props.status}
            // onChange={props.handleChange}
            className="peer sr-only"
          />
          <span className="  transition-all opacity-0 peer-checked:opacity-100">
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
          <div className=" " style={{ width: 50, height: 50 }}>
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
                  <p className="text-[9px]">{props.rate}%</p>
                </CircularProgressbarWithChildren>
              )}
            </ReviewsProvider>
          </div>
        </label>

        <div className=" col-start-2 px-4 col-span-4 flex items-center  ">
          <div>
            <p className="text-xs text-gray-400">{props.goalTask}</p>
            <div>
              <p className="text-xl font-bold ">{props.task}</p>
              <p className="text-xs">{toDate}</p>
            </div>
          </div>
        </div>

        <div className="flex col-span-2  items-start justify-start space-x-5">
          <img
            src={props.image}
            className="h-10 rounded-full w-10 bg-cover"
            alt=""
          />
          <div className="col-span-2  ">
            <p>{props.name}</p>
            <p className="text-xs">{props.role}</p>
          </div>
        </div>

        <p>{props.value}.00</p>
        <p className="">{props.status}</p>

        <div className="flex col-start-10 col-span-2 place-items-center justify-evenly">
          <div className="col-span-2 ">
            <p>{updatedAt}</p>
            <p className="text-xs">{updatedAte}</p>
          </div>
        </div>

        <button className="col-start-12    w-10 h-10 hover:bg-gray-300 rounded-full   transition ease-in duration-200 focus:outline-none">
          <BsThreeDotsVertical
            className="hover:cursor-pointer inline-block"
            size={25}
            onClick={() => {
              setIsOption(!isOption);
            }}
          />
          <ModalOptionMa
            onCloseOption={() => {
              setIsOption(false);
            }}
            data={props.data}
            maId={props.maId}
            isOption={isOption}
            setIsOption={setIsOption}
          />
        </button>
      </div>
    </div>
  );
};

export default ListView;
