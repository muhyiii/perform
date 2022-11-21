import React from "react";
import Swal from "sweetalert2";
import { IoTrashOutline, IoArchiveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../Functions/axiosClient";


const ModalOption = (props) => {
  const navigate = useNavigate();
  const deleteGoal = async (id) => {
    const response = await axios.delete(api + `/data/goals/${id}/delete`);
    if (response.status === 200) {
      Swal.fire("Succesfull!", response.data.messege, "success");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
    if (response.statusText !== "OK")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.messege,
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
                  props.setArchive(props.id);
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

export default ModalOption;
