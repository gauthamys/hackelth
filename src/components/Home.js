import { Component } from "react";
//import Plot from 'react-plotly.js';
import Barchart from "./Barchart";

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoaded:false,
            dat:['hi'],
            tex:'haha'
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/get_parts').then((response)=>{
            this.setState({
                dat: (response.data).toString(),
                isLoaded: true
            })
        })
    }
    render(){
        return(
            <div className='heading'>
                <div className='h-screen'>
                    <span class="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Prognostic Monitoring and Analysis of Healthscores
                    </span>
                    <div className='text-black'>
                        {this.state.dat}
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;