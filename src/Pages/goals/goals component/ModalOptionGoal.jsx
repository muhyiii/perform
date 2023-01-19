import React from "react";
import Swal from "sweetalert2";
import { IoTrashOutline, IoArchiveOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  functionDeleteGoal,
  functionUpdateGoal,
} from "../../../Redux/Actions/GOALS_ACTION";
import { HiPencil } from "react-icons/hi";

const ModalOptionGoal = (props) => {
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
  if (!props.isOption) {
    return null;
  }
  return (
    <div
      data-cy="modal-add"
      variant="primary"
      className=" modal absolute h-full w-full left-0 top-0 z-50  "
      onClick={props.onCloseOption}
    >
      <div className="relative w-full ">
        <nav className="bg-white absolute right-14 -top-5  shadow-lg rounded-md border-red-400 p-5 font-semibold">
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
                    updateGoal(props.goalId, null, true);
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
            <hr />
            <li
              className="flex items-center justify-between hover:text-xl  cursor-pointer"
              onClick={() => {
                if (props.status === "to-do" || props.status === "ongoing") {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You can only update to the next stage",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await Swal.fire({
                        title: "Select value of status update",
                        input: "select",
                        inputOptions:
                          props.status !== "ongoing"
                            ? {
                                ongoing: "Ongoing",
                                hold: "Hold",
                                done: "Done",
                              }
                            : {
                                hold: "Hold",
                                done: "Done",
                              },
                        inputPlaceholder: "Select a status",
                        showCancelButton: true,
                        inputValidator: (value) => {
                          return new Promise((resolve) => {
                            if (value !== props.status) {
                              updateGoal(props.goalId, value, false);
                            } else {
                              resolve("You can only update to next stage");
                            }
                          });
                        },
                      }).then((e) => {});
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You cannot update to stage before!",
                  });
                }
              }}
            >
              Update
              <span className="ml-3">
                <HiPencil />
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ModalOptionGoal;
