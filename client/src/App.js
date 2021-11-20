import React,{useState} from 'react';
//import logo from './logo.svg';
import './App.css';

//import PingComponent from './PingComponent';

import { BrowserRouter as Router } from "react-router-dom";
import Home from './containers/home'
function App() {
  const [token, setToken] = useState();
  {/*
  if(!token) {
    return <Login setToken={setToken} />
  }
  */}
  return (
    <div class="wrapper">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Deploy React + Go to Heroku using Docker
        </p>
        <PingComponent />

      </header>
      */}
      
      <Router>
        <Home/>
      </Router>
    </div>
  );
}

export default App;