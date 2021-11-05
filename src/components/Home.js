import { Component } from "react";
import ExamCounts from "./ExamCounts";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='heading'>
                <div className='h-screen'>
                    <span class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Global Insights
                    </span>
                    <ExamCounts />
                </div>
            </div>
        )
    }
}
export default Home