import { Component } from "react";
import axios from "axios";
import Model from "./models/Model";

class Device extends Component{
    constructor(props){
        super(props);
        this.state = {
            sysid: '',
            data: [],
            row_data: [],
            yellow: [],
            red: [],
            green: [],
            row_data_sys: [],
            neighs: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/get_devices').then(res => {
            this.setState({
                everything: JSON.parse(res.data)
            })
        })
        axios.post('http://localhost:5000/predict',{'sysid':this.state.sysid}).then(response=>{
            if(response.data.rows == 1){
                console.log(response.data)
                this.setState({
                    data: response.data,
                    row_data: response.data.row_data[0]
                })
            }
        })
    }

    handleChange(event){
        axios.post('http://localhost:5000/predict',{'sysid':event.target.value}).then(response=>{
            if(response.data.rows == 1){
                console.log(response.data)
                console.log(response.data.row_data[0][6])
                this.setState({
                    sysid: event.target.value,
                    data: response.data,
                    row_data: response.data.row_data[0],
                    label: response.data.row_data[0][7]
                })
            }
            
        })
        axios.post('http://localhost:5000/device_stats',{'sysid':event.target.value}).then(response=>{
            if(response.data.rows == 1){
                console.log(response.data)
                console.log(response.data.row_data[0])
                //console.log(response.data.row_data[0][6])
                this.setState({
                    row_data_sys: response.data.row_data[0]
                    //neighs: response.data.row_data[0][7]
                })
            }
            
        })
    }
    render(){
        const color={Green:'bg-green-300 text-green-900',Red:'bg-red-300 text-red-900',Yellow:'bg-yellow-200 text-yellow-900'}
        return(
            <div className='heading'>
                <div class="text-7xl">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Devices
                    </span>
                    <div className="text-3xl h-screen mt-4">
                        <div class="text-2xl container py-5 mx-auto flex flex-wrap items-center justify-between">
                            <div class="border-4 border-blue-200 rounded-full bg-white shadow flex w-11/12">
                                <input
                                    type="text"
                                    placeholder="Enter sysid here (eg. sys1420)"
                                    className="rounded-tl-full rounded-bl-full py-2 px-4 w-screen" onChange={this.handleChange} />
                                <button className="relative bg-gray-300 rounded-tr-full rounded-br-full transition duration-300 hover:bg-green-300 py-2 px-4 mr-0 w-48">
                                    <p className='text-sm'>🔍</p>
                                </button>
                            </div>
                        </div>
                        <table class="table-fixed w-11/12 text-2xl rounded-bl-full rounded-br-full mt-4">
                            <thead className="text-left border text-green-400 bg-gray-200">
                                <tr>
                                <th className="py-5 px-4">Device</th>
                                <th>RUL (Yrs)</th>
                                <th>Age (Yrs)</th>
                                <th>Exam Count</th>
                                <th>Time (hrs)</th>
                                </tr>
                            </thead>  
                            <tbody>
                                <tr className={'text-base '+(color[this.state.row_data[7]])}>
                                    <td className="py-5 px-4">{this.state.sysid}</td>
                                    <td>{this.state.row_data[3]}</td>
                                    <td>{this.state.row_data[2]}</td>
                                    <td>{this.state.row_data[4]}</td>
                                    <td>{this.state.row_data[5]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='grid grid-cols-2'>
                            <div className={"text-white text-2xl pt-3 rounded-xl mt-4 "+(color[this.state.row_data[7]])}>
                                <p class="py-2 px-4">Health Status:<b>{this.state.row_data[7]}</b></p>
                                <p class="py-2 px-4">Average time between services: <b>{this.state.row_data_sys[0]} days</b></p>
                                <p class="py-2 px-4">Average down-time: <b>{this.state.row_data_sys[1]} days</b></p>
                                <p class="py-2 px-4">Average service requests: <b>{this.state.row_data_sys[2]}</b></p>
                                <p class="py-2 px-4">Total parts replaced: <b>{this.state.row_data_sys[3]}</b></p>
                                <p class="py-2 px-4">First service request: <b>{this.state.row_data_sys[5]}</b></p>
                                <p class="py-2 px-4">Install date: <b>{this.state.row_data_sys[4]}</b></p>
                                <p class="py-2 px-4">Service status: <b>{this.state.row_data_sys[6]}</b></p>
                                {/* <p class="py-2 px-4 hover:text-green-500">Similar systems: <span class="text-white"><b>{this.state.neighs[0]}, {this.state.neighs[1]}</b></span></p> */}
                            </div>
                            <Model id={this.state.sysid} color={color[this.state.row_data[7]]} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Device;