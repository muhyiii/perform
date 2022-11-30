/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import jwt_decode from "jwt-decode";
import { functionGetUserAfterLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";

const User = () => {
  const decodedToken = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({});
  const getDataUser = async () => {
    // console.log(decodedToken);
    const response = await dispatch(functionGetUserAfterLogin(decodedToken.id));
    if (response.status === "Success") {
      // console.log();
      setUser(response.data);
    }
  };

  React.useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div className="bg-white shadow-lg text-lg  font-medium py-3 space-x-2  text-right px-10  capitalize grid grid-cols-12 ">
      <div className="col-start-11 col-end-13 truncate flex space-x-2">
        <img src={user.image} className="h-7 w-7 rounded-full" alt="profilePhoto" />
        <h1> {user.name}</h1>
      </div>
    </div>
  );
};

export default User;
