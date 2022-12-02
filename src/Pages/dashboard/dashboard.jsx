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
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import User from "../../Component/User";
import TodoGoal from "./dashboard component/TodoGoal";
import TodoMa from "./dashboard component/TodoMa";
import ReviewsProvider from "../../Component/Support/ReviewsProvider";
import Peringkat from "./dashboard component/Peringkat";

const data = [
  {
    name: "Risk..",
    Goal: 4000,
    Ma: 2400,
    amt: 2400,
  },
  {
    name: "Marketing...",
    Goal: 3000,
    Ma: 1398,
    amt: 2210,
  },
  {
    name: "Operational",
    Goal: 2000,
    Ma: 9800,
    amt: 2290,
  },
  {
    name: "IT",
    Goal: 2780,
    Ma: 3908,
    amt: 2000,
  },
];
const persen = 66;

const Dashboard = () => {
  return (
    <div className="relative  h-screen">
      <User />
      <div className="p-10  h-full w-auto">
        <div>
          <h1 className="text-5xl font-bold pb-4">Dashboard</h1>
        </div>
        <div className="_periode flex justify-start pb-5">
          <div className="font-serif ">Periode :</div>

          <div className="">
            <input type="month" className="font-serif text-blue-500 " />
          </div>
        </div>

        <div className="grid grid-cols-2 w-auto  flex-auto h-96  ">
          <div className="bg-slate-200 rounded-lg w-5/6 drop-shadow-xl  ">
            <div className="container mx-auto    w-80 ">
              <div className="container text-center mx-auto font-semibold p-5 pb-5 pl-5">
                <h3>Progress Perusahaan</h3>
              </div>

              <div
                className=" container mx-auto"
                style={{ width: 150, height: 150 }}
              >
                <ReviewsProvider valueStart={0} valueEnd={persen} size={14}>
                </ReviewsProvider>
              </div>
              <div className="container mx-auto">
                <div className="_periode  flex w-full  ">
                  <div>
                    <p className="text-center">
                      Anda telah mencapai 66% dari keseluruhan goal anda
                    </p>
                  </div>
                </div>
              </div>
              <div className="container mx-auto grid grid-cols-2 gap-14 flex-auto w-60 h-7 pt-4">
                <div className="bg-slate-200 border-2 border-gray-400 rounded-2xl">
                  <div className="text-md  text-red-600 text-center">
                    74.72%
                  </div>
                </div>
                <div className="bg-slate-200 border-2 border-gray-400 rounded-2xl">
                  <div className="text-md  text-red-600 text-center">
                    60.96%
                  </div>
                </div>
              </div>
              <div className="container mx-auto grid grid-cols-2 gap-14 flex-auto w-60 h-7 pt-4">
                <div className="text-sm text-center">Rata-rata goal</div>
                <div className="text-sm text-center">Rata-rata goal</div>
              </div>
            </div>
          </div>

          <div className=" bg-slate-200 rounded-lg drop-shadow-xl  ">
            <div className="font-semibold p-5 pl-5">
              <h3>Pencapaian Divisi</h3>
            </div>
            <div className="mx-auto">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Goal" fill="#8884d8" />
                <Bar dataKey="Ma" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>

        <div>
          <Peringkat />
          <div className="pt-20 pb-10 ">
            <div className=" bg-slate-200 rounded-lg w-full h-screen  drop-shadow-xl  ">
              <div className=" w-36 h-16 mx-auto font-extrabold text-2xl pt-5 text-center pb-5">
                To do list
              </div>
              <Swiper
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="mySwiper"
                slidesPerView={1}
                spaceBetween={30}
              >
                <SwiperSlide>
                  <TodoGoal />
                </SwiperSlide>
                <SwiperSlide>
                  <TodoMa />
                </SwiperSlide>
              </Swiper>

              {/* <Slider {...settings}>
            <div>
           125
            </div>
            <div>
           124
            </div>
            <div>
           123
            </div>
          </Slider> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
