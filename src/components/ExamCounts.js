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
            for (const property in data.aggr_month){
                am.push(data.aggr_month[property]);
            }
            for (const property in data.aggr_value){
                av.push(data.aggr_value[property]);
            }
            for (const property in data.aggr_year){
                ay.push(data.aggr_year[property])
            }
            for (var i=0; i<20; i++){
                ax.push(`__${data.aggr_year[i]}, ${data.aggr_month[i]}__`);
            }
            console.log(ax);
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