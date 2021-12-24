//2021.11.19 Decoration with Material-UI to instead the .css file
//Ref:https://mui.com/styles/basics/
import React,{useState,useEffect} from 'react';
import { makeStyles,withStyles,styled } from '@material-ui/core/styles';
import {borderRadius} from '@mui/system'
import Button from '@material-ui/core/Button'; 

//Navigation with header
const RectengleButton = makeStyles({
  header:{
    color: '#1C2833',
    position: 'fixed',
    marginLeft: 5,
    width: 200,
    height: 30,
    
  }
})

//Round Button
const RoundButton2 = makeStyles({
  rb:{
    display:'block',
    width:100,
    height:100,
    lineHieght :100,
    border: '2px solid #f5f5f5',
    borderRadius: '50%',
    color:'white',
    textAlign: 'center',
    textDecoration: 'none',
    //backgroundColor: '#555777',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxshadow: '0 0 3px gray',
    fontSize: 50,
    fontWeight: 'bold',
    position: 'relative',
    top: 40,
    left: 145,
    '&:hover':{
      background: '#C3E73C',
    }
  },
})

// Logo with Header
const MyLogo = makeStyles({
  logo:{
    maxHeight: 45,
    maxWidth: 220,
  }
})


//table template
const useTableStyles = makeStyles({
  root: {
    position: 'relative',
    left: 280,
    width: 1200,
    top: '500px',
    
  },
  container: {
    position:'absolute',
    top: -350,
    maxHeight: 440,
    justifyContent: 'center',
  },
  paperbutton:{
    width: '30%',
    display: 'flex',
  },
  pageStyle:{
      height: '100vh',
      backgroundColor: '#ffb3d9',
  },
  PaginationTemplate:{
    position: 'absolute',
    top: 100,
    right:0,
  }
});

//SideBar header Box
const SideBarHeader = makeStyles({
  eachBox:{
      textAlign:'center',
      width:"65%",
      fontSize:30,
      left:140,
      color:"white",
      backgroundColor:"gray"
  }
});
//Testing
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});
export {MyButton,RoundButton2,RectengleButton,MyLogo,useTableStyles,SideBarHeader}