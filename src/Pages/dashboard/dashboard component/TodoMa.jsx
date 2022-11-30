import Perkerjaan from "../../../Images/iconpekerjaan.png";
import calendar from "../../../Images/calendar.png";
import Delete from "../../../Images/delete.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  functionGetMeasuredActivities,
  functionGetMeasuredActivityByUserNow,
} from "../../../redux/actions/maAction";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const TodoMa = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maData, setMaData] = React.useState([]);
  const getData = async () => {
    const decoded = jwtDecode(localStorage.getItem("token"));
    const response = await dispatch(
      functionGetMeasuredActivityByUserNow(decoded.id)
    );
    if (response.status === "Success") {
      setMaData(response.data.rows);
      console.log(response.data.rows);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="capitalize">
      <div className="text-center mx-auto font-semibold text-2xl pt-7  pb-3">
        Ma
      </div>
      <div className="h-[420px] overflow-x-auto scrollbar-hide">
        <div className=" pt-1 ">
          <div className="grid grid-cols-1 gap-x-44 gap-y-4 pb-28  ">
            {maData.map((pd) => {
              let formdate = new Date(pd.fromDate).toLocaleDateString();
              let todate = new Date(pd.toDate).toLocaleDateString();

              return (
                <React.Fragment key={pd.id}>
                  <div
                    className="overflow-y-auto pt-3"
                    onClick={() => {
                      navigate(`/acc/ma/${pd.maId}`);
                    }}
                  >
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

                      <div className="col-span-4 w-96 ">
                        <div className="namatugas font-medium text-base pl-6 pt-2 ">
                          <h3>{pd.task}</h3>
                        </div>
                        <div className=" pl-6 pt-2 flex">
                          <div className="w-20 h-5 flex bg-slate-400  rounded-xl">
                            <p className="text-white text-center mx-auto text-sm ">
                              {pd.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex col-span-1 pl-4">
                        <div className="pl-72 pt-8 mx-auto flex">
                          <img
                            src={calendar}
                            alt=""
                            className="mx-auto w-5 h-5 flex "
                          />
                          <div className="pl-2">{formdate}</div>
                          <div className="pl-2 pr-2 font-bold">-</div>
                          <div className="pl-1">{todate}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoMa;
