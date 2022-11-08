import React from "react";
import { CgClose } from "react-icons/cg";

const AddGoals = (props) => {
  let [data, setData] = React.useState({
    id: 0,
    nama: "",
    role: "",
    asign: "",
    status: "to-do",
    task: "",
    rate: 0,
  });


  let dummyUser = [
    {
      nama: "Ahmad Indra",
      role: "Sekretaris",
    },
    {
      nama: "Ahmad Udin",
      role: "Anggota",
    },
  ];
  React.useEffect(() => {
    let dataDummy = localStorage.getItem("dummyData");
    let datas = [];
    if (dataDummy === null) {
      localStorage.setItem("dummyData", JSON.stringify(datas));
    }
  }, []);
  ///////////////////////
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
        <div className="w-2/6 h-4/5 bg-white rounded-lg shadow-lg relative overflow-hidden ">
          <div
            className="top-3 right-3 absolute cursor-pointer"
            onClick={props.onClose}
          >
            <CgClose size={30} />
          </div>
          <div className="pt-6 text-2xl font-semibold text-center">
            <h1>Add Goals</h1>
          </div>
          <div className="px-5 mt-5 space-y-2 relative">
            <select
              className="border rounded-md w-full py-2 outline-none px-2 "
              name=""
              id=""
              onChange={(e) => {
                let a = e.target.value;
                setData({
                  ...data,
                  id: data.id + 1,
                  nama: a.split("|")[0],
                  role: a.split("|")[1],
                });
              }}
            >
              <option value="">Select User</option>
              {dummyUser.map((e) => (
                <option value={`${e.nama}|${e.role}`} key={e.nama}>
                  {e.nama }
                </option>
              ))}
            </select>
            <textarea
              type="text"
              className="border rounded-md w-full py-2 outline-none px-2 "
              placeholder="Task"
              onChange={(e) => {
                setData({
                  ...data,
                  task: e.target.value,
                });
              }}
            />
            <input
              className="border rounded-md w-full py-2 outline-none px-2 "
              type="date"
              name=""
              id=""
              onChange={(e) => {
                setData({
                  ...data,
                  asign: e.target.value,
                });
              }}
            />
            <button
              className="border rounded-md w-full py-2 outline-none px-2"
              onClick={() => {
                let dummy = JSON.parse(localStorage.getItem("dummyData"));
                console.log(dummy);
                dummy.push(data);
                console.log(data);
                localStorage.setItem("dummyData", JSON.stringify(dummy));
                props.onClose();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGoals;
