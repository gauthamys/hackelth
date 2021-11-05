import React, { Component, useState } from "react";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
const Plot = createPlotlyComponent(Plotly);

class ExamCounts extends Component{
    constructor(props){
        super(props);
        this.state={
            x: [],
            aggr_month:[],
            aggr_year:[],
            aggr_value:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/get_ec').then(response => {
            let ax=[];
            let av=[];
            let am=[];
            let ay=[];
            let data=response.data;
            for (const property in data.row_data){
                 am.push(data.row_data[property][0]);
                 av.push(data.row_data[property][2]);
                 ay.push(data.row_data[property][1]);
                 //ax.push(`Y-${data.row_data[property][1]}, M-${data.row_data[property][0]}`);
                 ax.push(`${data.row_data[property][0]}/${data.row_data[property][1]}`);
            }
            //console.log(am);
            //console.log(ax);
            this.setState({
                aggr_month: am,
                aggr_year: ay,
                aggr_value: av,
                x: ax
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

export default ExamCounts;