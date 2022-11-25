import Perkerjaan from '../../../Images/iconpekerjaan.png'
import calendar from '../../../Images/calendar.png'
import Delete from '../../../Images/delete.png'
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const TodoGoal = () => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const perPage = 4;
  const [pageCount, setPageCount] = useState(0);
  const [deletedList] = useState([]);

  const getData = async () => {
    //   const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
    const res = [
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 1",
        created: "05-11-04",
        id: 1,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 2",
        created: "05-11-04",
        id: 2,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 3",
        created: "05-11-04",
        id: 3,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 4",
        created: "05-11-04",
        id: 4,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 5",
        created: "05-11-04",
        id: 5,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 6",
        created: "05-11-04",
        id: 6,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 7",
        created: "05-11-04",
        id: 7,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 8",
        created: "05-11-04",
        id: 8,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 9",
        created: "05-11-04",
        id: 9,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 10",
        created: "05-11-04",
        id: 10,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 11",
        created: "05-11-04",
        id: 11,
      },
      {
        nama: "Migration Alibaba - AWS:Implementasi AWS DMS integrasi 12",
        created: "05-11-04",
        id: 12,
      },
    ];

    console.log(deletedList);
    const deleteList = (id) => {
      deletedList.push(id);
      getData();
    };
    const response = res.filter((item) => !deletedList.includes(item.id));
    const slice = response.slice(offset, offset + perPage);
    const postData = slice.map((pd) => (
      <React.Fragment>
        <div className="overflow-y-auto pt-3">
          <div className="grid-cols-6 w-11/12 h-20 flex bg-white rounded-xl drop-shadow-xl pr-10 mx-auto">
            <div className="col-span-1">
              <div>
                <img
                  className="w-20 h-20 py-2 pl-3 pt-2  "
                  src={Perkerjaan}
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-4 ">
              <div className="namatugas font-medium text-base pl-6 pt-2 ">
                <h3>{pd.nama}</h3>
              </div>
              <div className=" pl-6 pt-2 flex">
                <div className="w-20 h-5 flex bg-slate-400  rounded-xl">
                  <p className="text-white text-center mx-auto text-sm ">
                    To Do
                  </p>
                </div>
              </div>
            </div>
            <div className="flex col-span-1">
              <div className="pl-36 pt-8 mx-auto flex">
                <img src={calendar} alt="" className="mx-auto w-5 h-5 flex " />
                <div className="pl-2">created</div>
                <div className="pl-1">{pd.created}</div>
              </div>
              <div className="w-8 h-20 pl-2">
                <button
                  className="pt-7"
                  onClick={() => {
                    deleteList(pd.id);
                  }}
                >
                  <img src={Delete} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));

    setData(postData);
    setPageCount(Math.ceil(res.length / perPage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div>
      <div className="w-52 mx-auto font-semibold text-2xl pt-7 pl-20 pb-3">
        Goal
      </div>

      <div>
        <div className=" pt-1 ">
          <div className="grid grid-cols-1 gap-x-44 gap-y-4 pb-28  ">
            {data}
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoGoal;
