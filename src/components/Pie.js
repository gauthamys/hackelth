import axios from "axios";
import { Component } from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import Insights from "./Insights";
const Plot = createPlotlyComponent(Plotly);

class Pie extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            all: []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/get_labels').then(res => {
            let d=[];
            for(var i in res.data){
                d.push(res.data[i])
            }
            this.setState({
                data: d,
                all: res.data
            })
            console.log(this.state.all);
        })
    }
    render(){
        return(
            <div className='ml-4 mt-7'>
                <div className='inline-flex'>
                <Plot data={[
                        {
                            type: 'pie',
                            values: this.state.data,
                            labels: ['Green','Red','Yellow'],
                            marker: {colors:['#27AE60','#E74C3C','#F1C40F']}
                        }
                    ]}
                    layout={{width: 875, height: 500, plot_bgcolor:"#e5e7eb", paper_bgcolor:"#e5e7eb",title:'<b>Global Device Statuses</b>'}}/>
                    <Insights val='Absolute counts' ans={[1].map(item => {
                        return(
                            <>
                            <p>Green {this.state.all.Green}</p>
                            <p>Yellow {this.state.all.Yellow}</p>
                            <p>Red {this.state.all.Red}</p>
                            </>
                        )
                    })}/>
                </div>
            </div>
            
        )
    }
}

export default Pie;