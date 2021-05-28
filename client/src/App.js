import './App.css';
import React  from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Beranda from './components/Beranda/Beranda.js';
import Tentang from './components/Tentang/Tentang.js';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Login/Login.js';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Beranda}/>
          <Route path="/Tentang" component={Tentang}/>
          <Route path="/Login" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
