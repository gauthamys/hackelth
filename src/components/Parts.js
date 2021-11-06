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
        }
    }
    componentDidMount(){
        let ax=[];
        let ay=[];
        axios.get('http://localhost:5000/get_parts').then(response => {
            console.log(response.data.row_data);
            for(var i=0;i<response.data.columns;i++){
                ax.push(response.data.row_data[i][0]);
                ay.push(response.data.row_data[i][1]);
            }
            this.setState({
                x: ax,
                y: ay
            })
        })
        console.log(this.state.x);
    }
    render(){
        return(
            <div className='mt-5 mb-36 ml-4'>
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
                    ]} layout={{width: 900, height: 500, plot_bgcolor:"#e5e7eb", paper_bgcolor:"#e5e7eb",title:'<b>Frequently Replaced Parts</b>',
                                xaxis:{title:'Part ID'}, yaxis:{title:'Replace Frequency'}}}/>
                <Insights />
                </div>
            </div>
        )
    }
}

export default Parts;