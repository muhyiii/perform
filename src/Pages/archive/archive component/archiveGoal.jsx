import React from "react";
import { useDispatch } from "react-redux";
import Loadings from "../../../Component/Loading";
import { functionGetGoals } from "../../../redux/actions/goalsAction";
import ColView from "../../goals/goals component/ColView";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel, MdSearch } from "react-icons/md";

const ArchiveGoals = () => {
  const [data, setData] = React.useState([]);
  const [dataGoal, setDataGoal] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDataGoal = async () => {
    const response = await dispatch(functionGetGoals());
    if (response.status === "Success") {
      const dataa = response.data.rows;
      setData(dataa);
      const filtered = dataa.filter((e) => e.isArchive === true);
      console.log(filtered);
      setDataGoal(filtered);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const optionDateString = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const filteredGoal =
    query === ""
      ? dataGoal
      : dataGoal?.filter(
          (e) =>
            e.task.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.users[0].name.toLowerCase().includes(query)
        );
  React.useEffect(() => {
    setIsLoading(true);
    getDataGoal();
  }, []);
  if (isLoading) return <Loadings />;
  return (
    <div className="p-10 h-full w-full">
      <div className="flex items-center space-x-1 text-lg">
        <h1
          className="hover:text-xl hover:cursor-pointer hover:text-blue-900 hover:font-medium"
          onClick={() => navigate(-1)}
        >
          Archive{" "}
        </h1>
        <p>Goal</p>
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
      <hr />
      <div className="w-full h-full mt-2 ">
        <AnimatePresence>
          {filteredGoal.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ delay: `0.4`, duration: 1 }}
              className="text-xl mt-2 font-medium text-red-400 text-center"
            >
              Archive data is empty...
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArchiveGoals;
