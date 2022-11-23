import React from "react";

import { Player } from "@lottiefiles/react-lottie-player";

const Loadings = () => {
  return (
    <div className="h-screen  w-full flex items-center justify-center">
      <Player
        autoplay
        loop
        src={
          "https://lottie.host/?file=4351b23b-2d38-40a2-9629-588ef5f62eb9/CXYQvvSQef.json"
        }
        style={{ height: "200px", width: "200px" }}
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
