import React from "react";
import { useDispatch } from "react-redux";
import Loadings from "../../../Component/Loading";
import ColView from "../../goals/goals component/ColView";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel, MdSearch } from "react-icons/md";
import { functionGetMeasuredActivities } from "../../../redux/actions/maAction";
import ListView from "../../measured/ma component/ListView";

const ArchiveMa = () => {
  const [dataMa, setDataMa] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDataMa = async () => {
    const response = await dispatch(functionGetMeasuredActivities());
    if (response.status === "Success") {
      const dataa = response.data.rows;
      const filtered = dataa.filter((e) => e.isArchive === true);
      setDataMa(filtered);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

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
  console.log(filteredMa);
  React.useEffect(() => {
    setIsLoading(true);
    getDataMa();
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
        <p>Measured Activity</p>
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
        {filteredMa.length === 0 ? (
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

export default ArchiveMa;
