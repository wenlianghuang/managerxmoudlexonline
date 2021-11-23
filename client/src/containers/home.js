import React,{useState} from 'react';

//import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom'
import Homepage from '../components/Homepage/Homepage'
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import Inbox  from '../components/Inbox/Inbox';
export default function Home(){
  /*const [token,setToken] = useState()
  if(!token){
    return <Login setToken={setToken}/>
  }*/
  return(
    <>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/login" component={Login}/>
        <Route path="/Inbox/:title" component={Inbox}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/changepw" component={ChangePassword}/>    
      </Switch>
    </>
  )
  
}