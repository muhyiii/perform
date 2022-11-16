import React, { useState, useContext } from "react";

import Logo from "../../Images/logo.png";
import Validation from "./Validation";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import axios from "axios";
import { api } from "../../Functions/api";
import Swal from "sweetalert2";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { UserContext } from "../../App";
import { useDispatch } from "react-redux";
import { functionLogin } from "../../redux/actions/authAction";

export default function Login() {
  // const { user, setUser } = useContext(UserContext);
  const [value, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setError] = useState({});
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
  const handleSubmit = async () => {
    const response = await dispatch(functionLogin(value));
    console.log(response.status );
    if (response.status === "Success") {
      Swal.fire("Succesfull!", response.messege, "success");
      setTimeout(() => {
        return navigate("/acc/dashboard");
      }, 500);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.messege,
      });
  };
  // useEffect(() => {
  //   if (
  //     Object.keys(errors).length === 0 &&
  //     value.username === "" &&
  //     value.password === ""
  //   ) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error...",
  //       text: "Please fill the input requirement.",
  //     });
  //   }
  // }, [errors]);
  return (
    <React.Fragment>
      <div className=" w-screen h-screen bg-gradient-to-r overflow-hidden from-cyan-600 via-cyan-500 to-blue-400 relative flex justify-center items-center shadow-2xl  ">
        {/* <img src={Background} alt="" className="h-screen w-screen " /> */}
        <div className="z-0 h-40 w-40 -left-20 -top-20 opacity-40 bg-cyan-200  absolute rounded-full shadow-xl"></div>{" "}
        <div className="z-0 h-40 w-40 -left-28 -bottom-10 rounded-lg ease-linear  rotate-12  opacity-40 bg-white absolute shadow-xl"></div>{" "}
        <div className="z-0 h-40 w-40 -left-24 -bottom-14 rounded-lg ease-linear  rotate-12  opacity-40 bg-white absolute shadow-xl"></div>
        <div className="z-10 h-60 w-40 right-28 -bottom-10 opacity-40 bg-white absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-60 left-32 top-14 opacity-40 bg-blue-400 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-40 left-48 top-14  opacity-40 bg-blue-600 skew-x-6 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div className="grid grid-cols-2 w-3/4  py-10  bg-white  rounded-lg  z-10 ">
          <div className="  flex items-center justify-center">
            <img src={Logo} alt="" className="" />
          </div>
          <div className=" rounded-r-2xl flex justify-center items-center ">
            <div className=" w-4/5">
              <div className="text-left mt-5">
                <div className="  ">
                  <p className=" text-6xl font-bold ">Hello,</p>
                  <p className=" text-2xl font-bold   ">Welcome back</p>
                </div>
              </div>
              {/* //from */}
              <form action="">
                <div className="space-y-5 mt-14 ">
                  {" "}
                  <div className="  ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm">
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
                    {errors.username && (
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm ">
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
                    {errors.password && (
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* //button */}
                </div>
              </form>
              <button
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
                className="py-2 w-full bg-amber-300 rounded-md mt-20 hover:bg-amber-400 transition-all duration-500 ease-in"
              >
                Sign Up
              </button>
              <div className="flex text-center w-full justify-center mt-5 mb-10">
                <p className="">Already have an account?</p>
                <Link
                  to={"/register"}
                  className="text-red-400 pl-1 hover:text-red-500 duration-500 hover:transition-colors hover:font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
