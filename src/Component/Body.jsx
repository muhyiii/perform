import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/LOGO2.png";

const Body = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-gray-900 group-hover:bg-gray-600 flex h-screen col-span-2">
        <div className="">
          <div className="m-6">
            <img
              src={logo}
              alt="urun-ri.png"
              className="w-25 px-10 pt-10 pb-2"
              onClick={() => {
                navigate("dashboard");
              }}
            />
            <p className="font-eveleth text-center text-gray-200 text-2xl ">
              URUN-RI
            </p>
            <p className="font-questrial text-center text-blue-500 text-sm ">Bangun Negeri</p>
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
        </div>
      </div>
      <div className="col-span-9 overflow-auto relative ">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Body;
