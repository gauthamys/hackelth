import axios from "axios";
import { Component } from "react";

class DT extends Component{
    constructor(props){
        super(props);
        this.state={
            sysid: this.props.sysid,
            data: []
        }
    }
    componentDidUpdate(){
        this.setState({
            sysid: this.props.sysid
        })
    }
    componentDidMount(){
        axios.post('http://localhost:5000/predict',{'sysid':this.state.sysid}).then(response=>{
            console.log(response.data)
            this.setState({
                data: response.data
            })
        })
    }
    render(){
        return(
            <>
                <p>hi {this.props.sysid}!</p>
                <p> {this.state.data.row_data} </p>
            </>
        )
    }
}

export default DT;