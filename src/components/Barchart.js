import React, { Component, useState } from "react";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
const Plot = createPlotlyComponent(Plotly);

class ExamCounts extends Component{
    constructor(props){
        super(props);
        this.state={
            x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            aggr_month:[],
            aggr_year:[],
            aggr_value:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/get_ec').then(response => {
            let av=[];
            let am=[];
            let ay=[];
            let data=response.data;
            for (const property in data.aggr_month){
                am.push(data.aggr_month[property]);
            }
            for (const property in data.aggr_value){
                av.push(data.aggr_value[property]);
            }
            for (const property in data.aggr_year){
                ay.push(data.aggr_year[property])
            }
            this.setState({
                aggr_month: am,
                aggr_year: ay,
                aggr_value: av
            })
        })
    }
    render(){
        return(
            <div className='mt-5 ml-4'>
            <Plot data={[
                {
                    type: 'line',
                    x: this.state.x,
                    y: this.state.aggr_value
                }
            ]} 
            layout={{width: 900, height: 500, plot_bgcolor:"#e5e7eb", paper_bgcolor:"#e5e7eb", title:"Exam counts"}}
                />
            </div>
        )
    }
}

function Barchart(props){
    const [data, setData] = useState([]);
    axios.get('http://localhost:5000/get_ec').then((res)=>{
        setData(res.data)
        console.log(data)
    }) 
    return(
        <div className='relative mt-5 ml-4'>
            <Plot
                data={[
                    {type: 'bar',
                        x: ['one', 'two', 'three'],
                        y: [23, 124, 55],
                        marker: {color: '#148F77'}
                    }]}
                layout={ {width: 700, height: 500, plot_bgcolor:"#e5e7eb", paper_bgcolor:"#e5e7eb", title:"Exam counts"}}
            />
        </div>
    );
}
export default ExamCounts;