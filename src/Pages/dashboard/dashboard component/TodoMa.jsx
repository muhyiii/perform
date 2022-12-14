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
    <div className="pl-2 pt-6 pr-2">
    <div className="font-medium w-16 h-7 bg-slate-700 rounded-lg pb-4">
      <h2 className="text-center text-white">Ma</h2>
    </div>
 
    <div className="overflow-x-auto scrollbar-hide h-[343px] rounded-lg mt-4">
      <div className="pt-1">
 
          {maData.map((pd) => {
            let formdate = new Date(pd.fromDate).toLocaleDateString();
            let todate = new Date(pd.toDate).toLocaleDateString();
 
            return (
              <React.Fragment key={pd.id}>
                <div className="overflow-y-auto pb-2 pt-2"
                onClick={() => { navigate(`/acc/goals/${pd.goalId}`) }}>
                 <div className="grid-cols-8 w-full h-[90px] flex bg-white rounded-xl  ">
                    <div className="col-span-1  ">
                      <div>
                        <img
                          className="w-16 pl-3 pt-[13px]  "
                          src={Perkerjaan}
                          alt=""
                        />
                      </div>
                    </div>
 
                    <div className="col-span-6 w-[200px] pl-4 pt-1">
                      <div className="namatugas h-[49px] font-semibold text-sm pt-2 ">
                        <h3>{pd.task}</h3>
                      </div>
                      <div className="pt-1 flex  ">
                        <div className="w-20 h-5 flex bg-slate-400  rounded-xl">
                          <p className="text-white text-center mx-auto text-sm ">
                            {pd.status}
                          </p>
                        </div>
                      </div>
                    </div>
 
                    <div className="flex col-span-1 ">
                      <div className=" pt-14 mx-auto flex">
                        <img
                          src={calendar}
                          alt=""
                          className="mx-auto w-5 h-5 flex "
                        />
                        <div className=" text-xs">{formdate}</div>
                        <div className=" w-3 text-center pb-2 ">-</div>
                        <div className=" text-xs">{todate}</div>
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
 
export default TodoMa;  
 
 

