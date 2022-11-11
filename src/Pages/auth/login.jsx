import React, { useState } from "react";
import { useEffect } from "react";
// import Animasi from "../Images/animasi.mp4"
import Background from "../../Images/background.png"
// import Logo from "../Images/job.png"
import Logo from "../../Images/logo.png"
import Validation from "./Validation";
import { Link } from "react-router-dom";


export default function Login() {
  const [values, setValues] = useState({
    name: '',
    password: ''
  })
  const [errors, setError] = useState({})

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(Validation(values));
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && (values.name !== "" && values.password !== "")) {
      alert("Form Submited");
    }

  }, [errors])
  return (
    <React.Fragment>

      <div className="relative w-full h-full">
        <img src={Background} alt="" className="h-screen w-screen" />
        <div className="grid grid-cols-2 w-full h-screen flex-auto pl-10 pr-10 pt-12 pb-16 absolute top-0 bg-transparent  ">
          <div className="bg-white bg-opacity-90 rounded-l-2xl flex items-center justify-center">
            <img src={Logo} alt="" className="w-5/6 rounded-l-2xl " />
          </div>
          <div className="bg-white bg-opacity-90 rounded-r-2xl">

            <div className="grid grid-cols-2 flex-auto w-full pr-10 ">
              <div className="  ">
                <p className="text-center text-3xl font-extrabold pl-6 pt-20 mt-1">Hello,</p>
                <p className="text-center text-2xl font-bold pl-24  "> Welcome back</p>
              </div>

            </div>
            {/* //from */}
            <form action="" onSubmit={handleSubmit}>
              <div className="mx-auto pl-20 pt-5 ">


                <label className="mb-3 text-sm pr-3 pl-12">Username</label>
                <div className=" container pl-12 p-1">
                  <input
                    onChange={handleChange}
                    placeholder="Enter Username"
                    name="name"
                    value={values.name}
                    type="text"
                    className=" border-b-2 border-t-2 border-indigo-300 rounded-md h-8 outline-none pl-3 lg:w-3/4 text-sm bg-transparent shadow-md"
                  />
                  {errors.name && <p style={{ color: "red", fontSize: "13px" }}>{errors.name}</p>}
                </div>
                <div className="password pt-4">


                  <label className="mb-3 text-sm pr-3 pl-12 ">Password</label>
                  <div className=" pl-12 p-1 ">
                    <input
                      onChange={handleChange}
                      placeholder="Enter Password"
                      name="password"
                      value={values.password}
                      type="password"
                      className=" border-b-2 border-t-2 border-indigo-300 rounded-md h-8 outline-none pl-3 lg:w-3/4 text-sm bg-transparent shadow-md"
                    />
                    {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>}
                  </div>
                </div>


                {/* //button */}
                <div className="w-4/5 h-20 pt-10 pl-8 ">
                  <button type="submit" className="w-full h-10 bg-amber-300 rounded-lg">
                    Sign In
                  </button>
                </div>

              </div>
            </form>

            <div className="flex w-4/5 pt-5 pl-32">
              <div className=" mx-auto flex">
                <p className="text-center">Don't have an account?</p>
                <Link to={"/register"} className="text-red-400 pl-1">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>



    </React.Fragment>
  );
}

{/* <img src={Background} alt="" className="w-screen h-screen " />

        <div className="  bg-black absolute right-9 left-9 mx-auto"></div> */}