import React from "react";
import Swal from "sweetalert2";
import { IoTrashOutline, IoArchiveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  functionDeleteGoal,
  functionUpdateGoal,
} from "../../../redux/actions/goalsAction";

const ModalOptionGoal = (props) => {
  const navigate = useNavigate();
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
       props.getData()
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

  const deleteGoal = async (id) => {
    const response = await dispatch(functionDeleteGoal(id));
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });

      setTimeout(() => {
       props.getData()
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
  if (!props.isOption) {
    return null;
  }
  return (
    <div
      data-cy="modal-add"
      variant="primary"
      className=" modal absolute   -top-10 right-7 "
      onClick={props.onCloseOption}
    >
      <nav className="bg-white w-full shadow-lg rounded-md border-red-400 p-5 font-semibold">
        <ul className="space-y-2">
          <li
            className="flex items-center justify-between hover:text-xl  cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You want to archive this goals!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, archive it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  updateGoal(props.goalId, props.data.status, true);
                  Swal.fire(
                    "Archived!",
                    "Your file has been Archived.",
                    "success"
                  );
                }
              });
            }}
          >
            Archive{" "}
            <span className="ml-3">
              <IoArchiveOutline />
            </span>
          </li>
          <hr />
          <li
            className="flex items-center justify-between hover:text-xl  cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteGoal(props.goalId);
                }
              });
            }}
          >
            Delete{" "}
            <span className="ml-3">
              <IoTrashOutline />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ModalOptionGoal;
