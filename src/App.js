import SideBar from './components/SideBar';
import Home from './components/Home';
import Device from './components/Devices';
import Contact from './components/Contact';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Intro from './components/Intro';
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
        <div className=''>
        <Switch>
          <Route path='/devices' component={Device} />
          <Route path='/contact' component={Contact} />
          <Route path='/insights' component={Home} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={Login} />
        </Switch>
        {this.state.user ? <Logout /> : null}
        </div>
      </>
    );
  }
  
}

export default App;
