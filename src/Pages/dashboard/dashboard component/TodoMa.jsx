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
     <div className="text-center mx-auto font-medium text-xl pt-4 pb-1">
        Ma
      </div>

      <div className="h-[420px] overflow-x-auto scrollbar-hide">
        <div className=" pt-1 ">

            {maData.map((pd) => {
              let formdate = new Date(pd.fromDate).toLocaleDateString();
              let todate = new Date(pd.toDate).toLocaleDateString();

              return (
                <React.Fragment key={pd.id}>
                <div className="overflow-y-auto pt-2 px-5 pb-2" onClick={() => { navigate(`/acc/goals/${pd.goalId}`) }}>
                <div className="grid-cols-8 w-full h-16 flex bg-white rounded-xl mx-auto ">
                  <div className="col-span-1  ">
                    <div>
                      <img
                        className="w-14 h-14  pl-3 pt-4  "
                        src={Perkerjaan}
                        alt=""
                      />
                    </div>
                  </div>


                  <div className="col-span-6 w-52  ">
                    <div className="namatugas font-semibold text-sm  pl-6 pt-2 ">
                      <h3>{pd.task}</h3>
                    </div>
                    <div className=" pl-6 pt-2 flex ">
                      <div className="w-20 h-5 flex bg-slate-400  rounded-xl">
                        <p className="text-white text-center mx-auto text-sm ">
                          {pd.status}
                        </p>
                      </div>
                    </div>
                  </div>


                  <div className="flex col-span-1 ">
                    <div className=" pt-8 mx-auto flex pl-5">
                      <img src={calendar} alt="" className="mx-auto w-5 h-5 flex " />
                      <div className=" text-sm">{formdate}</div>
                      <div className=" pr-2 font-bold">-</div>
                      <div className=" text-sm">{todate}</div>
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

  );
}

export default TodoMa;  