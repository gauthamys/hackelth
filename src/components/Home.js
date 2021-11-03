import { Component } from "react";
import Card from "./Card";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='heading'>
                <div className='h-screen'>
                    <span class="text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Hack-E-Lth 2021
                </span>
                </div>
            </div>
        )
    }
}
export default Home;