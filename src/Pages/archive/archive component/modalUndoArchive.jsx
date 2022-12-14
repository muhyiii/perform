import React from "react";
import { BiUndo } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { functionUpdateGoal } from "../../../redux/actions/goalsAction";

const ModalUndoArchive = (props) => {
  const dispatch = useDispatch();
  const updateGoal = async (id, status, archive) => {
    const response = await dispatch(functionUpdateGoal(id, status, archive));
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });

      setTimeout(() => {
        props.getData();
      }, 500);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
        timer: 3000,
      });
  };
  return (
    <div className="h-full w-full flex">
     
    </div>
  );
};

export default ModalUndoArchive;
