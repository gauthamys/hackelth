import { Component } from "react";
import axios from 'axios';
import Barchart from "./Barchart";
import Intro from "./Intro";

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoaded:false,
            data:[],
            tex:'haha'
        }
    }
    componentWillMount(){
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
                    <span class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Global Insights
                    </span>
                    <Barchart test='test'/>
                    <div className='text-black'>
                        {(this.state.data).map(element => {
                            <p>hi</p>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;