import Perkerjaan from "../../../Images/iconpekerjaan.png";
import calendar from "../../../Images/calendar.png";
import Delete from "../../../Images/delete.png";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { functionGetGoalsByUserNow } from "../../../redux/actions/goalsAction";
import { useNavigate } from "react-router-dom";

const TodoGoal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goalData, setGoalData] = React.useState([]);
  const getData = async () => {
    const decoded = jwtDecode(localStorage.getItem("token"));
    const response = await dispatch(functionGetGoalsByUserNow(decoded.id));
    if (response.status === "Success") {
      setGoalData(response.data.rows);
      console.log(response.data.rows);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-5 font-medium   pb-1">Goal</div>

      <div className="  scrollbar-hide">
        <div className=" pt-1 ">
          {goalData.map((pd) => {
            let formdate = new Date(pd.fromDate).toLocaleDateString();
            let todate = new Date(pd.toDate).toLocaleDateString();

            return (
              <React.Fragment key={pd.id}>
                <div
                  className="overflow-y-auto  px-5 pb-2"
                  onClick={() => {
                    navigate(`/acc/goals/${pd.goalId}`);
                  }}
                >
                  <div className="grid-cols-8 w-full flex bg-white rounded-xl mx-auto ">
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
                        <img
                          src={calendar}
                          alt=""
                          className="mx-auto w-5 h-5 flex "
                        />
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
        {/* </button> */}
      </div>
    </div>
  );
};

export default TodoGoal;
