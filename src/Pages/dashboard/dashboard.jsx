<<<<<<< HEAD:src/Pages/dashboard.jsx
import React from "react";
import profile from "../Images/profile.png";
=======
import React, { PureComponent } from "react";
// import profile from '../Images/profile.png'
>>>>>>> 92191f873c1d10f75800d2dcbcee7819e3610733:src/Pages/dashboard/dashboard.jsx
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
<<<<<<< HEAD:src/Pages/dashboard.jsx
import ChangingProgressProvider from "../Component/Support/ChangingProggresProvider";
import Peringkat from "./data";
=======
import ChangingProgressProvider from "../../Component/ChangingProggresProvider";
import Peringkat from "./peringkat"
import Todolist from "./Todolist";
>>>>>>> 92191f873c1d10f75800d2dcbcee7819e3610733:src/Pages/dashboard/dashboard.jsx
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
  let dummy = [
    {
      nama: "Fudail Ramadhani",
      presentase: "150%",
    },
    {
      nama: "Fudail Ramadhani",
      presentase: "150%",
    },
    {
      nama: "Fudail Ramadhani",
      presentase: "150%",
    },
    {
      nama: "Fudail Ramadhani",
      presentase: "150%",
    },
  ];

  const [row, setrow] = React.useState(true);
  return (
    <div className="pl-10 pr-5 pt-10 h-full w-auto">
      <div>
        <h1 className="text-5xl font-bold pb-4">Dashboard</h1>
      </div>
      <div className="_periode flex justify-start pb-5">
        <div className="font-serif ">Periode :</div>

        <div className="font-serif text-blue-500 bg-blue-50 ">oktober 2022</div>
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
              <ChangingProgressProvider values={[0, `${23}`]}>
                {(percentage) => (
                  <CircularProgressbarWithChildren
                    value={percentage}
                    strokeWidth={20}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,

                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",

                      // Text size

                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,

                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',

                      // Colors
                      pathColor: `rgba(62, 152, 199, ${percentage / 100})`,

                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  >
                    <p className="text-xl pl-3">{percentage} %</p>
                  </CircularProgressbarWithChildren>
                )}
              </ChangingProgressProvider>
            </div>
            <div className="container mx-auto">
              <div className="_periode  flex w-full  ">
               <div>
                <p className="text-center">Anda telah mencapai 66% dari keseluruhan goal anda</p>
               </div>
              </div>
             
            </div>
            <div className="container mx-auto grid grid-cols-2 gap-14 flex-auto w-60 h-7 pt-4">
              <div className="bg-slate-200 border-2 border-gray-400 rounded-2xl">
                <div className="text-md  text-red-600 text-center">74.72%</div>
              </div>
              <div className="bg-slate-200 border-2 border-gray-400 rounded-2xl">
                <div className="text-md  text-red-600 text-center">60.96%</div>
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
<<<<<<< HEAD:src/Pages/dashboard.jsx
      <Peringkat></Peringkat>
      {/* <div className='pt-20 pb-10 '>
        <div className=' bg-slate-200 rounded-lg w-full h-96  drop-shadow-xl  '>
          <div className='w-52 mx-auto font-extrabold pt-5 pl-8'>Peringkat Teratas</div>
          <div className='grid grid-cols-2 gap-72 flex-auto w-full h-10 pt-4 pl-16 pr-14'>
            <div className=' pl-14 pr-20 text-center font-medium'>GOAL</div>
            <div className=' pl-14 pr-20 text-center font-medium'>MA</div>
          </div>
          <div>
            
              <div className='pl-12 pt-3 '>
                <div className='grid grid-cols-2 gap-x-44 gap-y-3 '>
                {dummy.map((e) => (
                  <div className='overflow-y-auto'>
                  <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">
                    
                    <div className=' col-span-2 '>
                      <img className='w-14 h-14 py-2 pl-3  ' src={profile} alt="" />
                    </div>
                    <div className=' col-span-6 pl-4 pt-3'>
                      <p>{e.nama}</p>
                      <div className='w-52 bg-green-400 h-3 rounded-2xl'></div>
                    </div>
                    <div className='col-span-4 py-2 pl-12 pt-6'>
                      <div className='w-16 bg-green-200 h-6 rounded-lg'>
                        <div className='mx-auto text-center font-serif text-green-600'>{e.presentase}</div>
                      </div>
                    </div>
                  </div>
                  </div>
                  ))}
                    {dummy.map((b) => (
                  <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-lg ">

                    <div className=' col-span-2 '>
                      <img className='w-14 h-14 py-2 pl-3  ' src={profile} alt="" />
                    </div>
                    <div className=' col-span-6 pl-4 pt-3'>
                      <p>{b.nama}</p>
                      <div className='w-52 bg-green-400 h-3 rounded-2xl'></div>
                    </div>
                    <div className='col-span-4 py-2 pl-12 pt-6'>
                      <div className='w-16 bg-green-200 h-6 rounded-lg'>
                        <div className='mx-auto text-center font-serif text-green-600'>{b.presentase}</div>
                      </div>
                    </div>
                  </div>
                   ))}
                </div>/


              </div>
           
          </div>

        </div>
      </div>/ */}
=======
              <Peringkat></Peringkat>
              <Todolist></Todolist>
              
>>>>>>> 92191f873c1d10f75800d2dcbcee7819e3610733:src/Pages/dashboard/dashboard.jsx
    </div>
  );
};

export default Dashboard;
