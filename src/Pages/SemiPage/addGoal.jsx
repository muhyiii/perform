import React from "react";

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
        <div className="w-1/5 h-2/3 bg-white">
            <div>
                asdasda
            </div>
            <button 
            onClick={props.onClose}
            >ada</button>
        </div>
      </div>
    </div>
  );
};

export default AddGoals;
