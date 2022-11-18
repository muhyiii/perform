import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/LOGO2.png";
import jwt_decode from "jwt-decode";
import { functionGetUserAfterLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { clearToken } from "../Functions/axiosClient";

const Body = () => {
  const navigate = useNavigate();
  const decodedToken = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({});
  const getDataUser = async () => {
    console.log(decodedToken);
    const response = await dispatch(functionGetUserAfterLogin(decodedToken.id));
    if (response.status === "Success") {
      console.log();
      setUser(response.data);
    
    }
  };

  React.useEffect(() => {
    getDataUser();
  }, [0]);

  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-gray-900 group-hover:bg-gray-600 flex h-screen col-span-2">
        <div className="">
          <div className="m-6  hover:cursor-pointer">
            <img
              src={logo}
              alt="urun-ri.png"
              className="w-25 px-10 pt-10 pb-2"
              onClick={() => {
                navigate("dashboard");
              }}
            />
            <p className="font-eveleth text-center text-gray-200 text-2xl tracking-wide">
              URUN-RI
            </p>
            <p className="font-questrial text-center text-cyan-700 text-sm ">
              Bangun Negeri
            </p>
          </div>

          <nav className="text-yellow-50 text-xl font-semibold pl-14">
            <ul>
              <li>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline" : undefined
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <br />
                <hr />
              </li>
              <li>
                <NavLink
                  to="goals"
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline" : undefined
                  }
                >
                  Goals
                </NavLink>
              </li>
              <li>
                <NavLink to="ma">
                  {({ isActive }) => (
                    <span
                      className={isActive ? "text-2xl underline" : undefined}
                    >
                      Measured Activity
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
          <button
            className="text-white"
            onClick={() => {
              localStorage.clear();
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 500);
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
      <div className="col-span-9 overflow-auto relative ">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <div className="bg-white shadow-lg text-lg font-semibold py-3 space-x-2  text-right px-10 capitalize flex items-center justify-end">
            <img
              src={user.image }
              className="h-7 w-7 rounded-full"
              alt="profilePhoto"
            />
            <h1>{user.name}</h1>
          </div>
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Body;
