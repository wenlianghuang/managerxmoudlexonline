//2021.11.23 Matt: Navigation
import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import {RectengleButton} from '../AllDecoration/AllDecoration'
import { Avatar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {useSelector} from 'react-redux';


export default function Navigationbar(){
  /*useEffect(()=>{
    const loggedIn = sessionStorage.getItem("token");
    if()
  },[])*/
  const history = useHistory()
  const handleLogout = () => {
    const loggedIn = sessionStorage.getItem("token");
    if(loggedIn){
      sessionStorage.removeItem("token");
      console.log("session storage: ",sessionStorage.getItem("token"));
      history.replace("/");
    }
  }
  //const accountUser = useSelector(state => state.login)
  //const accountPassword = useSelector(state => state.password)
  const User = sessionStorage.getItem("username")
  const rtButton = RectengleButton();
  return(
    <>
    <div className={rtButton.header} >
    <Button 
      onClick={handleLogout} 
      variant="contained" 
     style={{left: 1350, backgroundColor: "blueviolet"}}
    >
        Sign Out
    </Button>
    <Button 
      variant="contained"
      style={{top: -37, left: 1200,backgroundColor: "#EAEA19 "}}
    >
      Information
    </Button>
    <Button 
      variant="contained"
      style={{top:-74, left: 1050,backgroundColor: "#81D873"}}
      
      onClick={()=>history.push("/dashboard")}
    >
      HomePage
    </Button>
    {/*
    <Button 
      variant="contained"
      style={{top:-111,left: 900, backgroundColor: "#F08D0F"}}
      onClick={()=>history.push("/dashboard")}
    >
      HomePge
    </Button>
    */}
    {/*
    <Typography 
      style={{ 
        position:'relative' ,
        top:-111,
        left: 900, 
        color: 'black',
        fontSize: 20
        }}>
        Welcome {accountUser}
    </Typography>
      */}
    <Avatar 
      style={{
        position: 'relative',
        top:-111,
        left: 1465,
        backgroundColor: '#A9CCE3'
      }}>
      {User[0]}
    </Avatar>
    </div>
    
    </>
  )
}