import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loadings from "../../Component/Loading";
import { functionGetMeasuredActivityById } from "../../redux/actions/maAction";
import { motion } from "framer-motion";

const MaDetail = () => {
  const [data, setData] = React.useState({});
  const [user, setUser] = React.useState();
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
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);
  if (isLoading) <Loadings />;
  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hover:cursor-pointer hover:text-blue-700 "
          onClick={() => {
            navigate(-1);
          }}
        >
          Measured Activity
        </motion.button>{" "}
        Detail
      </h1>
    </div>
  );
};

export default MaDetail;
