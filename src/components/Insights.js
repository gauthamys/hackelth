import { Component } from "react";
class Insights extends Component{
    constructor(props){
        super(props);
        this.state={
            open: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        if(this.state.open){
            this.setState({
                open: false
            })
        }
        else{
            this.setState({
                open: true
            })
        }
    }
    render(){
        return(
            <>
            <div>
            <button className={'rounded-full ml-5 text-white w-8 h-8 opacity-80 '+(this.state.open ? 'bg-red-500': 'bg-green-400')} onClick={this.handleClick}>{this.state.open ? 'x' : 'i'}</button>
                <div className={'transition transform ease-in-out duration-1000 relative shadow-2xl ml-5 mt-3 w-64 h-80 opacity-90 rounded-xl bg-gradient-to-tl from-pink-500 to-red-600 '+(this.state.open ? 'visible':'invisible')}>
                    <p className='text-2xl text-white p-5'><b>Insights</b></p>
                </div>
            </div>
                
            </>
        )
    }
}
export default Insights;