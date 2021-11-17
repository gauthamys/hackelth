import axios from "axios";
import { Component } from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import Insights from "./Insights";

const Plot = createPlotlyComponent(Plotly);

class Parts extends Component{
    constructor(props){
        super(props);
        this.state = {
            x:[],
            y:[],
            max:0
        }
    }
    componentDidMount(){
        let ax=[];
        let ay=[];
        let m;
        let max_count=0;
        axios.get('http://localhost:5000/get_parts').then(response => {
            console.log(response.data.row_data);
            console.log(response.data.columns);
            max_count = response.data.row_data[0][1];
            m = response.data.row_data[0][0];
            for(var i=0;i<response.data.rows;i++){
                ax.push(response.data.row_data[i][0]);
                ay.push(response.data.row_data[i][1]);
                if(response.data.row_data[i][1] > max_count)
                    m = response.data.row_data[i][0]
            }
            //m = response.data.row_data[response.data.rows-1][0];
            this.setState({
                x: ax,
                y: ay,
                max: m
            })
        })
        console.log(this.state.x);
    }
    render(){
        return(
            <div className='ml-2 pl-2'>
                <div className='inline-flex'>
                <Plot data={[
                    {
                        type: 'bar',
                        x: this.state.x,
                        y: this.state.y,
                        marker:{
                            color: '#1ABC9C'
                        }
                    }
                    ]} layout={{width: 500, height: 500, plot_bgcolor:"#e5e7eb", paper_bgcolor:"#e5e7eb",title:'<b>Frequently Replaced Parts</b>',transition: {duration: 1000, easing: 'elastic-in'},
                                xaxis:{title:'Part ID'}, yaxis:{title:'Replace Frequency'}}}/>
                <Insights val="Most frequently replaced part:" ans={this.state.max}/>
                </div>
            </div>
        )
    }
}

export default Parts;