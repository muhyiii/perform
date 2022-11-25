import React, { Component } from "react";
// import axios from 'axios'
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import profile from "../../Images/profile.png";
import { functionGetGoals } from "../../redux/actions/goalsAction";

export default class peringkat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData  ()  {


    const data = [
      {
        nama: "Fudail Ramadhani",
        presentase: 100,
      },
      {
        nama: "Fudail Ramadhani",
        presentase: 90,
      },
      {
        nama: "Fudail Ramadhani",
        presentase: 250,
      },
      {
        nama: "Fudail Ramadhani",
        presentase: 20,
      },
      {
        nama: "Fudail Ramadhani",
        presentase: 40,
      },
      {
        nama: "Fudail Ramadhani",
        presentase: 200,
      },
    ];
    let goal = [
      {
        Nama: "budi",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "eko",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "agus",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "cipung",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "gala",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
      {
        Nama: "bambang",
        TugasMa: [
          {
            Ma: "mengerjakan backlink",
            Status: true,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
          {
            Ma: "mengerjakan backlink",
            Status: false,
            tanggal: 15,
            bulan: 1,
            tahun: 2022,
          },
        ],
      },
    ];
    const ascData = data.sort((a, b) => (a.presentase < b.presentase ? 1 : -1));
    const slice = ascData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((pd) => (
      <React.Fragment>
        <div className="overflow-y-auto pt-2">
          <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">
            <div className=" col-span-2 ">
              <img className="w-14 h-14 py-2 pl-3  " src={profile} alt="" />
            </div>
            <div className=" col-span-6 pl-4 pt-3">
              <p>{pd.nama}</p>
              <div className="w-52 bg-green-400 h-3 rounded-2xl"></div>
            </div>
            <div className="col-span-4 py-2 pl-12 pt-6">
              <div className="w-16 bg-green-200 h-6 rounded-lg">
                <div className="mx-auto text-center font-serif text-green-600">
                  {pd.presentase}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
    for (let i = 0; i < goal.length; i++) {
      for (let j = i + 1; j < goal.length; j++) {
        let doneTask1 = goal[i].TugasMa.filter(function (item) {
          return item.Status;
        }).length;
        let allTask1 = goal[i].TugasMa.length;
        let persentase1 = (doneTask1 / allTask1) * 100;
        let doneTask2 = goal[j].TugasMa.filter(function (item) {
          return item.Status;
        }).length;
        let allTask2 = goal[j].TugasMa.length;
        let persentase2 = (doneTask2 / allTask2) * 100;
        if (persentase1 < persentase2) {
          let temp;
          temp = goal[i];
          goal[i] = goal[j];
          goal[j] = temp;
        }
      }
    }
    const slice1 = goal.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postgoal = slice1.map((x) => {
      let doneTask = x.TugasMa.filter(function (item) {
        return item.Status;
      }).length;
      let allTask = x.TugasMa.length;
      let persentase = (doneTask / allTask) * 100;
      return (
        <React.Fragment>
          <div className="overflow-y-auto pt-2">
            <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">
              <div className=" col-span-2 ">
                <img className="w-14 h-14 py-2 pl-3  " src={profile} alt="" />
              </div>
              <div className=" col-span-6 pl-4 pt-3">
                <p>{x.Nama}</p>
                <div className="w-52 bg-green-400 h-3 rounded-2xl"></div>
              </div>
              <div className="col-span-4 py-2 pl-12 pt-6">
                <div className="w-16 bg-green-200 h-6 rounded-lg">
                  <div className="mx-auto text-center font-serif text-green-600">
                    {persentase}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      postData,
      postgoal,
    });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };
  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <div>
        <div className="pt-20 pb-10 ">
          <div className=" bg-slate-200 rounded-lg w-full h-96  drop-shadow-xl  ">
            <div className="w-96 mx-auto font-extrabold text-2xl pt-3 pl-20">
              Peringkat Teratas
            </div>
            <div className="grid grid-cols-2 gap-72 flex-auto w-full h-10 pt-1 pl-16 pr-14">
              <div className=" pl-24 pr-20 text-center font-medium">GOAL</div>
              <div className=" pl-14 pr-20 text-center font-medium">MA</div>
            </div>
            <div>
              <div className="pl-14 ">
                <div className="grid grid-cols-2   gap-x-44 gap-y-3  ">
                  <div>{this.state.postData}</div>
                  <div>{this.state.postgoal}</div>
                  <ReactPaginate
                    className=""
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
