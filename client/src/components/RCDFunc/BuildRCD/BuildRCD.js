import React,{useState,useEffect} from 'react';
import {useHistory,useLocation,useParams} from 'react-router-dom'
import axios from 'axios';

import OnlyforTesting from '../../OnlyforTesting/OnlyforTesting';

import Box from '@mui/material/Box';
import { createTheme, style } from '@mui/system';
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

export default function BuildRCD(){
  const theme = createTheme();
  const [wos,setWOS] = useState("");
  const [modeltype,setModelType] = useState("");
  const [modelname,setModelName] = useState("");
  const [sclversion,setSCLVersion] = useState("");
  const [poppn,setPOPPN] = useState("");
  const [createsuccess,setCreateSuccess] = useState(false);
  const [buildsuccess,setBuildSuccess] = useState(false);
  const history = useHistory();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("WOS: ",wos)
    await axios.post("/rcdfunc/buildrcd",{
      wos: wos,
      modeltype: modeltype,
      modelname: modelname,
      sclversion: sclversion,
      poppn: poppn,
    },
    {
      headers:{
        "Content-Type": "application/json",
      },
    }
    ).then((res)=>{
      console.log(res.data)
      setWOS('');
      setModelType('');
      setModelName('');
      setSCLVersion('');
      setPOPPN('');
      setCreateSuccess(true);
      
    }).catch((error)=>{
      console.error(error)
    })
    
  }
  const handleBatchBuildRCD = (e) => {
    e.preventDefault();


    {
      setWOS('');
      setModelType('');
      setModelName('');
      setSCLVersion('');
      setPOPPN('');
      setBuildSuccess(true);
    }
    console.log("Batch Build CD");
  }
  return(
  <>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                color:"white",
                backgroundColor:"gray"
              }}
            >
              RCD Properties
            </Typography>
            <Box component="form" onSubmit={handleSubmit} Validate sx={{ maxWidth: 500,maxHeight:100,mt:2 }}>
              <div style={{position: 'relative',top:30}}>
                
              <FormControl required Validate fullWidth style={{left:0,marginBottom:25}}>
                <InputLabel id="woslabel">WOS</InputLabel>
                <Select
                  
                  labelId="woslabelid"
                  id="wosid"
                  value={wos}
                  label="WOS"
                  onChange={(e) => setWOS(e.target.value)}
                >
                  <MenuItem value={"WOS A"}>WOS A</MenuItem>
                  <MenuItem value={"WOS B"}>WOS B</MenuItem>
                  <MenuItem value={"WOS C"}>WOS C</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required Validate style={{marginBottom: 25}} >
                <InputLabel id="modeltypelabel">Model Type</InputLabel>
                <Select
                  labelId="modeltype"
                  id="modeltype"
                  value={modeltype}
                  label="Model Type"
                  onChange={(e)=>setModelType(e.target.value)}
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
                  label="Model Type"
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
                <InputLabel id="poppnlabel">POP PN</InputLabel>
                <Select
                  labelId="poppnlabelid"
                  id="poppnid"
                  value={poppn}
                  label="POP PN"
                  onChange={(e)=>setPOPPN(e.target.value)}
                >
                  <MenuItem value={"POP PN A"}>POP PN A</MenuItem>
                  <MenuItem value={"POP PN B"}>POP PN B</MenuItem>
                  <MenuItem value={"POP PN C"}>POP PN C</MenuItem>
                </Select>
              </FormControl>
              </div>

              <ButtonGroup
                orientation="horizontal"
                aria-label="horizontal outlined button group"
                style={{position: 'relative',top:30,left:-30}}
              >
                <Button 
                type="submit"
                variant="contained"
                style={{marginRight:20, width:200,top:30,backgroundColor:"#3498DB",color:"white",borderRadius:10}}
              >
                Create RCD
              </Button>
              <Button 
                type="submit"
                variant="contained"
                style={{marginRight:20, width:200,top:30,backgroundColor:"#3498DB",color:"white",borderRadius:10}}
                onClick={handleBatchBuildRCD}
              >
                Batch Button RCD
              </Button>
              <Button
                type="file"
                component="label"
                style={{width: 200, top: 30,backgroundColor:"#3498DB",color:"white",borderRadius: 10}}
              >
                Upload file
                <input 
                  type="file"
                  hidden
                />
              </Button>
              </ButtonGroup>

              <Collapse in={createsuccess} style={{position: 'fixed',top:75}} >
                <Alert severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setCreateSuccess(false);
                      }}  
                    >
                      <CloseIcon fontSize="inherit" />
                      </IconButton>
                  }
                  sx={{ mb: 2 }}>
                    <AlertTitle>Success</AlertTitle>
                      Create RCD!!!!
                </Alert>
              </Collapse>

              <Collapse in={buildsuccess} style={{position: 'fixed',top:75}} >
                <Alert severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                      setBuildSuccess(false);
                      }}  
                    >
                      <CloseIcon fontSize="inherit" />
                      </IconButton>
                  }
                  sx={{ mb: 2 }}>
                    <AlertTitle>Success</AlertTitle>
                      Batch Build RCD!!!!
                </Alert>
              </Collapse>
            </Box>
          </Box>
    </>
  )
}