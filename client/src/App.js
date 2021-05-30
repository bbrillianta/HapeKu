import React  from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Section from './components/Section';
import Navbar from './components/Navbar/Navbar';
import {DataProvider} from './components/Context';
import './App.css';

function App() {
  return (
    <div className="App">
       <DataProvider>
        <div className="app">
          <Router>
            <Navbar />
            <Section />
          </Router>
        </div>
      </DataProvider>
    </div>
  );
}

export default App;
