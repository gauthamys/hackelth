import { Component } from "react";
//import Plot from 'react-plotly.js';
import Barchart from "./Barchart";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <div className='relative ml-60 p-4 pt-8 h-screen'>
                    <div class="text-7xl ">
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                            Hack-E-Lth 2021
                        </span>
                    </div>
                    <br/>
                    <div className='absolute right-10'>
                        <Barchart/>
                    </div>
                </div>

        )
    }
}
export default Home;