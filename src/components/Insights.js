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
                <button className={'shadow-2xl ml-4 rounded-full text-white w-12 h-12 '+(this.state.open ? 'bg-gradient-to-tr from-pink-400 to-red-500': 'bg-green-400')} onClick={this.handleClick}>{this.state.open ? <b>x</b> : <b>O</b>}</button>
                <div className={'absolute shadow-2xl m-5 w-64 h-64 opacity-90 rounded-xl bg-gradient-to-tl from-pink-500 to-red-600 '+(this.state.open ? 'visible':'invisible')}>
                    <p className='text-2xl text-white p-5'><b>Insights</b></p>
                </div>
            </>
        )
    }
}
export default Insights;