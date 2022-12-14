import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loadings from "../../Component/Loading";
import { functionGetMeasuredActivityById } from "../../redux/actions/maAction";
import { motion } from "framer-motion";
import ReviewsProvider from "../../Component/Support/ReviewsProvider";
import { BarProv } from "../../Component/Support/ReviewsProvider";
 
const Cpyu = () => {
  const [data, setData] = React.useState({});
  const [user, setUser] = React.useState({});
 
  const [goal, setGoal] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    const response = await dispatch(functionGetMeasuredActivityById(id));
    if (response.status === "Success") {
      console.log(response.data);
      setData(response.data);
      setUser(response.data.users[0]);
      setGoal(response.data.goals[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getData();
  }, [0]);
  if (isLoading) <Loadings />;
  const maDate = new Date(data.toDate).toLocaleDateString("id", {
    month: "numeric",
    year: "numeric",
    day: "numeric",
  });
  const maDate2 = new Date(data.updatedAt).toLocaleDateString("id", {
    month: "numeric",
    year: "numeric",
    day: "numeric",
  });
 
  return (
    <div className="px-10 py-7 flex justify-between">
      {/* kiri ........................................................................*/}
      <div>
        <div className=" max-w-sm p-5 rounded-xl shadow-md  bg-slate-300 ">
          <h1 className="text-2xl justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.0 }}
              className="hover:cursor-pointer hover:text-gray-600 font-bold mx-2"
              onClick={() => {
                navigate(-1);
              }}
            >
              Measured Activity
            </motion.button>{" "}
            Detail
          </h1>
        </div>
 
        <div className="my-5 max-w-sm rounded-xl overflow-hidden shadow-md bg-slate-300">
          <div className="m-6 py-3 px-5 justify-between flex bg-gray-200 rounded-xl items-center shadow-lg">
            <img
              src={user.image}
              className="h-12 w-12 rounded-full "
              alt="profilePhoto"
            />
            <div className="">
              <p
                title="Username"
                class="hover:cursor-pointer mx-3 inline-block rounded-lg px-5 py-1 text-sm font-semibold text-gray-800 capitalize "
              >
                {user.name}
              </p>
              <p
                title="Role"
                class="hover:cursor-pointer mx-3 inline-block rounded-lg px-5 py-1 text-md font-tint text-gray-800  "
              >
                {user.role}
              </p>
            </div>
          </div>
          <div class="px-6 ">
            <div className="bg-gray-200 rounded-xl h-3/4  shadow-lg ">
              <div className="m-auto text-center pt-5 capitalize ">
                <h1
                  title="Task Name"
                  className="hover:cursor-pointer text-xl font-semibold break-words px-6 text-left"
                >
                  Tugas {data.task}
                </h1>
              </div>
 
              <div className="py-8 w-1/2 m-auto font-semibold hover:cursor-progress">
                <ReviewsProvider
                  valueStart={0}
                  valueEnd={data.rate}
                  size={12}
                ></ReviewsProvider>
 
                {data.rate === 100 && (
                  <p className=" mt-5 font-semibold text-md text-gray-600 text-center">Completed</p>
                )}
                {data.rate === 0 && (
                  <p className="text-center mt-5 font-semibold">Hold</p>
                )}
              </div>
            </div>
            <div className="bg-gray-200 rounded-xl h-1/4 my-3 items-center  shadow-lg">
              <BarProv valueStart={0} valueEnd={data.rate} className="items-center "/>
            </div>
          </div>
        </div>
      </div>
 
      {/* Kanan ........................................................................*/}
      <div className="max-w-sm p-5 rounded-xl shadow-md bg-slate-300 mx-5 justify-center">
        <p className="text-sm font-semibold text-gray-600 text-center">
          Description
        </p>
        <div className="shadow-lg inline-block bg-gray-200 rounded-lg py-3 text-sm font-semibold text-gray-800 m-2 justify-center">
          <p
            title="Username"
            class="mx-3 inline-block rounded-lg px-5 py-1 text-sm font-semibold text-gray-800 capitalize  "
          >
            {data.description}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">Updated at</p>
            <span class="shadow-lg inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 m-2">
              {maDate2}
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">Deadline</p>
            <span className="shadow-lg inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 m-2 m-2">
              {maDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Cpyu;
 

