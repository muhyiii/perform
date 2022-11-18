import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Profile from "../../Images/profile.png";
import { functionRegisterBiodata } from "../../redux/actions/authAction";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { api } from "../../Functions/api";

const Biodata = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This function will be triggered when the file field change
  const imageChange = async (e, setFieldValue) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileImage = e.target.files[0];
      setSelectedImage(fileImage);
      // setImageBase("image", fileImage);
      setInitialValues({ ...initialValues, image: fileImage });
    }
  };

  const setImageBase = (img) => {
    const read = new FileReader(img);
    read.readAsDataURL(img);
    read.onloadend = () => {
      setImage(read.result);
      setInitialValues({ ...initialValues, image: image });
    };
  };
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   alert(URL.createObjectURL(selectedImage));
  // };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    role: "",
    position: "",
    birthday: "",
  });

  // const schema = Yup.object({
  //   name: Yup.string().required("Name is required!"),
  //   role: Yup.string().required("Role is required!"),
  //   position: Yup.string().required("Position is also required!"),
  //   // image: Yup.mixed()
  //   //   .nullable()
  //   //   .required("A file is required")
  //   //   .test(
  //   //     "fileFormat",
  //   //     "Unsupported Format",
  //   //     (value) => value && SUPPORTED_FORMATS.includes(value.type)
  //   //   ),
  //   birthday: Yup.string().required("Required!"),
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", initialValues.name);
    formData.append("role", initialValues.role);
    formData.append("position", initialValues.position);
    formData.append("birthday", initialValues.birthday);
    // console.log(formData);
    // const response = await axios.post(
    //   api + `/register-account/continue/${localStorage.getItem("id")}`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data ",
    //     },
    //   }
    // );
    // return console.log(data);

    const response = await dispatch(functionRegisterBiodata(formData));
    console.log(response);
    // return;
    if (response.status === "Success") {
      Swal.fire("Succesfull!", response.messege, "success");
      setTimeout(() => {
        navigate("/acc/dashboard");
      }, 500);
    }
  };

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
        <div></div>
        <div className="grid grid-cols-5 w-4/5 h-5/6  pl-5   bg-slate-200  rounded-lg  z-10 ">
          <div className="col-span-3 ">
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
          </div>

          <div className="col-span-2 shadow-2xl rounded-bl-3xl shadow-slate-500 bg-white bottom-7 py-10 px-10 rounded-r-3xl  absolute right-32 w-2/6">
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
                      className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md   outline-none py-2  w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {/* {errors.name && touched.name && (
                      <p className="text-red-400 h-2 text-xs">{errors.name}</p>
                    )} */}
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
                      className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {/* {errors.role && touched.role && (
                      <p className="text-red-400 h-2 text-xs">{errors.role}</p>
                    )} */}
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
                      className=" ring-black ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {/* {errors.position && touched.position && (
                      <p className="text-red-400 h-2 text-xs">
                        {errors.position}
                      </p>
                    )} */}
                  </div>
                </label>
              </div>

              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Birthday
                  <div className=" ">
                    <input
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
                    {/* {errors.birthday && touched.birthday && (
                      <p className="text-red-400 h-2 text-xs">
                        {errors.birthday}
                      </p>
                    )} */}
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

                    {/* {errors.image && touched.image && (
                      <p className="text-red-400 h-2 text-xs">{errors.image}</p>
                    )} */}
                  </div>
                </label>
                <div className="h-28 mt-5">
                  {" "}
                  {selectedImage ? (
                    <div style={styles.preview}>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        style={styles.image}
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
                  // onClick={()=>{
                  //   handleSubmit()
                  // }}
                  className="touch-pinch-zoom py-2 w-11/12 bg-amber-300 rounded-md mt-5 mb-5 hover:bg-amber-400 transition-all duration-500 ease-in"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Biodata;

const styles = {
  // preview: {
  //   marginTop: 50,
  //   display: "flex",
  //   flexDirection: "column",
  // },
  // image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
