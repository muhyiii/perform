import React, { useState } from "react";
import Logo from "../../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
import Loadings from "../../Component/Loading";
import { FUNCTION_REGISTER } from "../../Redux/Actions/AUTH_ACTION";

const validateSchema = Yup.object({
  username: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("You must fill this requirement!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is needed!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("You must fill confirmation password!"),
});

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <Loadings />;

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
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 1,
                ease: "easeOut",
                type: "spring",
                bounce: 0.3,
              }}
              src={Logo}
              alt=""
              className=""
            />
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
              <div>
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    confirm_password: "",
                  }}
                  onSubmit={async (values) => {
                    setIsLoading(true);
                    const response = await dispatch(FUNCTION_REGISTER(values));
                    console.log(response);
                    if (response.status === "Success") {
                      navigate("/add-biodata", { replace: true });
                      Swal.fire({
                        title: "Succesfull!",
                        text: response.messege,
                        icon: "success",
                        timer: 3000,
                      });
                      setIsLoading(false);
                    }
                  }}
                  validationSchema={validateSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form action="" onSubmit={handleSubmit}>
                      <div className="space-y-5 mt-14 ">
                        <motion.div
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.2,
                            duration: 1,
                            bounce: 0.2,
                            type: "spring",
                          }}
                          className=" "
                        >
                          <label className="">
                            <input
                              onChange={handleChange}
                              placeholder="Enter your username"
                              name="username"
                              value={values.username}
                              type="text"
                              className=" ring-black ring-1  invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-sm  outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm"
                            />
                            {errors.username && touched.username && (
                              <p className="text-red-400 h-2 text-sm">
                                {errors.username}
                              </p>
                            )}
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
                          className=""
                        >
                          <label className=" flex items-center focus-within:ring-2 ring-black ring-1 rounded-sm  invalid:ring-red-500 invalid:ring-2     outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm  ">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              className="w-full outline-none bg-transparent"
                            />{" "}
                            <div onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <AiOutlineEye size={22} />
                              ) : (
                                <AiOutlineEyeInvisible size={22} />
                              )}
                            </div>
                          </label>{" "}
                          {errors.password && touched.password && (
                            <p className="text-red-400 h-2 text-sm">
                              {errors.password}
                            </p>
                          )}
                        </motion.div>
                        <motion.div
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.6,
                            duration: 1,
                            bounce: 0.2,
                            type: "spring",
                          }}
                        >
                          <label className=" flex items-center focus-within:ring-2 ring-black ring-1 rounded-sm  invalid:ring-red-500 invalid:ring-2     outline-none py-2 w-full px-3  text-base bg-transparent shadow-sm  ">
                            <input
                              type={
                                showConfirmationPassword ? "text" : "password"
                              }
                              placeholder="Enter confirmation password"
                              name="confirm_password"
                              value={values.confirm_password}
                              onChange={handleChange}
                              className="w-full outline-none bg-transparent"
                            />{" "}
                            <div
                              onClick={() =>
                                setShowConfirmationPassword(
                                  !showConfirmationPassword
                                )
                              }
                            >
                              {showConfirmationPassword ? (
                                <AiOutlineEye size={22} />
                              ) : (
                                <AiOutlineEyeInvisible size={22} />
                              )}
                            </div>
                          </label>{" "}
                          {errors.confirm_password &&
                            touched.confirm_password && (
                              <p className="text-red-400 h-2 text-sm">
                                {errors.confirm_password}
                              </p>
                            )}
                        </motion.div>
                        {/* //button */}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0 }}
                        transition={{
                          ease: "easeIn",
                          type: "spring",
                          bounce: 0.3,
                          damping: 10,
                          stiffness: 100,
                        }}
                        animate={
                          values.username !== "" &&
                          values.password !== "" &&
                          values.confirm_password !== "" && {
                            opacity: 1,
                            scale: 1,
                          }
                        }
                        type="submit"
                        className="py-2 w-full bg-blue-400 rounded-md mt-20 hover:bg-amber-400 transition-all duration-500 ease-in"
                      >
                        Sign Up
                      </motion.button>
                    </form>
                  )}
                </Formik>
              </div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 1,
                  bounce: 0.2,
                  type: "spring",
                }}
                className="flex text-center w-full justify-center mt-5 mb-10"
              >
                <p className="">Already have an account?</p>
                <Link
                  to={"/login"}
                  className="text-red-400 pl-1 hover:text-red-500 duration-500 hover:transition-colors hover:font-semibold"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
