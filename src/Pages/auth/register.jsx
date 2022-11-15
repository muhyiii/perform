import React, { useState } from "react";
import Logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
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
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="space-y-5 mt-14 ">
                  <label className="">
                    <div className=" ">
                      <input
                     onChange={formik.handleChange}
                     placeholder="Enter Username"
                     name="name"
                     value={formik.values.username}
                     type="text"
                        className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                      />
                      {formik.errors.username && formik.touched.username && (
                        <p className="text-red-400 h-2 text-sm">{formik.errors.username}</p>
                      )}
                    </div>
                  </label>{" "}
                  <div className=" ">
                    <label className=" ">
                      <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className="text-red-400 h-2 text-sm">{formik.errors.password}</p>
                      )}
                    </label>
                  </div>
                  <div className=" ">
                    <label className=" ">
                      <input
                        type="confirm_password"
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                      />
                      {formik.errors.confirm_password && formik.touched.confirm_password && (
                        <p className="text-red-400 h-2 text-sm">{formik.errors.confirm_password}</p>
                      )}
                    </label>
                  </div>
                  {/* //button */}
                </div>
                <button
                  type="submit"
                  className="py-2 w-full bg-amber-300 rounded-md mt-20 hover:bg-amber-400 transition-all duration-500 ease-in"
                >
                  Sign Up
                </button>
              </form>

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
