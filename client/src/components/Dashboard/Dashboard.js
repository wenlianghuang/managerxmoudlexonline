import React,{useEffect, useState} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import "./index.css";
import Sidebar from '../Sidebar/Sidebar';
import {useSelector} from 'react-redux';
import { Typography } from '@material-ui/core';
const drawerWidth = 240;

export default function Dashboard(){

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/dashboard",state: {reload: true} } };
  let homepageimg = [
    "slide1.jpg",
    "slide2.jpg",
    "slide3.jpg",
  ]
  let imagename = Math.floor(Math.random() * 3); ;
  const [slidenum,setSlideNum] = useState(0);
  useEffect(()=>{
    const loggedIn = sessionStorage.getItem("token")
    if(loggedIn){
      setSlideNum(slidenum+1);
      if(slidenum >= 3)
        setSlideNum(0);
      console.log(imagename);
      history.replace(from);
    }else{
      history.replace('/');
    }
  },[])
  const User = sessionStorage.getItem("username");
  //const accountUser = useSelector(state => state.login)
  return(
    <>
      <Sidebar/>
      <img 
        src={`${homepageimg[imagename]}`} 
        alt="Slider"   
        className="ImageIncenter"
      />
      <h3
        style={{
          position:'relative',
          bottom: 350,
          fontFamily: 'Papyrus',
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        Hello {User} , Welcome to Acer
      </h3>
    </>
  )
}

