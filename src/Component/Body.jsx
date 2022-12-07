import React from "react";
import { motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/LOGO2.png";

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-gradient-to-tr from-[#101424] to-[#091546] w-full  flex h-screen col-span-2">
        <div className="">
          <div className="m-6  hover:cursor-pointer">
            <img
              src={logo}
              alt="urun-ri.png"
              className=" px-10 pt-10 pb-2  w-56"
              onClick={() => {
                navigate("dashboard");
              }}
            />
            <p className="eveleth text-center text-gray-100 text-3xl tracking-widemotion.">
              URUN-RI
            </p>
            <p className="font-questrial text-center text-cyan-700 text-md motion.">
              Bangun Negeri
            </p>
          </div>

          <nav className="text-yellow-50 text-xl font-medium  w-full mt-14">
            <ul className=" space-y-2  w-full">
              <motion.li className="hover:bg-slate-800 rounded-md">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    isActive ? "font-semibold bg-gray-200 w-full h-min text-2xl  pb-1 " : "text-lg "
                  }
                >
                  <div className=" hover:text-black bg-opacity-5 p-2 rounded-lg">
                    <motion.p
                      whileHover={{ x: 10, scaleY: 1 }}
                      className="text-white"
                    >
                      Dashboard
                    </motion.p>
                  </div>
                </NavLink>
              </motion.li>
              <motion.li>
                <br />
                <hr />
              </motion.li>
              <motion.li className="hover:bg-slate-800 rounded-md">
                <NavLink
                  to="goals"
                  state={{ isAddGoal: false }}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold bg-gray-200 w-full h-min text-2xl  pb-2 justify-around "
                      : "text-lg "
                  }
                >
                  <div className=" hover:text-black bg-opacity-5 p-2 rounded-lg">
                    <motion.p
                      whileHover={{ x: 10, scaleY: 1 }}
                      className="text-white"
                    >
                      Goals
                    </motion.p>
                  </div>
                </NavLink>
              </motion.li>
              <motion.li className="hover:bg-slate-800 rounded-md">
                <NavLink
                  to="ma"
                  state={{ isAddMA: false }}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold bg-gray-200 w-full h-min text-2xl  pb-2 justify-around"
                      : "text-lg "
                  }
                >
                  <div className=" hover:text-black bg-opacity-5 p-2 rounded-lg">
                    <motion.p
                      whileHover={{ x: 10, scaleY: 1 }}
                      className="text-white"
                    >
                      Measured Activity
                    </motion.p>
                  </div>
                </NavLink>
              </motion.li>{" "}
              <motion.li whileHover={{ x: 5, scaleY: 1 }}>
                <NavLink
                  to="archives"
                  state={{ isAddMA: false }}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold bg-gray-200 w-full h-min text-2xl  pb-2 justify-around"
                      : "text-lg "
                  }
                >
                  <div className=" hover:text-black bg-opacity-5 p-2 rounded-lg">
                    <motion.p
                      whileHover={{ x: 10, scaleY: 1 }}
                      className="text-white"
                    >
                      Archives
                    </motion.p>
                  </div>
                </NavLink>
              </motion.li>
              <li className="pb-5">
                <hr />
              </li>
              {/* <motion.li whileHover={{ x: 5, scaleY: 1 }} className='mt-5'>
                <button
                  className="rounded-lg bg-opacity-5text-white text-2<motion.p>xl py-2 items-end</p> px-motion.5"
                  onClick={() => {
                    localStorage.clear();
                    setTimeout(() => {
                      navigate("/", { replace: true });
                    });
                  }}
                >
                  LOGOUT
                </button>
              </motion.li> */}
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
