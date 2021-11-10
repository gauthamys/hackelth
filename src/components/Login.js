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
                <div className='mt-10'>
                    <p className='p-3 text-xl text-gray-500 pb-0 ml-7'>Username</p>
                    <input type='text' placeholder='text' className='border w-5/6 p-3 rounded-tl-full rounded-bl-full rounded-tr-full rounded-br-full rounded' />
                    <p className='p-3 text-xl text-gray-500 pb-0 ml-7 mt-3'>Password</p>
                    <input type='password' placeholder='text' className='border w-5/6 p-3 rounded-tl-full rounded-bl-full rounded-tr-full rounded-br-full rounded' />
                </div> 
            </div>
            </>
        )
    }
}

export default Login;