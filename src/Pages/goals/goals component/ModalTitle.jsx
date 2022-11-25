import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

export default function ModalTitle(params) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button className="relative" onClick={toggleModal}>
        Task
      </button>

      {modal && (
        <div className="z-20 absolute bg-white rounded-lg py-5 px-5 flex">
          <button
            className="font-medium hover:bg-gray-400 py-1 px-2 rounded-sm items-end"
            onClick={toggleModal}
          >
            <CgClose size={15} />
          </button>
          <div className="px-5">
            <h1 className="font-medium">Task</h1>
            <p className="font-thin">It will show you about your Task name</p>
          </div>
        </div>
      )}
    </>
  );
}
