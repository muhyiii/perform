import React, { PureComponent } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import profile from '.././Images/profile.png';
const data = [
  {
    name: 'Page A',
    Goal: 4000,
    Ma: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    Goal: 3000,
    Ma: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    Goal: 2000,
    Ma: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    Goal: 2780,
    Ma: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    Goal: 1890,
    Ma: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    Goal: 2390,
    Ma: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    Goal: 3490,
    Ma: 4300,
    amt: 2100,
  },
];
const percentage = 66;



const Dashboard = () => {

  let dummy = [
    {
      nama: "Fudail Ramadhani",
      presentase: "150%"
    },
    {
      nama: "Fudail Ramadhani",
      presentase: "150%"
    },
    {
      nama: "Fudail Ramadhani",
      presentase: "150%"
    },
    {
      nama: "Fudail Ramadhani",
      presentase: "150%"
    },
    

  ];

  const [row, setrow] = React.useState(true);
  return (
    <div className='pl-10 pr-5 pt-10 h-full w-auto'>
      <div className='_periode flex justify-start pb-5'>
        <div className='font-serif '>
          Periode :
        </div>

        <div className='font-serif text-blue-500 bg-blue-50 '>
          oktober 2022
        </div>
      </div>

      <div class="grid grid-cols-2 w-auto  flex-auto h-96  ">
        <div className='bg-slate-200 rounded-lg w-5/6 drop-shadow-xl  '>


          <div className='container mx-auto    w-80 '>
            <div className='container text-center mx-auto font-semibold p-5 pb-5 pl-5'>
              <h3>Progress Perusahaan</h3>
            </div>

            <div className=" container mx-auto" style={{ width: 150, height: 150 }}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  root: {},
                  path: {
                    stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  trail: {
                    stroke: '#d6d6d6',
                    strokeLinecap: 'butt',
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  text: {
                    fill: '#f88',
                    fontSize: '16px',
                  },
                  background: {
                    fill: '#3e98c7',
                  },
                }}
              />
            </div>
            <div className='container mx-auto'>
              <div className='_periode  flex w-full  '>

                <div className='text-center pl-5' >Anda telah mencapai</div>
                <div className='pl-2 text center'>66%</div>
                <div className='text-center'>dari</div>

              </div>
              <div className='container mx-auto'>keseluruhan goal anda</div>
            </div>
            <div className='container mx-auto grid grid-cols-2 gap-14 flex-auto w-60 h-7 pt-4'>
              <div className='bg-slate-200 border-2 border-gray-400 rounded-2xl'>
                <div className='text-md  text-red-600'>74.72%</div>
              </div>
              <div className='bg-slate-200 border-2 border-gray-400 rounded-2xl'>
                <div className='text-md  text-red-600'>60.96%</div>
              </div>
            </div>
            <div className='container mx-auto grid grid-cols-2 gap-14 flex-auto w-60 h-7 pt-4'>
              <div className='text-sm'>
                Rata-rata goal
              </div>
              <div className='text-sm'>
                Rata-rata goal
              </div>
            </div>

          </div>

        </div>

        <div className=' bg-slate-200 rounded-lg drop-shadow-xl  '>
          <div className='font-semibold p-5 pl-5'>
            <h3>Pencapaian Divisi</h3>
          </div>
          <div className='mx-auto'>
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

      <div className='pt-20 pb-10 '>
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
                </div>


              </div>
           
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
{/* <div className='bg-green-500'></div>
<div className='bg-red-500'></div>
<div className='bg-blue-500'></div>
<div className='bg-yellow-500'></div>
<div className='bg-purple-500'></div>
<div className='bg-orange-500'></div>
<div className='bg-white'></div>
<div className='bg-black'></div>
<div className='bg-gray-400'></div>
<div className='bg-yellow-500'></div>
<div className='bg-green-500'></div>
<div className='bg-red-500'></div> */}