import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Loadings = () => {
  return (
    <div className="h-screen  w-full flex items-center justify-center">
      <Player
        autoplay
        loop
        src={
          "https://lottie.host/b44bd23b-999e-48a3-8efc-68ecf87bea51/8Gl3bPK7CJ.json"
        }
        style={{ height: "200px", width: "200px" }}
      ></Player>
    </div>
  );
};

export default Loadings;
