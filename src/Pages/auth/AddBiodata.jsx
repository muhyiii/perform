import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Profile from "../../Images/profile.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Player } from "@lottiefiles/react-lottie-player";
import { FUNCTION_REGISTER_BIODATA } from "../../Redux/Actions/AUTH_ACTION";

const Biodata = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This function will be triggered when the file field change
  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileImage = e.target.files[0];
      if (fileImage.type.split("/")[0] !== "image") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Choose an image!",
        });
        selectedImage();
      } else setSelectedImage(fileImage);
    }
  };
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    role: "",
    position: "",
    birthday: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(selectedImage);
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", initialValues.name);
    formData.append("role", initialValues.role);
    formData.append("position", initialValues.position);
    formData.append("birthday", initialValues.birthday);

    if (
      initialValues.name === "" ||
      initialValues.role === "" ||
      initialValues.position === "" ||
      initialValues.birthday === "" ||
      selectedImage === undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please fill all of input requirement.",
        timer: 3000,
      });
    } else {
      const response = await dispatch(FUNCTION_REGISTER_BIODATA(formData));
      console.log(response);
      if (response.status === "Success") {
        Swal.fire({
          title: "Succesfull!",
          text: response.messege,
          icon: "success",
          timer: 1000,
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/acc/dashboard", { replace: true });
        }, 500);
      }
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <div className=" w-screen h-screen  bg-gradient-to-r overflow-hidden from-cyan-600 via-cyan-500 to-blue-400 relative flex justify-center items-center shadow-2xl  ">
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
        <div className="z-10 h-60 w-40 right-28 -bottom-10 opacity-40 bg-white absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-60 left-32 top-14 opacity-40 bg-blue-400 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div className="z-0 h-40 w-40 left-48 top-14  opacity-40 bg-blue-600 skew-x-6 mix-blend-multiply absolute rounded-full shadow-xl"></div>
        <div></div>
        <div className="grid grid-cols-5 w-4/5 h-5/6  pl-5   bg-slate-200  rounded-lg  z-10 ">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{
              ease: "easeOut",
              bounce: 0.5,
              duration: 1,
              type: "spring",
            }}
            className="col-span-3 "
          >
            <div className="border-b-2 border-blue-200 w-11/12 h-1/4 ml-4 ">
              <div className="flex mt-5">
                <div>
                  <img src={Profile} className="w-5 h-5 mt-2 ml-2" alt="" />
                </div>
                <div className="ml-5">
                  <h2 className="text-2xl text-blue-300">
                    Urun Ri Company Account
                  </h2>
                </div>
              </div>
              <div className="mt-5">
                <p>
                  Do work, create and manage work, analyze your overall work.
                  Make work more complex
                </p>
              </div>
            </div>

            <div className="border-b-2 border-blue-200 w-11/12 h-1/4 ml-4 ">
              <div className="flex mt-10">
                <div>
                  <img src={Profile} className="w-5 h-5 mt-2 ml-2" alt="" />
                </div>
                <div className="ml-5">
                  <h2 className="text-2xl text-blue-300">
                    Analyze employee work
                  </h2>
                </div>
              </div>
              <div className="mt-5">
                <p>
                  Create apps, connect databases and add-on services, and
                  collaborate on your apps.
                </p>
              </div>
            </div>

            <div className=" w-11/12 h-1/4 ml-4 ">
              <div className="flex mt-10">
                <div>
                  <img src={Profile} className="w-5 h-5 mt-2 ml-2" alt="" />
                </div>
                <div className="ml-5">
                  <h2 className="text-2xl text-blue-300">Urun Ri Company</h2>
                </div>
              </div>
              <div className="mt-5">
                <p>
                  URUN-RI as a Sharia-based Securities Crowfunding Organizer
                  presents a positive ecosystem in the interaction of Issuers
                  and Investors, by following OJK rules and sharia principles
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -1000 }}
            transition={{
              ease: "easeOut",
              duration: 1,
              type: "spring",
              bounce: 0.35,
            }}
            animate={{ x: 0 }}
            className="col-span-2 shadow-2xl rounded-bl-3xl shadow-slate-500 bg-white bottom-7 py-10 px-10 rounded-r-3xl  absolute right-32 w-2/6"
          >
            <form action="" onSubmit={handleSubmit}>
              <div className="space-y-5 mt-2 pl-9">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Name
                  <div className=" ">
                    <input
                      onChange={(e) => {
                        setInitialValues({
                          ...initialValues,
                          name: e.target.value,
                        });
                      }}
                      placeholder="Enter name"
                      name="name"
                      type="text"
                      className="capitalize ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md   outline-none py-2  w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                  </div>
                </label>
              </div>
              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Role
                  <div className=" ">
                    <input
                      onChange={(e) => {
                        setInitialValues({
                          ...initialValues,
                          role: e.target.value,
                        });
                      }}
                      placeholder="Enter role"
                      name="role"
                      type="text"
                      className="lowercase ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                  </div>
                </label>
              </div>
              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Position
                  <div className=" ">
                    <input
                      onChange={(e) => {
                        setInitialValues({
                          ...initialValues,
                          position: e.target.value,
                        });
                      }}
                      placeholder="Enter position"
                      name="position"
                      type="text"
                      className="lowercase ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                  </div>
                </label>
              </div>

              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Birthday
                  <div className=" ">
                    <input
                      max={"2005-12-31"}
                      min={"1970-01-01"}
                      onChange={(e) => {
                        setInitialValues({
                          ...initialValues,
                          birthday: e.target.value,
                        });
                      }}
                      placeholder="Enter birthday"
                      name="birthday"
                      type="date"
                      className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                  </div>
                </label>
              </div>
              <div className="mt-2 pl-9  ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Image
                  <div className=" ">
                    <input
                      onChange={(e) => {
                        imageChange(e);
                        // console.log(initialValues);
                      }}
                      // accept="image/*"
                      placeholder="Upload File"
                      name="image"
                      type="file"
                      className="  placeholder:capitalize  rounded-md  outline-none py-2  w-11/12 text-base bg-transparent"
                    />
                  </div>
                </label>
                <div className="h-28 mt-5">
                  {" "}
                  {selectedImage ? (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        // style={styles.image}
                        alt="Thumb"
                        className=" h-24"
                      />
                    </div>
                  ) : (
                    <p className="">Preview is here</p>
                  )}
                </div>
              </div>
              <div className="pl-10">
                <button
                  type="submit"
                  className="touch-pinch-zoom py-2 w-11/12 bg-blue-400 rounded-md mt-5 mb-5 hover:bg-amber-400 transition-all duration-500 ease-in"
                >
                  {isLoading ? "Loadings..." : "Create Account"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Biodata;
