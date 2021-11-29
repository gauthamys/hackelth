import axios from "axios";
import { Spinner } from "reactstrap";
const { Component } = require("react");

export default class PartHealth extends Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            data: []
        }
    }
    componentDidMount(){
        axios.post('http://localhost:5000/part_predict',{'sysid': `${this.props.sysid}`}).then( res => {
            this.setState({
                data: res.data,
                loaded: true
            })
            console.log(this.state.data)
        })
    }
    render(){
        if(this.state.loaded){
            return(
                <div className='p-4 bg-gray-400 w-10/12 shadow-2xl'>
                    <p>{this.state.data.col_data}</p>
                </div>
            )
        } else {
            return(
                <div className='p-4 bg-gray-400 w-10/12 shadow-2xl'>
                    <p>Loading ...</p>
                </div>
            )
        }
    }
}