import React from "react";

import { Player } from "@lottiefiles/react-lottie-player";

const Loadings = () => {
  return (
    <div className="h-screen  w-full flex items-center justify-center">
      <Player
        autoplay
        loop
        src={
          "https://lottie.host/3425dfb9-3688-4154-8741-ce55a06174ea/d70t0oUroc.json"
        }
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>

    // <div className="parent">
    //   asdad
    //   <div className="blue blu "></div>
    //   <div className="orange yellow"></div>
    //   <div className=" blu blue"></div>
    //   {/* <div className="h-20 w-20 Rectangle_82 bg"></div> */}
    //   <div className="polygon-20 Polygon_20"></div>
    //   <div className="polygon-21 Polygon_21"></div>
    // </div>
  );
};

export default Loadings;
