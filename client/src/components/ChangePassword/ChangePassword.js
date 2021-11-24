import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './index.css';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Collapse  from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import {createTheme , ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {MyButton,RoundButton2} from '../AllDecoration/AllDecoration';

import {useHistory,useLocation,Link} from 'react-router-dom'
const theme = createTheme();

export default function ChangePassword(){
  //const theme = createTheme
  const history = useHistory();
  const [myname,setMyName] = useState('');
  const [myemail,setMyEmail] = useState('');
  const [mypassword,setMyPassword] = useState('');
  const [confirmpw,setConfirmPW] = useState('');
  const [coincide,setCoinCide] = useState(true);
  const [open,setOpen] = useState(true)
  const AccountSubmit = async (e) => {
    e.preventDefault();
    await axios.get("/apis/v1/allacc",{
      params:{"Name": myname,"Pwd":mypassword}
    }).then((res)=>{
      if(mypassword === confirmpw && res.data.data.Email === myemail ){
        console.log(res.data)
        UpdatePassword(res.data.data.name)
      }else{
        setMyName('');
        setMyPassword('');
        setMyEmail('');
        setConfirmPW('');
        setCoinCide(false);
        console.error()
      }
    })
  }
  
  const UpdatePassword = async (name) => {
    await axios.put("/apis/v1/Update/" + name,{
      "Name": myname,
      "Pwd": mypassword
    },{
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res)=>{
      console.log(res)
      setMyName('');
      setMyEmail('');
      setMyPassword('');
      setConfirmPW('');
      setOpen(true);
      history.push("/")
    }).catch((error)=>{
      console.error(error);
    })
  }

  const classes = RoundButton2();
  return(
    <>
    {coincide ?
    (<div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          
          {/*
          <button className="round-button" onClick={()=>history.push("/")} >
            LogIn
          </button>
          */}
          {/*
          <RoundButton onClick={()=>history.push("/")}>
            LogIn 
          </RoundButton>
          */}
          <div className={classes.rb}>
            <Button onClick={()=>history.push("/")}>
              LogIn
            </Button>
          </div>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box component="form" onSubmit={AccountSubmit} Validate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={myname}
                name="Name"
                autoComplete="Name"
                autoFocus
                onChange={(e)=>{setMyName(e.target.value)}}
              />
              <TextField 
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={myemail}
                name="Email"
                autoComplete="Email"
                autoFocus
                type="text"
                onChange={(e)=>setMyEmail(e.target.value) }
              />
              <TextField 
                margin="normal"
                required
                fullWidth
                id="newpassword"
                name="newpassword"
                label="New Password"
                value={mypassword}
                name="New Password"
                autoComplete="New Password"
                autoFocus
                type="password"
                onChange={(e)=>setMyPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="checkpassword"
                name="checkpassword"
                label="Confirm Password"
                value={confirmpw}
                name="Check Password"
                autoComplete="Confirm Password"
                autoFocus
                type="password"
                onChange={(e) => setConfirmPW(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>) 
    :
    (<div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          {/*
          <button className="round-button" onClick={()=>history.push("/")}>
            LogIn
          </button>
          */}
          <div className={classes.rb}>
            <Button onClick={() => history.push("/")}>
              LogIn
            </Button>
          </div>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box component="form" onSubmit={AccountSubmit} Validate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={myname}
                name="Name"
                autoComplete="Name"
                autoFocus
                onChange={(e)=>{setMyName(e.target.value)}}
              />
              <TextField 
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={myemail}
                name="Email"
                autoComplete="Email"
                autoFocus
                type="text"
                onChange={(e)=>setMyEmail(e.target.value) }
              />
              <TextField 
                margin="normal"
                required
                fullWidth
                id="newpassword"
                name="newpassword"
                label="New Password"
                value={mypassword}
                name="New Password"
                autoComplete="New Password"
                autoFocus
                type="password"
                onChange={(e)=>setMyPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="checkpassword"
                name="checkpassword"
                label="Confirm Password"
                value={confirmpw}
                name="Check Password"
                autoComplete="Confirm Password"
                autoFocus
                type="password"
                onChange={(e) => setConfirmPW(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change
              </Button>
              <Collapse in={open}>
                  <Alert severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                        setOpen(false);
                        }}
                  >
                      <CloseIcon fontSize="inherit" />
                      </IconButton>
                  }
                  sx={{ mb: 2 }}>
                    新密碼確認密碼不符，或email不對
                  </Alert>
                  </Collapse>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>)
    }
    </>
    
    
  )
  
}