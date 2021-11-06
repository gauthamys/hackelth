import { Component } from "react";
import ExamCounts from "./ExamCounts";
import Parts from "./Parts";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='heading'>
                <div>
                    <span class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Global Insights
                    </span>
                    <ExamCounts />
                    <Parts />
                </div>
            </div>
        )
    }
}
export default Home