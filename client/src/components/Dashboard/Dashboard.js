import React,{useEffect, useState} from 'react'
import Homepage from '../Homepage/Homepage'
import Login from '../Login/Login'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import Source from '@mui/icons-material/Source'
import TextSnippet from '@mui/icons-material/TextSnippet'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Logout from '../Logout/Logout';
import {useHistory,useLocation} from 'react-router-dom'
import "./index.css";
import Sidebar from '../Sidebar/Sidebar';
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
  
  return(
    <>
      <Sidebar/>
      <img 
        src={`${homepageimg[imagename]}`} 
        alt="Slider"   
        className="center"
      />
    </>
  )
}

