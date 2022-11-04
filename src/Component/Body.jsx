import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Outlet } from "react-router-dom";
import  logo  from ".././Images/logo.png";

const Body = () => {
  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-[#050b59] h-screen col-span-2">
        <div className="">
          <img src={logo} alt="" />
          <div className="text-xl w-full text-center">
            <p className="bg-gray-400 w-full">Dashboard</p>
          </div>
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
