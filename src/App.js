import SideBar from './components/SideBar';
import Home from './components/Home';
import Device from './components/Devices';
import Contact from './components/Contact';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Intro from './components/Intro';
import Login from './components/Login';

function App() {
  return (
    <>
      <SideBar />
      <Intro />
      <div className=''>
      <Switch>
        <Route path='/devices' component={Device} />
        <Route path='/contact' component={Contact} />
        {/* <Route path='/login' component={Login} />
        <Route path='/' component={Home} /> */}
        <Route path='/global' component={Home}/>
        <Route path='/' component={Login}/>
      </Switch>
      </div>
    </>
    
  );
}

export default App;
