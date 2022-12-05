import React from "react";
import { motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from ".././Images/LOGO2.png";

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className= "bg-gradient-to-tr from-[#101424] to-[#091546] w-full  flex h-screen col-span-2">
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
            <p className="eveleth text-center text-gray-100 text-3xl tracking-wide">
              URUN-RI
            </p>
            <p className="font-questrial text-center text-cyan-700 text-md ">
              Bangun Negeri
            </p>
          </div>

          <nav className="text-yellow-50 text-xl font-medium  w-full mt-14">
            <ul className=" space-y-2 pl-3 mr-2"> 
              <motion.li whileHover={{ x: 10, scaleY: 1 }} className=" w-full  ">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    isActive ? "font-semibold text-2xl  pb-1 " : 'text-lg'
                  }
                >
                  <div className="border  p-2 rounded-lg">Dashboard</div>
                </NavLink>
              </motion.li>
              <motion.li>
                <br />
                <hr />
              </motion.li>
              <motion.li whileHover={{ x: 10, scaleY: 1 }}>
                <NavLink
                  to="goals"
                  state={{ isAddGoal: false }}
                  className={({ isActive }) =>
                    isActive ? "font-semibold text-2xl  pb-2 justify-around " : 'text-lg'
                  }
                >
                  <div className="border  p-2 rounded-lg">Goals</div>
                </NavLink>
              </motion.li>
              <motion.li whileHover={{ x: 5, scaleY: 1 }}>
                <NavLink
                  to="ma"
                  state={{ isAddMA: false }}
                  className={({ isActive }) =>
                    isActive ? "font-semibold text-2xl  pb-2 justify-around" : 'text-lg'
                  }
                >
                  <div className="border  p-2 rounded-lg">
                    Measured Activity
                  </div>
                </NavLink>
              </motion.li>{" "}
              <motion.li whileHover={{ x: 5, scaleY: 1 }}>
                <NavLink
                  to="archives"
                  state={{ isAddMA: false }}
                  className={({ isActive }) =>
                    isActive ? "font-semibold text-2xl  pb-2 justify-around" : 'text-lg'
                  }
                >
                  <div className="border  p-2 rounded-lg">Archives</div>
                </NavLink>
              </motion.li>
              <li className="pb-5">
                <hr />
              </li>
              <motion.li whileHover={{ x: 5, scaleY: 1 }} className='mt-5'>
                <button
                  className="rounded-lg border text-white text-2xl py-2 items-end px-5"
                  onClick={() => {
                    localStorage.clear();
                    setTimeout(() => {
                      navigate("/", { replace: true });
                    });
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
