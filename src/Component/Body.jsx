import React from "react";
import { motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/LOGO2.png";

const Body = () => {
  const navigate = useNavigate();

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
              <motion.li whileHover={{ x: 10, }}>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline pb-1" : undefined
                  }
                >
                  Dashboard
                </NavLink>
              </motion.li>
              <motion.li>
                <br />
                <hr />
              </motion.li>
              <motion.li whileHover={{ x: 10, scaleY: 1 }}>
                <NavLink
                  to="goals"
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline pb-1" : undefined
                  }
                >
                  Goals
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ x: 10, scaleY: 1 }}>
                <NavLink
                  to="ma"
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline pb-1" : undefined
                  }
                >
                  Measured Activity
                </NavLink>
              </motion.li>
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
      <div className="col-span-9 overflow-auto relative h-screen  ">
        <Scrollbars autoHide style={{ height: "100%" }}>
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Body;
