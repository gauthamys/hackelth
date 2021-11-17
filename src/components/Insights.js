import { Component } from "react";
class Insights extends Component{
    constructor(props){
        super(props);
        this.state={
            open: false
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
            <div className='absolute ml-0 mt-5'>
            <button className={'rounded-full ml-5 clickable text-white w-8 h-8 opacity-80 '+(this.state.open ? 'bg-green-600': 'bg-green-400')} onClick={this.handleClick}>{this.state.open ? 'x' : 'i'}</button>
                <div className={'relative shadow-xl ml-5 mt-3 w-80 h-80 opacity-90 rounded-xl bg-green-500 transform transition duration-1000 ease-in-out '+(this.state.open ? 'visible':'invisible')}>
                    <p className='text-2xl text-white p-5'><b>Insights</b></p>
                    <p className='text-xl text-white p-5'>{this.props.val}<br /><b className='text-2xl'>{this.props.ans}</b></p>
                </div>
            </div>
                
            </>
        )
    }
}
export default Insights;