import React from "react";
import { motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/LOGO2.png";
 
const Body = () => {
  const navigate = useNavigate();
 
  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-gray-900 z-50 group-hover:bg-gray-600 flex h-screen col-span-2">
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
 
          <nav className="text-yellow-50 text-xl font-semibold pl-10 py-14">
            <ul className="items-around space-y-2">
              <motion.li whileHover={{ x: 10, scaleY: 1  }}>
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
              <motion.li  whileHover={{ x: 10, scaleY: 1 }}>
                <NavLink
                  to="goals"
                  state={{ isAddGoal: false }}
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline pb-2 justify-around " : undefined
                  }
                >
                  Goals
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ x: 5, scaleY: 1 }}>
                <NavLink
                  to="ma"
                  state={{ isAddMA: false }}
                  className={({ isActive }) =>
                    isActive ? "text-2xl underline pb-2 justify-around" : undefined
                  }
                >
                  Measured Activity
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ x: 5, scaleY: 1 }}>
                <button
                  className="rounded-lg border text-white text-2xl pb-1 items-end px-5"
                  onClick={() => {
                    localStorage.clear();
                    setTimeout(() => {
                      navigate("/", { replace: true });
                    },  );
                  }}
                >
                  LOGOUT
                </button>
              </motion.li>
            </ul>
          </nav>
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
 
 
 
 

