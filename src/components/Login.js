import { Html } from "@react-three/drei";
import { Component } from "react";
import Intro from "./Intro";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            error: ''
        }
        localStorage.removeItem('logged_in');
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleFp = this.handleFp.bind(this);
    }
    handleUsernameChange(e){
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    handleFp(e){
        e.preventDefault();
        let users = [
            {username: 'Sailesh', password: 'sailesh123'},
            {username: 'Parimala', password: 'parimala123'},
            {username: 'Chakita', password: 'chakita123'},
            {username: 'Gautham', password: 'gautham123'},
        ]
        
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.username == '' || this.state.password == ''){
            this.setState({
                error: 'please enter username and password'
            })
            return
        }
        let users = [
            {username: 'Sailesh', password: 'sailesh123'},
            {username: 'Parimala', password: 'parimala123'},
            {username: 'Chakita', password: 'chakita123'},
            {username: 'Gautham', password: 'gautham123'},
        ]
        let pmatch = false;
        let umatch = false;
        for(var obj in users){
            console.log(obj)
            if (users[obj].username == this.state.username){
                umatch = true
                if(users[obj].password == this.state.password){
                    localStorage.setItem('logged_in',true);
                    window.location.reload();
                    window.location.replace('http://localhost:3000/insights');
                    return
                }
            }
        }
        if (umatch == false){
            this.setState({
                error: 'no matching username found'
            })
            return
        }
        if (pmatch == false){
            this.setState({
                error: `password authentication failed`
            })
            return
        } 
    }
    render(){
        return(
            <div className=''>
            <Intro />
            <div className='w-screen h-screen grid place-items-center'>
                <div className='shadow-2xl'>
                    <div className='w-96 h-80 bg-gray-100 text-center rounded-2xl'>
                        <div className='text-xl text-gray-900 bg-gray-300 rounded-tr-2xl rounded-tl-2xl'><p className='p-3 text-base'>SSO</p></div>
                        <form onSubmit={this.handleSubmit}>
                        <div className='p-4 mt-4'>
                            <input onChange={this.handleUsernameChange} type='text' className='w-80 px-4 pl-5 py-2 border-b-4 rounded-2xl' placeholder='Username or user id'></input>
                        </div>
                        <div className=''>
                            <input type='password' onChange={this.handlePasswordChange} className='w-80 px-4 pl-5 py-2 border-b-4 rounded-2xl -inset-4' placeholder='Password'></input>
                        </div>
                        <p className={'absolute ml-12 p-2 text-base text-red-500 '+(this.state.error == ''? 'hidden':'visible')}>{this.state.error}</p>
                        <div className='inline-flex mt-8 w-full'>
                        <button type='submit' className='bg-green-400 text-white mt-16 w-1/2 p-2 rounded-bl-xl text-center transform duration-300 active:scale-95 active:bg-green-500'>
                            <p className='text-base'>login</p>
                        </button>
                        <button onClick={this.handleFp} className='bg-blue-400 text-white mt-16 w-1/2 p-2 rounded-br-xl transform duration-300 active:scale-95 active:bg-blue-500'>
                            <p className='text-base'>forgot password</p>
                        </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Login;