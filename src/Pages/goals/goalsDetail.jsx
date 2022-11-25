import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChangingProgressProvider from "../../Component/Support/ChangingProggresProvider";
import { motion } from "framer-motion";
import { functionGetGoalsById } from "../../redux/actions/goalsAction";
import { functionGetMeasuredActivityByGoalId } from "../../redux/actions/maAction";
import Loadings from "../../Component/Loading";
import { Player } from "@lottiefiles/react-lottie-player";

const GoalsDetail = () => {
  const [goal, setGoal] = React.useState({});
  let { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [ma, setMa] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const getGoalById = async () => {
    const response = await dispatch(functionGetGoalsById(id));
    if (response.status === "Success") {
      console.log(response.data);
      setGoal(response.data);
      setUser(response.data.users[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const getMaByGoalId = async () => {
    const response = await dispatch(
      functionGetMeasuredActivityByGoalId(goal.id)
    );
    if (response.status === "Success") {
      console.log(response.data);
      setMa(response.data.rows);
      setTimeout(() => {
        // setIsLoading(false);
      }, 500);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getMaByGoalId();
  }, [goal.id]);
  React.useEffect(() => {
    setIsLoading(true);
    getGoalById();
  }, [id]);
  let fromDate = new Date(goal.fromDate).toLocaleDateString("id", options);
  let toDate = new Date(goal.toDate).toLocaleDateString("id", options);
  if (isLoading) return <Loadings />;
  return (
    <div className="grid grid-cols-12  w-full p-10 space-x-5 h-screen ">
      <div className=" col-span-3  space-y-5 ">
        <div className="  ">
          <h1 className="text-5xl font-bold ">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:cursor-pointer hover:text-blue-700 "
              onClick={() => {
                navigate(-1);
              }}
            >
              Goal
            </motion.button>{" "}
            Detail
          </h1>
        </div>
        <div className="bg-slate-300 rounded-lg h-3/4  shadow-lg ">
          <div className="m-auto text-center pt-10 capitalize ">
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
      <div className="col-span-9  bg-gray-400 mr-5 rounded-lg p-5 capitalize relative">
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
        <p
          className="
        mt-10"
        >
          Measured Activities
        </p>
        <div>
          {isLoading ? (
            <div className="absolute z-50 h-screen flex items-center backdrop-blur-sm w-full justify-center">
              <div className=" ">
                <Player
                  autoplay
                  loop
                  src={
                    "https://lottie.host/3425dfb9-3688-4154-8741-ce55a06174ea/d70t0oUroc.json"
                  }
                  style={{ height: "100px", width: "100px" }}
                ></Player>
              </div>
            </div>
          ) : ma.length !== 0 ? (
            ma?.map((e) => {
              return (
                <div className="border rounded-md px-5 py-3">
                  <h1>{e.task}</h1>
                </div>
              );
            })
          ) : (
            <p>
              Nothing to show here, measured activity of this goal is undefined
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsDetail;
