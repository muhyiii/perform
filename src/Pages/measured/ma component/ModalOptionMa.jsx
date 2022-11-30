import React from "react";
import Swal from "sweetalert2";
import { IoTrashOutline, IoArchiveOutline } from "react-icons/io5";
import { TbArrowsUpDown } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  functionDeleteMeasuredActivity,
  functionUpdateMeasuredActivity,
} from "../../../redux/actions/maAction";

const ModalOptionMa = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteMa = async (id) => {
    const response = await dispatch(functionDeleteMeasuredActivity(id));
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });

      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
    if (response.status !== "Success")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
        timer: 3000,
      });
  };
  const updateStatus = async (id, status, archive) => {
    console.log(id, status);
    const response = await dispatch(
      functionUpdateMeasuredActivity(id, status, archive)
    );
    console.log(response);
    if (response.status === "Success") {
      Swal.fire({
        title: "Succesfull!",
        text: response.messege,
        icon: "success",
        timer: 1000,
      });
      setTimeout(() => {
        navigate(0);
      }, 500);
    }
    if (response.status !== "Success") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.messege,
      });
    }
  };
  if (!props.isOption) {
    return null;
  }
  return (
    <div
      data-cy="modal-add"
      variant="primary"
      className=" modal absolute z-30 -top-6 right-36 "
      onClick={props.onCloseOption}
    >
      <nav className="bg-white text-black w-full shadow-lg rounded-md border-red-400 p-5 font-semibold">
        <ul className="space-y-2">
          <li
            className="flex items-center justify-between hover:text-xl  cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You want to archive this measure activity!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, archive it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  updateStatus(props.maId, props.data.status, true);
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
                  deleteMa(props.maId);
                }
              });
            }}
          >
            Delete{" "}
            <span className="ml-3">
              <IoTrashOutline />
            </span>
          </li>{" "}
          <hr />
          <li
            className="flex items-center justify-between hover:text-xl  cursor-pointer"
            onClick={() => {
              if (
                props.data.status === "to-do" ||
                props.data.status === "ongoing"
              ) {
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
                        props.data.status !== "ongoing"
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
                          if (value !== props.data.status) {
                            updateStatus(props.maId, value, false);
                          } else {
                            resolve("You can only update to next stage");
                          }
                        });
                      },
                    });
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
            Update{" "}
            <span className="ml-3">
              <TbArrowsUpDown />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ModalOptionMa;
