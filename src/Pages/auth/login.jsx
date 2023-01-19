import React, { useState,  } from "react";
import logo from "../../Images/LOGO2.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import { FUNCTION_LOGIN } from "../../Redux/Actions/AUTH_ACTION";

export default function Login() {
  const [value, setValues] = useState({
    username: "",
    password: "",
  });
  const isLoading = useSelector((state) => state.PROCESS_REDUCER.isLoading);

  const [show, setShow] = useState(false);
  function handleChange(e) {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const response = await dispatch(FUNCTION_LOGIN(value));
    console.log(response);
    if (response.status === "Success") {
      setTimeout(() => {
        navigate("/acc/dashboard", { replace: true });
        // setIsLoading(false);
      }, 2000);
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
        timer: 3000,
      });
  };

  return (
    <React.Fragment>
      <div className=" w-screen h-screen bg-gradient-to-r overflow-hidden from-cyan-600 via-cyan-500 to-blue-400 relative flex justify-center items-center shadow-2xl  ">
        {/* <img src={Background} alt="" className="h-screen w-screen " /> */}
        {isLoading && (
          <div className="absolute z-50 h-screen flex items-center backdrop-blur-sm w-full justify-center">
            <div className=" ">
              <Player
                autoplay
                loop
                src={
                  "https://lottie.host/b44bd23b-999e-48a3-8efc-68ecf87bea51/8Gl3bPK7CJ.json"
                }
                style={{ height: "100px", width: "100px" }}
              ></Player>
            </div>
          </div>
        )}
        <div className="z-0 h-40 w-40 -left-20 -top-20 opacity-40 bg-cyan-200  absolute rounded-full shadow-xl"></div>{" "}
        <div className="z-0 h-40 w-40 -left-28 -bottom-10 rounded-lg ease-linear  rotate-12  opacity-40 bg-white absolute shadow-xl"></div>{" "}
        <div className="z-0 h-40 w-40 -left-24 -bottom-14 rounded-lg ease-linear  rotate-12  opacity-40 bg-white absolute shadow-xl"></div>
        <div className="z-10 h-60 w-40 right-28 -bottom-10 opacity-40 bg-white absolute rounded-full shadow-xl"></div>{" "}
        <div className="z-10 h-60 w-40 right-32 -bottom-10 opacity-40 bg-white absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-60 left-32 top-14 opacity-40 bg-blue-400 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-40 left-48 top-14  opacity-40 bg-blue-600 skew-x-6 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div className="grid grid-cols-2 w-3/4  py-10  bg-white  rounded-lg  z-10 ">
          <div className="  flex items-center justify-center">
          <div className="m-6  hover:cursor-pointer">
            <img
              src={logo}
              alt="urun-ri.png"
              className=" px-10 pt-10 pb-2 "
              onClick={() => {
                navigate("dashboard");
              }}
            />
            <p className="eveleth text-center text-blue-900 text-5xl tracking-widemotion.">
              URUN-RI
            </p>
            <p className="font-questrial text-center text-cyan-700 text-xl motion.">
              Bangun Negeri
            </p>
          </div>
          </div>
          <div className=" rounded-r-2xl flex justify-center items-center ">
            <div className=" w-4/5">
              <div className="text-left mt-5">
                <div className="  ">
                  <motion.p
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, bounce: 0.2, type: "spring" }}
                    className=" text-6xl font-bold"
                  >
                    Hello,
                  </motion.p>
                  <motion.p
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 1,
                      bounce: 0.2,
                      type: "spring",
                    }}
                    className=" text-2xl font-bold"
                  >
                    Welcome back
                  </motion.p>
                </div>
              </div>
              {/* //from */}
              <form action="">
                <div className="space-y-5 mt-14 ">
                  {" "}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 1,
                      bounce: 0.2,
                      type: "spring",
                    }}
                    className="  ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                  >
                    <label className="">
                      <input
                        onChange={handleChange}
                        placeholder="Enter your username"
                        name="username"
                        id="username"
                        type="text"
                        className="outline-none w-full bg-transparent bg-none"
                      />
                    </label>{" "}
                  </motion.div>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      duration: 1,
                      bounce: 0.2,
                      type: "spring",
                    }}
                    className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm "
                  >
                    <label className="flex items-center justify-center">
                      <input
                        onChange={handleChange}
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        prefix=""
                        className="outline-none w-full bg-transparent bg-none"
                      />
                      <div onClick={() => setShow(!show)}>
                        {show ? (
                          <AiOutlineEye size={22} />
                        ) : (
                          <AiOutlineEyeInvisible size={22} />
                        )}
                      </div>
                    </label>
                  </motion.div>
                  {/* //button */}
                </div>
              </form>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  value.username !== "" &&
                  value.password !== "" && { opacity: 1, scale: 1 }
                }
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: "easeOut",
                  type: "spring",
                  bounce: 0.3,
                }}
                type="button"
                onClick={() => {
                  if (value.password !== "" && value.username !== "")
                    handleSubmit();
                  if (value.password === "" || value.username === "") {
                    Swal.fire({
                      icon: "error",
                      title: "Error...",
                      text: "Please fill the input requirement.",
                    });
                  }
                }}
                className="py-2 w-full bg-blue-400 rounded-md mt-20 hover:bg-amber-400 transition-all duration-500 ease-in"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </motion.button>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  bounce: 0.2,
                  type: "spring",
                }}
                className="flex text-center w-full justify-center mt-5 mb-10"
              >
                <p className="">Don't have an account?</p>
                <Link
                  to={"/register"}
                  className="text-red-400 pl-1 hover:text-red-500 duration-500 hover:transition-colors hover:font-semibold"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
