import SideBar from './components/SideBar';
import Home from './components/Home';
import Device from './components/Devices';
import Contact from './components/Contact';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <SideBar />
      <div>
      <Switch>
        <Route path='/devices' component={Device} />
        <Route path='/contact' component={Contact} />
        <Route path='/' component={Home} />
      </Switch>
      </div>
    </>
    
  );
}

export default App;
