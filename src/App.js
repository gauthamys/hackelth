import SideBar from './components/SideBar';
import Home from './components/Home';
import Device from './components/Devices';
import Contact from './components/Contact';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      user: localStorage.getItem('logged_in') ? localStorage.getItem('logged_in') : null
    }
  }
  render(){
    return (
      <>
        <SideBar user={this.state.user}/>
        <div className='overflow-x-hidden'>
        <Switch>
          <Route path='/devices' component={() => this.state.user == null ? <Login />:<Device/>} />
          <Route path='/contact' component={() => this.state.user == null ? <Login />:<Contact/>} />
          <Route path='/insights' component={() => this.state.user == null ? <Login />:<Home/>} />
          <Route path='/logout' component={() => this.state.user == null? <Login />:<Logout/>} />
          <Route path='/' component={() => this.state.user == null ? <Login /> : <Device />} />
        </Switch>
        {this.state.user ? <Logout /> : null}
        </div>
      </>
    );
  }
  
}

export default App;
