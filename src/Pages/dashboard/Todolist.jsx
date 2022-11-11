import React, { Component } from 'react'
// import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Perkerjaan from '../../Images/iconpekerjaan.png';
import calendar from '../../Images/calendar.png';


export default class todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {

        const data = [
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            }, {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            },
            {
                "nama": "Migration Alibaba - AWS:Implementasi AWS DMS integrasi Database",
                "created": "05-11-04"
            }
        ];


        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(pd =>
            <React.Fragment>
                <div className='overflow-y-auto'>

                    <div className=" grid-cols-6 w-11/12 h-20 flex bg-white rounded-xl drop-shadow-xl pr-10 mx-auto ">
                        <div className='col-span-1'>
                            <div>
                                <img className='w-20 h-20 py-2 pl-3 pt-2  ' src={Perkerjaan} alt="" />
                            </div>
                        </div>
                        <div className='col-span-4 '>
                            <div className='namatugas font-medium text-base pl-6 pt-2 '>
                                <h3>
                                    {pd.nama}
                                </h3>
                            </div>
                            <div className=' pl-6 pt-5 flex'>
                                <div className='w-20 h-5 flex bg-slate-400  rounded-xl'>
                                    <p className='text-white text-center mx-auto text-sm '>
                                        To Do
                                    </p>
                                </div>
                            </div>
                            <div className=' col-span-1'>
                            </div>
                        </div>
                        <div>
                            <div className='pl-36 pt-8 mx-auto flex'>

                                <img src={calendar} alt="" className='mx-auto w-5 h-5 flex ' />
                                <div className='pl-2'>
                                    created
                                </div>
                                <div className='pl-1'>
                                    {pd.created}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

            postData
        })

    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }
    render() {
        return (
            <div>
                <div className='pt-20 pb-10 '>
                    <div className=' bg-slate-200 rounded-lg w-full h-screen  drop-shadow-xl  '>
                        <div className='w-52 mx-auto font-extrabold text-2xl pt-5 pl-14 pb-5'>To do list</div>

                        <div>

                            <div className=' pt-1 '>
                                <div className='grid grid-cols-1 gap-x-44 gap-y-4  '>
                                    {this.state.postData}
                                    <ReactPaginate
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
                                        activeClassName={"active"} />

                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        )
    }
}