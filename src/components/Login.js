import { Html } from "@react-three/drei";
import { Component } from "react";

class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        return(
            <>
            <div className='bg-main bg-cover bg-opacity-50 w-screen h-screen'>
                <div className='heading justify-item-center'>
                    <div className='ml-96 mt-32 w-96 h-80 bg-white text-center rounded-2xl shadow-3xl'>
                        <div className='text-xl text-gray-900 bg-gray-300 rounded-tr-2xl rounded-tl-2xl'><p className='p-3 text-base'>SSO</p></div>
                        <form onSubmit={this.handleSubmit}>
                        <div className='p-4 mt-4'>
                            <input type='text' className='w-80 px-4 pl-5 py-2 border-b-4 rounded-2xl' placeholder='Username or user id'></input>
                        </div>
                        <div className=''>
                            <input type='password' className='w-80 px-4 pl-5 py-2 border-b-4 rounded-2xl -inset-4' placeholder='Password'></input>
                        </div>
                        <div className='inline-flex mt-8 w-full'>
                        <button type='submit' className='bg-green-400 text-white mt-16 w-1/2 p-2 rounded-bl-xl text-center transform duration-300 active:scale-95 active:bg-green-500'>
                            <p className='text-base'>login</p>
                        </button>
                        <button className='bg-blue-400 text-white mt-16 w-1/2 p-2 rounded-br-xl transform duration-300 active:scale-95 active:bg-blue-500'>
                            <p className='text-base'>forgot password</p>
                        </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Login;