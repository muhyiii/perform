import React, { useState, useEffect,  } from "react";
import profile from "../../../Images/profile.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { FUNCTION_GET_STATIC_ALL_USERS } from "../../../Redux/Actions/AUTH_ACTION";


// import { data } from 'autoprefixer';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "40px",
        height: "40px",
        fontSize:"30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        color: "#fff",
        // background: "#495579",
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
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        color: "#fff",
      }}
      onClick={onClick}
    />
  );
}

const Peringkat = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [Ma, setMa] = useState([]);
  const [Goal, setGoal] = useState([]);
  const perPage = 4;
  const [pageCount, setPageCount] = useState(0);
  const [deletedList] = useState([]);
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const getDataa = async () => {
    const response = await dispatch(FUNCTION_GET_STATIC_ALL_USERS());
    if (response.status === "Success") {
      setUsers(response.data.rows);
      console.log(response.data.rows);
    }
  };
  useEffect(() => {
    getDataa();
  }, []);

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
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "eko",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "joe",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "cipung",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "joinior",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "bambang",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "bintang",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "solana",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "elon",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "gueyi",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "josep",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "supriyadi",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "gala",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
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
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "eko",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "agus",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "cipung",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "Maychel",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "bambang",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "dani",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "junaidi",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "dzul",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "gala",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "ikhsan",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "yogi",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "asep",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },

          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
    ];

    for (let i = 0; i < Ma.length; i++) {
      for (let j = i + 1; j < Ma.length; j++) {
        // mendapatkan jumlah tugas yang sudah selesai pada indeks yg sekarang
        let doneTask1 = Ma[i].TugasMa.filter(function (item) {
          return item.Status;
        }).length;
        // mendapatkan total jumlah tugas yang sudah pada indeks yg sekarang
        let allTask1 = Ma[i].TugasMa.length;
        // mendapatkan persenan berapa tugas yang sudah selesai pada indeks yg sekarang
        let persentase1 = (doneTask1 / allTask1) * 100;
        // mendapatkan jumlah tugas yang sudah selesai pada indeks yg setelahnya
        let doneTask2 = Ma[j].TugasMa.filter(function (item) {
          return item.Status;
        }).length;
        // mendapatkan total jumlah tugas yang sudah pada indeks yg setelahnya
        let allTask2 = Ma[j].TugasMa.length;
        // mendapatkan persenan berapa tugas yang sudah selesai pada indeks yg setelahnya
        let persentase2 = (doneTask2 / allTask2) * 100;
        // menukar indeks persenan tugas pada indeks yg sekarang dengan indeks yg setelahnya, jika persenan tugas pada indeks yg sekarang lebih kecil dari indeks yg setelahnya
        if (persentase1 < persentase2) {
          let temp;
          temp = Ma[i];
          Ma[i] = Ma[j];
          Ma[j] = temp;
        }
      }
    }

    const slice = Ma.slice(0, 5);
    const postData = slice.map((x) => {
      let doneTask = x.TugasMa.filter(function (item) {
        return item.Status;
      }).length;
      let allTask = x.TugasMa.length;
      let persentase = (doneTask / allTask) * 100;
      return (
        <React.Fragment>
          <div className="overflow-y-auto pt-4">
            <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl   ">
              <div className=" col-span-2 ">
                <img className="w-14 h-14 py-2 pl-3  " src={profile} alt="" />
              </div>
              <div className=" col-span-6 pl-4 pt-3">
                <p>{x.Nama}</p>
                <div className="w-52 bg-blue-300 h-3 rounded-2xl"></div>
              </div>
              <div className="col-span-4 py-2 pl-12 pt-6">
                <div className="w-16 bg-blue-200 h-6 rounded-lg">
                  <div className="mx-auto text-center font-serif text-black">
                    {persentase}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });

    for (let i = 0; i < Goal.length; i++) {
      for (let j = i + 1; j < Goal.length; j++) {
        // mendapatkan jumlah ma yang sudah selesai pada indeks yg sekarang
        let doneTask1 = Goal[i].TugasMa.filter(function (item) {
          return item.Status;
        }).length;
        // mendapatkan total jumlah ma yang sudah pada indeks yg sekarang
        let allTask1 = Goal[i].TugasMa.length;
        // mendapatkan persenan berapa ma yang sudah selesai pada indeks yg sekarang
        let persentase1 = (doneTask1 / allTask1) * 100;
        // mendapatkan jumlah ma yang sudah selesai pada indeks yg setelahnya
        let doneTask2 = Goal[j].TugasMa.filter(function (item) {
          return item.Status;
        }).length;
        // mendapatkan total jumlah ma yang sudah pada indeks yg setelahnya
        let allTask2 = Goal[j].TugasMa.length;
        // mendapatkan persenan berapa ma yang sudah selesai pada indeks yg setelahnya
        let persentase2 = (doneTask2 / allTask2) * 100;
        // menukar indeks persenan ma pada indeks yg sekarang dengan indeks yg setelahnya, jika persenan ma pada indeks yg sekarang lebih kecil dari indeks yg setelahnya
        if (persentase1 < persentase2) {
          let temp;
          temp = Goal[i];
          Goal[i] = Goal[j];
          Goal[j] = temp;
        }
      }
    }

    const slice1 = Goal.slice(0, 5);
    const postData1 = slice1.map((x) => {
      let doneTask = x.TugasMa.filter(function (item) {
        return item.Status;
      }).length;
      let allTask = x.TugasMa.length;
      let persentase = (doneTask / allTask) * 100;
      return (
        <React.Fragment>
          <div className="overflow-y-auto pt-4">
            <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl   ">
              <div className=" col-span-2 ">
                <img className="w-14 h-14 py-2 pl-3  " src={profile} alt="" />
              </div>
              <div className=" col-span-6 pl-4 pt-3">
                <p>{x.Nama}</p>
                <div className="w-52 bg-blue-300 h-3 rounded-2xl"></div>
              </div>
              <div className="col-span-4 py-2 pl-12 pt-6">
                <div className="w-16 bg-blue-200 h-6 rounded-lg">
                  <div className="mx-auto text-center font-serif text-black">
                    {persentase}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
    setMa(postData);
    setGoal(postData1);
    setPageCount(Math.ceil(Ma, Goal.length / perPage));
  };
  useEffect(() => {
    getData();
  }, {});

  return (
    <div className="pl-12">
      <Slider {...settings}>
        <div className="pt-6 pl-3">
          <div className="font-medium w-16 h-7 bg-slate-700 rounded-lg ">
            <h2 className="text-center text-white">Ma</h2>
          </div>
          <div>{Ma}</div>
        </div>

        <div className="pt-6 pl-3">
          <div className="font-medium w-16 h-7 bg-slate-700 rounded-lg ">
            <h2 className="text-center text-white">Goal</h2>
          </div>
          <div>{Goal}</div>
        </div>
      </Slider>
    </div>
  );
};

export default Peringkat;
