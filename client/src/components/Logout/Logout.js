import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
export default function Logout(){
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
  return(
    <>
    <Button 
      onClick={handleLogout} 
      variant="contained" 
      color="primary" 
      style={{padding:"15px",position: "relative", left: 1200,backgroundColor:"blueviolet"}}
    >
        Sign Out
    </Button>
    </>
  )
}