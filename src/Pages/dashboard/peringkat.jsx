import React, { Component } from 'react'
// import axios from 'axios'
import ReactPaginate from 'react-paginate';
import profile from '../../Images/profile.png';



export default class peringkat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 4,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {

        const data = [
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail dfask Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail dsda Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
            {
                nama: "Fudail Ramadhani",
                presentase: "150%"
            },
        ];
        const data1 = [
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani dfask Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani dsda Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
            {
                nama: "dani Ramadhani",
                presentase: "150%"
            },
        ];


        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(pd =>
            <React.Fragment>
                <div className='overflow-y-auto pt-2'>
                    <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">

                        <div className=' col-span-2 '>
                            <img className='w-14 h-14 py-2 pl-3  ' src={profile} alt="" />
                        </div>
                        <div className=' col-span-6 pl-4 pt-3'>
                            <p>{pd.nama}</p>
                            <div className='w-52 bg-green-400 h-3 rounded-2xl'></div>
                        </div>
                        <div className='col-span-4 py-2 pl-12 pt-6'>
                            <div className='w-16 bg-green-200 h-6 rounded-lg'>
                                <div className='mx-auto text-center font-serif text-green-600'>{pd.presentase}</div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </React.Fragment>)
             const slice1 = data1.slice(this.state.offset, this.state.offset + this.state.perPage)
             const postData1 = slice1.map(dp =>
                <React.Fragment>
                    <div className='overflow-y-auto pt-2'>
                        <div className="grid grid-cols-12 w-96 flex-auto h-14 bg-white rounded-xl drop-shadow-xl  ">
    
                            <div className=' col-span-2 '>
                                <img className='w-14 h-14 py-2 pl-3  ' src={profile} alt="" />
                            </div>
                            <div className=' col-span-6 pl-4 pt-3'>
                                <p>{dp.nama}</p>
                                <div className='w-52 bg-green-400 h-3 rounded-2xl'></div>
                            </div>
                            <div className='col-span-4 py-2 pl-12 pt-6'>
                                <div className='w-16 bg-green-200 h-6 rounded-lg'>
                                    <div className='mx-auto text-center font-serif text-green-600'>{dp.presentase}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </React.Fragment>)
        

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

            postData,
            postData1
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
                    <div className=' bg-slate-200 rounded-lg w-full h-96  drop-shadow-xl  '>
                        <div className='w-96 mx-auto font-extrabold text-2xl pt-3 pl-20'>Peringkat Teratas</div>
                        <div className='grid grid-cols-2 gap-72 flex-auto w-full h-10 pt-1 pl-16 pr-14'>
                            <div className=' pl-24 pr-20 text-center font-medium'>GOAL</div>
                            <div className=' pl-14 pr-20 text-center font-medium'>MA</div>
                        </div>
                        <div>

                            <div className='pl-14 '>
                                <div className='grid grid-cols-2   gap-x-44 gap-y-3  '>
                                    <div>{this.state.postData}</div>
                                    <div>{this.state.postData1}</div>
                                    <ReactPaginate
                                        className=''
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