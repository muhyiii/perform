import React, { PureComponent } from "react";
// import profile from '../Images/profile.png'
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
import ChangingProgressProvider from "../../Component/Support/ChangingProggresProvider";
import Peringkat from "./peringkat"
import Todolist from "./Todolist";
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
    <div className="p-10  h-full w-auto">
      <div>
        <h1 className="text-5xl font-bold pb-4">Dashboard</h1>
      </div>
      <div className="_periode flex justify-start pb-5">
        <div className="font-serif ">Periode :</div>

        <div className="font-serif text-blue-500 bg-blue-50 ">oktober 2022</div>
        {/* <Calendar>
        onClose={() => {
          setCalendar(false);
        }}
        calendar={calendar}
        setCalendar={setCalendar}
        </Calendar> */}
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
      <Peringkat></Peringkat>
      <Todolist></Todolist>
     
    </div>
  );
};



export default Dashboard;
