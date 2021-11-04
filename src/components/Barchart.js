import React, { Component } from "react";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

function Barchart(){
    return(
        <div className='relative'>
            <Plot
                data={[
                    {type: 'bar',
                        x: ['one', 'two', 'three'],
                        y: [23, 124, 55]
                    }]}
                layout={ {width: 300, height: 300, plot_bgcolor:"#e5e7eb", paper_bgcolor:"#e5e7eb", title:"Exam counts"}}
            />
        </div>
    );
}
export default Barchart;