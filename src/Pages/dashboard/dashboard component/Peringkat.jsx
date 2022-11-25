import React, { useState, useEffect, Component } from 'react'
import profile from '../../../Images/profile.png';
// import { data } from 'autoprefixer';

const Peringkat = () => {
    const [offset, setOffset] = useState(0);
    const [Ma, setMa] = useState([]);
    const [Goal, setGoal] = useState([]);
    const perPage = 4;
    const [pageCount, setPageCount] = useState(0);
    const [deletedList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const getData = async () => {
        const Ma = [
            {
                Nama: "budi",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                ]
            },
            {
                Nama: "eko",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "joe",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "cipung",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "joinior",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "bambang",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "bintang",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "solana",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "elon",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "gueyi",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "josep",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "supriyadi",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "gala",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
        ];




        const Goal = [
            {
                Nama: "budi",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "eko",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "agus",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "cipung",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                    {
                        Ma: "mengerjakan backlink",
                        Status: false
                        ,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "Maychel",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                   
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "bambang",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                  
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "dani",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                  
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "junaidi",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                  
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "dzul",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                  
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "gala",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                   
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "ikhsan",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                   
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "yogi",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                 
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
            {
                Nama: "asep",
                TugasMa: [
                    {
                        Ma: "mengerjakan backlink",
                        Status: false,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    },
                  
                    {
                        Ma: "mengerjakan backlink",
                        Status: true,
                        tanggal: 15,
                        bulan: 1,
                        tahun: 2022
                    }
                ]
            },
        ];

        for (let i = 0; i < Ma.length; i++) {
            for (let j = i + 1; j < Ma.length; j++) {
                let doneTask1 = (Ma[i].TugasMa).filter(function (item) {
                    return item.Status;
                }).length;
                let allTask1 = (Ma[i].TugasMa).length;
                let persentase1 = (doneTask1 / allTask1) * 100;
                let doneTask2 = (Ma[j].TugasMa).filter(function (item) {
                    return item.Status;
                }).length;
                let allTask2 = (Ma[j].TugasMa).length;
                let persentase2 = (doneTask2 / allTask2) * 100;
                if (persentase1 < persentase2) {
                    let temp;
                    temp = Ma[i];
                    Ma[i] = Ma[j];
                    Ma[j] = temp;
                }
            }
        }
        const slice = Ma.slice(0, 7)
        const postData = slice.map(x => {
            let doneTask = (x.TugasMa).filter(function (item) {
                return item.Status;
            }).length;
            let allTask = (x.TugasMa).length;
            let persentase = (doneTask / allTask) * 100;
            return (
                <React.Fragment>
                    <div className='overflow-y-auto pt-4'>
                        <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">
                            <div className=' col-span-2 '>
                                <img className='w-14 h-14 py-2 pl-3  ' src={profile} alt="" />
                            </div>
                            <div className=' col-span-6 pl-4 pt-3'>
                                <p>{x.Nama}</p>
                                <div className='w-52 bg-green-400 h-3 rounded-2xl'></div>
                            </div>
                            <div className='col-span-4 py-2 pl-12 pt-6'>
                                <div className='w-16 bg-green-200 h-6 rounded-lg'>
                                    <div className='mx-auto text-center font-serif text-green-600'>{persentase}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment >
            )
        })





        for (let i = 0; i < Goal.length; i++) {
            for (let j = i + 1; j < Goal.length; j++) {
                let doneTask1 = (Goal[i].TugasMa).filter(function (item) {
                    return item.Status;
                }).length;
                let allTask1 = (Goal[i].TugasMa).length;
                let persentase1 = (doneTask1 / allTask1) * 100;
                let doneTask2 = (Goal[j].TugasMa).filter(function (item) {
                    return item.Status;
                }).length;
                let allTask2 = (Goal[j].TugasMa).length;
                let persentase2 = (doneTask2 / allTask2) * 100;
                if (persentase1 < persentase2) {
                    let temp;
                    temp = Goal[i];
                    Goal[i] = Goal[j];
                    Goal[j] = temp;
                }
            }
        }
        const slice1 = Goal.slice(0, 7)
        const postData1 = slice1.map(x => {
            let doneTask = (x.TugasMa).filter(function (item) {
                return item.Status;
            }).length;
            let allTask = (x.TugasMa).length;
            let persentase = (doneTask / allTask) * 100;
            return (
                <React.Fragment>
                    <div className='overflow-y-auto pt-4'>
                        <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">
                            <div className=' col-span-2 '>
                                <img className='w-14 h-14 py-2 pl-3  ' src={profile} alt="" />
                            </div>
                            <div className=' col-span-6 pl-4 pt-3'>
                                <p>{x.Nama}</p>
                                <div className='w-52 bg-green-400 h-3 rounded-2xl'></div>
                            </div>
                            <div className='col-span-4 py-2 pl-12 pt-6'>
                                <div className='w-16 bg-green-200 h-6 rounded-lg'>
                                    <div className='mx-auto text-center font-serif text-green-600'>{persentase}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment >
            )
        })
        setMa(postData)
        setGoal(postData1)
        setPageCount(Math.ceil(Ma, Goal.length / perPage))
    }
    // const handlePageClick = (e) => {
    //     const selectedPage = e.selected;
    //     setOffset(selectedPage * perPage)
    // }
    useEffect(() => {
        getData()
    })
    return (
        <div>
            <div className='pt-20 pb-10 '>
                <div className=' bg-slate-200 rounded-lg w-full h-full  drop-shadow-xl  '>
                    <div className='w-96 mx-auto font-extrabold text-2xl pt-3 pl-20'>Peringkat Teratas</div>
                    <div className='grid grid-cols-2 gap-72 flex-auto w-full h-10 pt-1 pl-16 pr-14'>
                        <div className=' pl-24 pr-20 text-center font-medium'>GOAL</div>
                        <div className=' pl-14 pr-20 text-center font-medium'>MA</div>
                    </div>
                    <div>
                        <div className='pl-14 '>
                            <div className='grid grid-cols-2   gap-x-44 gap-y-3 pb-10  '>
                                <div>{Ma}</div>
                                <div>{Goal}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Peringkat;
