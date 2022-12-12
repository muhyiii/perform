/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import jwt_decode from "jwt-decode";
import { FiChevronDown } from "react-icons/fi";
import { functionGetUserAfterLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const decodedToken = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [drop, setDrop] = React.useState(false);
  const [user, setUser] = React.useState({});
  const getDataUser = async () => {
    // console.log(decodedToken);
    const response = await dispatch(functionGetUserAfterLogin(decodedToken.id));
    if (response.status === "Success") {
      // console.log();
      setUser(response.data);
    }
  };
  let page = location.pathname.split("/")[2];
  React.useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div className="bg-white shadow-lg text-lg   py-3 space-x-2  text-right px-10  capitalize grid grid-cols-12  ">
      <h1 className="text-left col-span-2">
        {page === "ma"
          ? "Measured Activity"
          : page === "archives"
          ? page + " & Period"
          : page}
      </h1>
      <div className="col-start-12 col-end-13 truncate flex justify-between items-center  px-2 ">
        <img
          src={user.image}
          className="h-7 w-7 rounded-full"
          alt="profilePhoto"
        />
        <FiChevronDown
          className="hover:bg-gray-100 rounded-md "
          size={25}
          onClick={() => setDrop(true)}
        />
      </div>
      {drop && (
        <div
          className="h-screen w-screen z-50 bg-transparent absolute top-0 right-0 "
          onClick={() => setDrop(false)}
        >
          {" "}
          <div className="relative">
            {" "}
            <div
              onBlur={() => setDrop(false)}
              className=" bg-white absolute  text-left rounded-sm border top-[52px] border-gray-200 px-1 w-72 right-10 py-3"
            >
              <div className="flex space-x-4 px-5 items-center py-1 hover:bg-slate-100 my-1">
                {" "}
                <img
                  src={user.image}
                  className="h-7 w-7 rounded-full"
                  alt="profilePhoto"
                />
                <h1>{user.name}</h1>
              </div>
              <hr />
              <div className="px-5 text-base text-gray-400 my-1  hover:bg-slate-100 hover:text-gray-800 ">
                <h1>Setting</h1>
              </div>
              <button
                className="rounded text-left  text-gray-400 hover:bg-slate-100 hover:text-gray-800 text-base w-full py-2 px-5"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login", { replace: true });
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
