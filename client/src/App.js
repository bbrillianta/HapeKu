import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import {Routes} from "./config";
import "./App.css"

const App = () => { 
  const [userCart, setUserCart] = useState([]);
  const [triggerCartUpdt, setTriggerCartUpdt] = useState(false);

  useEffect(() => {
    setUserCart(JSON.parse(localStorage.getItem('userCart')));
  }, [triggerCartUpdt]);

  return (
    <div>
      <Navbar userCart={userCart}/>
      <Routes setTriggerCartUpdt={setTriggerCartUpdt}></Routes>   
    
      {/* bagian adminpage */}
      {/* <AdminPage /> */}
    </div>

  )
}

export default App
