import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="grid grid-cols-11 w-screen h-screen">
      <div className="bg-zinc-700 h-screen col-span-2"></div>
      <div className="col-span-9 overflow-auto ">
        <Scrollbars  autoHide style={{height: '100%'}}>
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Body;
