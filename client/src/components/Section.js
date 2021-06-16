import React  from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Beranda from './Beranda/Beranda.js';
import Navbar from './Navbar/Navbar.js';
import Login from './Login/Login.js';
import Register from './Login/Register.js';
import Keranjang from './Section/Keranjang';
import Detail from './Section/Detail';
import Payment from './Section/Payment';
import Produk from './Section/Produk';

function Section() {
  return (
    <div className="Section">
      <Router basename="/">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Produk}/>
          <Route path="/product" component={Produk}/>
          <Route path="/product/:id" component={Detail}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/keranjang" component={Keranjang}/>
          <Route path="/payment" component={Payment}/>
        </Switch>
      </Router>
    </div>
  );
}

export default Section;
