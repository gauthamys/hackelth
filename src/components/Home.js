import { Component } from "react";
import ExamCounts from "./ExamCounts";
import Parts from "./Parts";
import Pie from "./Pie";
class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <div className='heading'>
                <div className='ml-20'>
                    <span class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 pl-2">
                        Global Insights
                    </span>
                    <p className='p-4 pl-6 mt-0 pt-0 text-gray-500'> Insights on the overall health of the CT Optima 660 modality </p>
                    <div className='mt-2 inline-grid grid-cols-2 w-10/12'>
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