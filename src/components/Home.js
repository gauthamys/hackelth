import { Component } from "react";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='relative ml-60 p-4 pt-8'>
                <div class="text-7xl h-screen">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Hack-E-Lth 2021
                    </span>
                </div>
            </div>
        )
    }
}
export default Home;