import { Switch } from "@headlessui/react";
import React from "react";
import { MdOutlineCancel, MdSearch } from "react-icons/md";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loadings from "../../../Component/Loading";
import { motion } from "framer-motion";
import { functionGetGoals } from "../../../redux/actions/goalsAction";
import { functionGetMeasuredActivities } from "../../../redux/actions/maAction";
import ColView from "../../goals/goals component/ColView";
import ListView from "../../measured/ma component/ListView";

const PeriodComponent = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const { period } = useParams();
  const location = useLocation();
  const [dataGoal, setDataGoal] = React.useState([]);
  const [dataMa, setDataMa] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const optionDateString = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const getDataGoal = async () => {
    const response = await dispatch(functionGetGoals());
    if (response.status === "Success") {
      const dataa = response.data.rows;
      const filtered = dataa.filter(
        (e) => e.fromDate === state.fromDate && e.toDate === state.toDate
      );
      console.log(filtered);
      setDataGoal(filtered);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const getDataMa = async () => {
    const response = await dispatch(functionGetMeasuredActivities());
    if (response.status === "Success") {
      // console.log(typeof(status));
      console.log(response.data.rows);
      setDataMa(response.data.rows);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const filteredGoal =
    query === ""
      ? dataGoal
      : dataGoal.filter(
          (e) =>
            e.task.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.users[0].name.toLowerCase().includes(query)
        );
  const filteredMa =
    query === ""
      ? dataMa
      : dataMa.filter(
          (e) =>
            e.task.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.goals[0].task.toLowerCase().includes(query) ||
            e.users[0].name.toLowerCase().includes(query)
        );
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  React.useEffect(() => {
    setIsLoading(true);
    enabled ? getDataGoal() : getDataMa();
  }, []);
  console.log(filteredGoal);
  React.useEffect(() => {
    enabled ? getDataGoal() : getDataMa();
  }, [enabled]);
  let fromDate = new Date(location.state.fromDate).toLocaleDateString(
    "id",
    options
  );
  let toDate = new Date(location.state.toDate).toLocaleDateString(
    "id",
    options
  );

  if (isLoading) return <Loadings />;
  return (
    <div className="p-10 h-full w-full">
      <div className="flex justify-between">
        {" "}
        <div className="flex items-center space-x-1 text-lg">
          {" "}
          <h1
            onClick={() => navigate(-1)}
            className="hover:text-2xl  hover:cursor-pointer hover:text-blue-900 hover:font-medium"
          >
            Period
          </h1>{" "}
          <p className="">of</p> <p className="font-medium">{period}</p>
        </div>
        <p className="font-medium">From {fromDate} - To {toDate}</p>
      </div>
      <div className="flex items-center space-x-3">
        <h1
          className={`text-xl font-semibold my-2 ${enabled && "text-blue-500"}`}
        >
          Goals
        </h1>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={` bg-slate-800
          relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${!enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <h1
          className={`text-xl font-semibold my-2 ${!enabled && "text-red-500"}`}
        >
          Measured Activity
        </h1>
      </div>

      <div className="flex items-center space-x-4 my-2  w-1/3">
        <label
          htmlFor=""
          title="search data"
          className=" bg-slate-100 hover:ring-1 w-full  ring-gray-800 border-none focus-within:ring-1 focus-within:ring-gray-800 px-3 border rounded-md flex items-center"
        >
          <MdSearch />
          <input
            type="text"
            title="search data"
            placeholder="Search.."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            className="outline-none bg-transparent  placeholder-gray-400 bg-none text-sm placeholder:text-sm  px-2 py-1 w-full group-focus:border "
          />
          <MdOutlineCancel
            className="cursor-pointer"
            onClick={(e) => setQuery("")}
          />
        </label>
      </div>
      <div className=" w-full pb-20">
        <hr />
        {enabled ? (
          filteredGoal.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ delay: `0.4`, duration: 1 }}
              className="text-xl mt-2 font-medium text-red-400 text-center"
            >
              Data is empty...
            </motion.div>
          ) : filteredGoal.length === 0 && query !== "" ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ delay: `0.4`, duration: 1 }}
              className="text-xl mt-2 font-medium text-red-400 text-center"
            >
              Data is not found...
            </motion.div>
          ) : (
            filteredGoal.map((e, index) => {
              let fromDate = new Date(e.fromDate).toLocaleDateString(
                "id",
                optionDateString
              );
              let toDate = new Date(e.toDate).toLocaleDateString(
                "id",
                optionDateString
              );
              return (
                <ColView
                  data={e}
                  key={index}
                  id={e.id}
                  name={e.users[0].name}
                  image={e.users[0].image}
                  role={e.users[0].role}
                  rate={e.rate}
                  fromDate={e.fromDate}
                  toDate={e.toDate}
                  task={e.task}
                  description={e.description}
                  value={e.value}
                  goalId={e.goalId}
                  status={e.status}
                  fromDateA={fromDate}
                  toDateA={toDate}
                  createdAt={e.createdAt}
                  //   updateMultiGoals={updateMultiGoals}
                  getData={getDataGoal}
                  length={index}
                />
              );
            })
          )
        ) : filteredMa.length === 0 ? (
          <motion.div
            layout
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ delay: `0.4`, duration: 1 }}
            className="text-xl mt-2 font-medium text-red-400 text-center"
          >
            Data is empty...
          </motion.div>
        ) : filteredMa.length === 0 && query !== "" ? (
          <motion.div
            layout
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ delay: `0.4`, duration: 1 }}
            className="text-xl mt-2 font-medium text-red-400 text-center"
          >
            Data is not found...
          </motion.div>
        ) : (
          filteredMa.map((e, index) => {
            return (
              <ListView
                key={e.id}
                data={e}
                name={e.users[0].name}
                role={e.users[0].role}
                image={e.users[0].image}
                goalTask={e.goals[0].task}
                idUser={e.idUser}
                idGoal={e.idGoal}
                maId={e.maId}
                task={e.task}
                description={e.description}
                status={e.status}
                rate={e.rate}
                value={e.value}
                isArchive={e.isArchive}
                fromDate={e.fromDate}
                toDate={e.toDate}
                createdAt={e.createdAt}
                updatedAt={e.updatedAt}
                //   handleChange={handleChange}
                //   setMultiId={setMultiId}
                getData={getDataMa}
                length={index}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PeriodComponent;
