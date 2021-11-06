import { Component } from "react";
import ExamCounts from "./ExamCounts";
import Parts from "./Parts";

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <div className='heading'>
                <div>
                    <span class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
                        Global Insights
                    </span>
                    <div className='mt-10'>
                        <ExamCounts />
                        <Parts />
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default Home