import React,{useState,useEffect} from 'react';
import { makeStyles,withStyles,styled } from '@material-ui/core/styles';
import {borderRadius} from '@mui/system'
import Button from '@material-ui/core/Button'; 
const RoundButton = styled(Button)({
    display:'block',
    width:100,
    height:100,
    lineHieght :"100px",
    border: '2px solid #f5f5f5',
    borderRadius: '50%',
    color:'#f5f5f5',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#555777',
    boxshadow: '0 0 3px gray',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
    top: 40,
    left: 145,
    '&:hover':{
      backgroundColor: '#777555',
    }
});
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
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});
export {RoundButton,MyButton,RoundButton2}