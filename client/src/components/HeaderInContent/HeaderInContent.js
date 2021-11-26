import React,{useEffect,useState,useContext} from 'react';
import { useHistory,useLocation,useParams } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
export default function HeaderInContent({title,username}){
  let localtitle = title;
  let localusername = username;
  console.log("localtitle: ",localtitle)
  return(
    <>
    <Box
      style={{
        position: 'relative',
        width: 1200,
        height: 35,
        left: 270,
        top: 100,
        textAlign: 'center',
        backgroundColor: '#707B7C',
      }}
    >
      <Toolbar 
        style={{
          position:'relative'
        }}
      >
        <Typography Wrap component="div" 
        style={{
          position:'absolute',
          fontFamily: 'Brush Script',
          fontSize: 15,
          top: 3,
          right: 0,
          color: 'white',
        }}>
          Hello, {localusername}
        </Typography>
        <Typography Wrap component="div"
          style={{
            position:'absolute',
            fontFamily: 'Brush Script',
            fontSize: 20,
            top: 0,
            left: 0,
            color: 'white',
          }}>
          {localtitle}    
        </Typography>
      </Toolbar>
    </Box>
    
    </>
  )
}