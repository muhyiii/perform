import React from "react";
import Swal from "sweetalert2";
import { IoTrashOutline } from "react-icons/io5";

const ModalOption = (props) => {
  if (!props.isOption) {
    return null;
  }
  return (
    <div
      data-cy="modal-add"
      variant="primary"
      className=" modal absolute  h-screen -top-10 right-7"
      onClick={props.onCloseOption}
    >
      <nav className="bg-white w-full shadow-lg rounded-md border-red-400 p-5 font-semibold">
        <ul className="space-y-2">
          <li className="flex items-center  cursor-pointer">
            Delete{" "}
            <span className="ml-3">
              <IoTrashOutline />
            </span>
          </li>
          <hr />
          <li
            className="flex items-center  cursor-pointer"
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
                  props.deleteLocStorage(props.id);
                  Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
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
