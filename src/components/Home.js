import { Component } from "react";
import ExamCounts from "./ExamCounts";
import Parts from "./Parts";
import Pie from "./Pie";
import Card from "./Card"
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
                    <p className='p-4 pl-2 mt-0 pt-0 text-gray-500'> Insights on the overall health of the CT Optima 660 modality </p>
                    <div className='mt-10'>
                        <Pie />
                        <Parts />
                        <ExamCounts />
                    </div>
                    {/* <Card/> */}
                </div>
            </div>
            </>
        )
    }
}
export default Home