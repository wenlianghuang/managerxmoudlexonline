import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory,useLocation,useParams} from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';

import Box from '@mui/material/Box';
import { createTheme, positions, style } from '@mui/system';
//import { ThemeProvider } from '@mui/private-theming';
//import { Container, FormControl, Typography } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel  from '@mui/material/InputLabel';
import Select  from '@mui/material/Select';
import MenuItem  from '@material-ui/core/MenuItem';
import Button from '@mui/material/Button';
import { FormHelperText } from '@material-ui/core';
import ButtonGroup from '@mui/material/ButtonGroup';
import Collapse  from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {SideBarHeader} from '../AllDecoration/AllDecoration'
export default function BuildOfflineRCD(){
  const [osabbr,setOSAbbr] = useState("");
  const [wos,setWOS] = useState("");
  const [modelcomputer,setModelComputer] = useState("");
  const [modelname,setModelName] = useState("");
  const [sclversion,setSCLVersion] = useState("");
  const [pop,setPOP] = useState("");
  const [createsuccess,setCreateSuccess] = useState(false);
  const [split,setSplit] = useState("");
  //2021.12.24
  const classes = SideBarHeader();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("WOS: ",wos)
    await axios.post("/buildofflinercd",{
      osabbr: osabbr,
      wos: wos,
      modelcomputer: modelcomputer,
      modelname: modelname,
      sclversion: sclversion,
      pop: pop,
      split: split
    },
    {
      headers:{
        "Content-Type": "application/json",
      },
    }
    ).then((res)=>{
      console.log(res.data)
      setOSAbbr('')
      setWOS('');
      setModelComputer('');
      setModelName('');
      setSCLVersion('');
      setPOP('');
      setSplit('');
      setCreateSuccess(true);
      
    }).catch((error)=>{
      console.error(error)
    })
    
  }
  return(
    <>
      <Sidebar/>
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
          position:'relative'
        }}
      >
        {/*
        <Typography
              style={{
                color:"white",
                backgroundColor:"gray"
              }}
        >
          Building Offline RCD
        </Typography>
        */}
        <Box 
          className={classes.eachBox}
        >
          Building Offline RCD
        </Box>
        <Box component="form" Validate >
        <Box style={{width: "80%",marginBottom:1,position:'absolute',top:70,width:300,marginRight:50,left:350}}>
          <FormControl required Validate fullWidth style={{left:0,marginBottom:25}}>
            <InputLabel id="woslabel">OS Abbr</InputLabel>
              <Select
                  labelId="woslabelid"
                  id="wosid"
                  value={wos}
                  label="OS Abbr"
                  onChange={(e) => setWOS(e.target.value)}
                >
                  <MenuItem value={"OS Abbr A"}>WOS A</MenuItem>
                  <MenuItem value={"OS Abbr B"}>WOS B</MenuItem>
                  <MenuItem value={"OS Abbr C"}>WOS C</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required Validate style={{marginBottom: 25}} >
                <InputLabel id="modelcomputer">Model Computer</InputLabel>
                <Select
                  labelId="modelcomputer"
                  id="modelcomputer"
                  value={modelcomputer}
                  label="Model Computer"
                  onChange={(e)=>setModelComputer(e.target.value)}
                >
                  <MenuItem value={"Model Type A"}>Model Type A</MenuItem>
                  <MenuItem value={"Model Type B"}>Model Type B</MenuItem>
                  <MenuItem value={"Model Type C"}>Model Type C</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required Validate style={{marginBottom: 25}} >
                <InputLabel id="modelnamelabel">Model Name</InputLabel>
                <Select
                  labelId="modelname"
                  id="modelname"
                  value={modelname}
                  label="Model Name"
                  onChange={(e)=>setModelName(e.target.value)}
                >
                  <MenuItem value={"Model Name A"}>Model Name A</MenuItem>
                  <MenuItem value={"Model Name B"}>Model Name B</MenuItem>
                  <MenuItem value={"Model Name C"}>Model Name C</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required Validate style={{marginBottom: 25}}>
                <InputLabel id="sclversionlabel">SCL Version</InputLabel>
                <Select
                  labelId="sclversionlabelid"
                  id="sclversionid"
                  value={sclversion}
                  label="SCL Version"
                  onChange={(e)=>setSCLVersion(e.target.value)}
                >
                  <MenuItem value={"SCL Version A"}>SCL Version A</MenuItem>
                  <MenuItem value={"SCL Version B"}>SCL Version B</MenuItem>
                  <MenuItem value={"SCL Version C"}>SCL Version C</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required Validate style={{marginBottom: 25}}>
                <InputLabel id="poppnlabel">POP</InputLabel>
                <Select
                  labelId="poplabelid"
                  id="popid"
                  value={pop}
                  label="POP"
                  onChange={(e)=>setPOP(e.target.value)}
                >
                  <MenuItem value={"POP PN A"}>POP PN A</MenuItem>
                  <MenuItem value={"POP PN B"}>POP PN B</MenuItem>
                  <MenuItem value={"POP PN C"}>POP PN C</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required Validate style={{marginBottom: 25}}>
                <InputLabel id="splitlabel">Split</InputLabel>
                <Select
                  labelId="splitlabelid"
                  id="splitid"
                  value={split}
                  label="Split"
                  onChange={(e)=>setSplit(e.target.value)}
                >
                  <MenuItem value={"X"}>X</MenuItem>
                  <MenuItem value={"Y"}>Y</MenuItem>
                </Select>
              </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  )
}