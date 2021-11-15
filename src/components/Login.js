import { Component } from "react";

class Login extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <div className='heading'>
                <div className='text-7xl'>
                    <span class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
                        Login
                    </span>
                </div> 
            </div>
            </>
        )
    }
}

export default Login;