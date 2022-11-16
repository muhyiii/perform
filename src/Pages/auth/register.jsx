import React, { useState } from "react";
import { useEffect } from "react";

import Background from "../../Images/background.png";

import Logo from "../../Images/logo.png";
import Validation from "./Validation";
import { Link } from "react-router-dom";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setError] = useState({});

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.username]: e.target.value,
      [e.target.password]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(Validation(values));
  }

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      values.username !== "" &&
      values.password !== ""

    ) {
      alert("Form Submited");
    }
  }, [errors]);
  return (
    // from-cyan-600 via-cyan-500 to-blue-400
    <React.Fragment>
      <div className=" w-screen h-screen bg-gradient-to-r overflow-hidden bg-image  relative flex justify-center items-center shadow-2xl  ">
        {/* <img src={Background} alt="" className="h-screen w-screen " /> */}
        {/* <div className="z-0 h-40 w-40 -left-20 -top-20 opacity-40 bg-cyan-200  absolute rounded-full shadow-xl"></div>{" "}
        <div className="z-0 h-40 w-40 -left-28 -bottom-10 rounded-lg ease-linear  rotate-12  opacity-40 bg-white absolute shadow-xl"></div>{" "}
        <div className="z-0 h-40 w-40 -left-24 -bottom-14 rounded-lg ease-linear  rotate-12  opacity-40 bg-white absolute shadow-xl"></div>
        <div className="z-10 h-60 w-40 right-28 -bottom-10 opacity-40 bg-white absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-60 left-32 top-14 opacity-40 bg-blue-400 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-40 left-48 top-14  opacity-40 bg-blue-600 skew-x-6 mix-blend-multiply absolute rounded-full shadow-xl"></div> */}
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
              <form action="" onSubmit={handleSubmit}>
                <div className="space-y-5 mt-14 ">
                  <label className="">
                    <div className=" ">
                      <input
                        onChange={handleChange}
                        placeholder="Enter your username"
                        name="Username"
                        type="text"
                        className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                      />
                      {errors.name && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </label>{" "}
                  <div className=" ">
                    <label className=" ">
                      <input
                        onChange={handleChange}
                        placeholder="Enter password"
                        name="password"
                        type="password"
                        className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                      />
                      {errors.password && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.password}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className=" ">
                    <label className=" ">
                      <input
                        onChange={handleChange}
                        placeholder="Enter confirmation password"
                        name="passwordConfirmation"
                        type="passwordConfirmation"
                        className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                      />
                      {errors.passwordConfirmation && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.passwordConfirmation}
                        </p>
                      )}
                    </label>
                  </div>
                  {/* //button */}
                </div>
              </form>
              <button
                type="submit"
                className="py-2 w-full bg-amber-300 rounded-md mt-20 hover:bg-amber-400 transition-all duration-500 ease-in"
              >
                Sign Up
              </button>
              <div className="flex text-center w-full justify-center mt-5 mb-10">
                <p className="">Already have an account?</p>
                <Link
                  to={"/login"}
                  className="text-red-400 pl-1 hover:text-red-500 duration-500 hover:transition-colors hover:font-semibold"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}