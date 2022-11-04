import React from "react";
import { CgClose } from "react-icons/cg";

const AddGoals = (props) => {
  if (!props.addGoals) {
    return null;
  }
  return (
    <div>
      <div
        data-cy="modal-add"
        variant="primary"
        className=" bg-black bg-opacity-50 z-20 modal absolute inset-0 flex justify-center items-center overflow-y-hidden h-full"
      >
        <div className="w-2/6 h-4/5 bg-white rounded-lg shadow-lg relative ">
          <div
            className="top-3 right-3 absolute cursor-pointer"
            onClick={props.onClose}
          >
            <CgClose size={30} />
          </div>
          <div className="pt-6 text-2xl font-semibold text-center">
            <h1>Add Goals</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGoals;
