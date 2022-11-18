import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Profile from "../../Images/profile.png";

const RegisterBiodata = () => {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(URL.createObjectURL(selectedImage));
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
      position: "",
      image: "",
      birthday: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required!"),
      role: Yup.string().required("Required!"),
      position: Yup.string().required("Required!"),
      image: Yup.string().required("Required!"),
      birthday: Yup.string().required("Required!"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
                  URUN-RI as a Sharia-based Securities Crowdfunding Organizer
                  presents a positive ecosystem in the interaction of Issuers
                  and Investors, by following OJK rules and sharia principles
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-2 shadow-2xl rounded-bl-3xl shadow-slate-500 bg-white mt-8 ml-5 w-full rounded-r-3xl">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="space-y-5 mt-2 pl-9">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Name
                  <div className=" ">
                    <input
                      onChange={formik.handleChange}
                      placeholder="Enter name"
                      name="name"
                      value={formik.values.name}
                      type="text"
                      className=" ring-slate-400 ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md   outline-none py-2  w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p className="text-red-400 h-2 text-xs">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                </label>
              </div>
              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Role
                  <div className=" ">
                    <input
                      onChange={formik.handleChange}
                      placeholder="Enter role"
                      name="name"
                      value={formik.values.role}
                      type="text"
                      className=" ring-slate-400 ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {formik.errors.role && formik.touched.role && (
                      <p className="text-red-400 h-2 text-xs">
                        {formik.errors.role}
                      </p>
                    )}
                  </div>
                </label>
              </div>
              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Position
                  <div className=" ">
                    <input
                      onChange={formik.handleChange}
                      placeholder="Enter position"
                      name="name"
                      value={formik.values.position}
                      type="text"
                      className=" ring-slate-400 ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {formik.errors.position && formik.touched.position && (
                      <p className="text-red-400 h-2 text-xs">
                        {formik.errors.position}
                      </p>
                    )}
                  </div>
                </label>
              </div>

              <div className="space-y-5 mt-2 pl-9 ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Birthday
                  <div className=" ">
                    <input
                      onChange={formik.handleChange}
                      placeholder="Enter birthday"
                      name="birthday"
                      value={formik.values.birthday}
                      type="date"
                      className=" ring-slate-400 ring-1 placeholder:capitalize invalid:ring-red-500 invalid:ring-2  focus:ring-2 rounded-md  outline-none py-2 w-11/12 h-9 px-3  text-base bg-transparent shadow-sm"
                    />
                    {formik.errors.birthday && formik.touched.birthday && (
                      <p className="text-red-400 h-2 text-xs">
                        {formik.errors.birthday}
                      </p>
                    )}
                  </div>
                </label>
              </div>
              <div className="mt-2 pl-9  ">
                <label className="text-sm text-slate-600 ml-1 mb-1">
                  Image
                  <div className=" ">
                    <input
                      onChange={imageChange}
                      accept="image/*"
                      placeholder="Upload File"
                      name="image"
                      value={formik.values.image}
                      type="file"
                      className="  placeholder:capitalize  rounded-md  outline-none py-2  w-11/12 text-base bg-transparent"
                    />

                    {formik.errors.image && formik.touched.image && (
                      <p className="text-red-400 h-2 text-xs">
                        {formik.errors.image}
                      </p>
                    )}
                  </div>
                </label>
                {selectedImage && (
                  <div style={styles.preview}>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      style={styles.image}
                      alt="Thumb"
                      className="w-56 h-24"
                    />
                  </div>
                )}
              </div>
              <div className="pl-10">
                <button
                  type="submit"
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
export default RegisterBiodata;

const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
