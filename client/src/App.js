import React from 'react'
import Navbar from './components/Navbar';
import {Routes} from "./config";
import "./App.css"

const App = () => { 
  return (
    <div>
      <Navbar />
      <Routes></Routes>   
    
      {/* bagian adminpage */}
      {/* <AdminPage /> */}
    </div>

  )
}

export default App
