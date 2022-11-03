import React,{useState} from 'react';

//import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom'
import Homepage from '../components/Homepage/Homepage'
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import Inbox  from '../components/Inbox/Inbox';
import RCDFunc from '../components/RCDFunc/RCDFunc';
import OnlyforTesting from '../components/OnlyforTesting/OnlyforTesting'; //Only for practice
import BuildOfflineRCD from '../components/BuildOfflineRCD/BuildOfflineRCD';
import UploadFile from '../components/UploadFile/UploadFile';
//import SearchBarTest from '../components/SearchBar/SearchBarTest';
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
        <Route path="/RCDFunc/:title" component={RCDFunc}/>
        <Route path="/onlyfortesting" component={OnlyforTesting}/>
        <Route path="/buildofflinercd" component={BuildOfflineRCD}/>
        <Route path="/upload" component={UploadFile}/>
      </Switch>
    </>
  )
  
}