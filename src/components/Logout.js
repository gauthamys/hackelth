import { Html } from "@react-three/drei";
import { Component } from "react";

class Logout extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        localStorage.removeItem('logged_in');
        window.location.replace('http://localhost:3000/');
    }
    render(){
        return(
            <div className='fixed top-4 right-4'>
                <button onClick={this.handleSubmit} className='clickable p-2 px-4 text-white rounded-l-full rounded-r-full bg-main border-gray-500 border-b-2'>
                    <span className='text-base'> Sign out </span>
                </button>
            </div>
        )
    }
}

export default Logout;