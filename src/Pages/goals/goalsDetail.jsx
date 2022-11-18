import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChangingProgressProvider from "../../Component/Support/ChangingProggresProvider";
import { getGoalById } from "../../Functions/api";

const GoalsDetail = () => {
  const [goal, setGoal] = React.useState({});
  let { id } = useParams();
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  /// DEFINE TO BE BETTER
  // let toDate = new Date(goal.toDate);
  // console.log(toDate);
  React.useEffect(() => {
    // console.log(id);
    getGoalById(id).then((e) => {
      console.log(e);
      setGoal(e);
      setUser(e.users[0]);
    });
  }, [id]);
  let fromDate = new Date(goal.fromDate).toLocaleDateString("id", options);
  let toDate = new Date(goal.toDate).toLocaleDateString("id", options);
  return (
    <div className="grid grid-cols-12  w-full p-10 space-x-5 h-screen ">
      <div className=" col-span-3  space-y-5 ">
        <div className="  ">
          <h1 className="text-5xl font-bold ">
            {" "}
            <span
              className="hover:cursor-pointer hover:text-blue-700 "
              onClick={() => {
                navigate(-1);
              }}
            >
              Goal
            </span>{" "}
            Detail
          </h1>
        </div>
        <div className="bg-slate-300 rounded-lg h-3/4  shadow-lg ">
          <div className="m-auto text-center pt-10 ">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-sm">{user.role}</p>
          </div>
          <div className="mt-10 w-1/2 m-auto ">
            <ChangingProgressProvider values={[0, `${goal.rate}`]}>
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
                  <p className="text-[15px] font-semibold">{goal.rate}%</p>
                </CircularProgressbarWithChildren>
              )}
            </ChangingProgressProvider>

            {goal.rate === 100 && (
              <p className="text-center mt-5 font-semibold">Completed</p>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-9  bg-gray-400 mr-5 rounded-lg p-5 capitalize">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{goal.task}</h1>
          <p className="font-semibold">
            from <span className="">{fromDate}</span> to{" "}
            <span className="text-red-700 font-bold">{toDate}</span>
          </p>
        </div>
        <div>
          <p>{goal.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalsDetail;
