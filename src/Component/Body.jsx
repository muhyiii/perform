import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/logo.png";

const Body = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-gradient-to-r from-[#2c3d70] to-[#1e3066] h-screen col-span-2">
        <div className="">
          <img
            src={logo}
            alt="urun-ri.png"
            className="w-60 m-auto"
            onClick={() => {
              navigate("dashboard");
            }}
          />

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
