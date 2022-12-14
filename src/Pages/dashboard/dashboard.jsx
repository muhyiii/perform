import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "swiper/css";
import "swiper/css/free-mode";
import User from "../../Component/User";
import TodoGoal from "./dashboard component/TodoGoal";
import TodoMa from "./dashboard component/TodoMa";
import ReviewsProvider from "../../Component/Support/ReviewsProvider";
import Peringkat from "./dashboard component/Peringkat";
import Scrollbars from "react-custom-scrollbars-2";
import Target from "../../Images/target.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        background: "#495579",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        background: "#495579",
      }}
      onClick={onClick}
    />
  );
}

const data = [
  {
    name: "Risk",
    Goal: 40,
    Ma: 24,
    amt: 24,
  },

  {
    name: "Operational",
    Goal: 20,
    Ma: 44,
    amt: 22,
  },
  {
    name: "IT",
    Goal: 27,
    Ma: 39,
    amt: 20,
  },
];
const persen = 66;

const Dashboard = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="relative  h-screen">
      <User />
      <div className="p-10  h-full w-auto">
        {/* <div>
          <h1 className="text-5xl font-bold pb-4">Dashboard</h1>
        </div> */}
        <div
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="1000"
          data-aos-offset="0"
          className="_periode flex justify-start pb-5"
        >
          <div className="font-serif ">Periode :</div>

          <div className="">
            <input type="month" className="font-serif text-blue-500 " />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-3 w-auto  flex-auto h-96  ">
          {/* //Progress perusahaan */}
          <div
            className="bg-slate-200 rounded-lg col-span-3  drop-shadow-xl"
            data-aos="zoom-in-right"
          >
            <div className="container mx-auto">
              <div className="container text-center mx-auto font-semibold py-5">
                <h3>Progress Perusahaan</h3>
              </div>

              <div
                className="diagram lingkaran container mx-auto"
                style={{ width: 120, height: 150 }}
              >
                <ReviewsProvider
                  valueStart={0}
                  valueEnd={persen}
                  size={14}
                ></ReviewsProvider>
              </div>
              <div className="container mx-auto">
                <div className="_periode flex   ">
                  <div>
                    <p className="text-center text-sm px-10">
                      Anda telah mencapai 66% dari keseluruhan goal anda
                    </p>
                  </div>
                </div>
              </div>
              <div className="container mx-auto space-x-5 justify-center flex  mt-10">
                <div className="bg-slate-200 text-xs text-center">
                  <div className="text-base  text-red-600 text-center border-gray-400  border-2 rounded-xl mb-1">
                    74.72%
                  </div>
                  Rata-rata goal
                </div>
                <div className="bg-slate-200 text-xs text-center">
                  <div className="text-base  text-red-600 text-center border-gray-400  border-2 rounded-xl mb-1">
                    60.96%
                  </div>
                  Rata-rata MA
                </div>
              </div>
            </div>
          </div>
          {/* Pencapaian divisi */}
          <div
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="4500"
            className="Diagram col-span-4 bg-slate-200 rounded-lg drop-shadow-xl h-96 "
          >
            <div className="font-semibold p-5 ">
              <h3>Pencapaian Divisi</h3>
            </div>
            <div className=" ">
              <BarChart
                width={360}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 40,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Goal" fill="#af76f5" />
                <Bar dataKey="Ma" fill="#7fd7f5" />
              </BarChart>
            </div>
          </div>

          {/* //list your job */}
          <div
            className=" col-start-8 col-end-13 h-96  "
            data-aos="zoom-out-left"
          >
            {" "}
            <div className=" bg-slate-200 rounded-lg h-full overflow-auto  drop-shadow-xl  ">
              <div className="pt-11">
                <img src={Target} alt="" className="w-32 mx-auto " />
                <h2 className="text-slate-600 font-medium text-center text-base">
                  Anda telah mencapai 0,00% dari target Anda
                </h2>
                <div className=" pt-8 flex justify-center gap-x-16">
                  <div>
                    <h1 className="text-center pb-1 font-light">
                      Performa Goal Anda
                    </h1>
                    <div className="mx-auto w-16 h-6 bg-blue-400 rounded-3xl">
                      <h1 className="text-center pt-0.5 text-sm text-white">
                        115%
                      </h1>
                    </div>
                  </div>

                  <div className=" ">
                    <h1 className="text-center pb-1 font-light">
                      Performa Ma Anda
                    </h1>
                    <div className="mx-auto w-16 h-6 bg-blue-400 rounded-3xl">
                      <h1 className="text-center pt-0.5 text-sm text-white">
                        115%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-48">
          <div
            className=" h-96 flex gap-x-8 justify-between pt-10 "
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="bg-gradient-to-tl from-slate-300 rounded-lg w-[500px] h-[500px] drop-shadow-xl pb-10 ">
              <div className="w-96 mx-auto font-extrabold text-2xl pt-6 text-center">
                Peringkat Teratas
              </div>
              <Peringkat />
            </div>

            <div className="bg-gradient-to-tr from-slate-300 rounded-lg w-[600px] h-[500px] drop-shadow-xl pb-10 ">
              <div className="w-96 mx-auto font-extrabold text-2xl pt-6 text-center">
                Job List
              </div>{" "}
              <Scrollbars autoHide height={"100%"}>
                <div className="pl-12">
                  <Slider {...settings}>
                    <TodoGoal />
                    <TodoMa />
                  </Slider>
                </div>
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
