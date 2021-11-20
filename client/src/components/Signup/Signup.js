import React,{useState,useEffect} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import "./index.css";
import Avatar from '@mui/material/Avatar'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert,IconButton,Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
export default function Signup(){
  
  const theme = createTheme();
  
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/",state: {reload: true} } };

  const [myname,setMyName] = useState('');
  const [mypassword,setMyPassword] = useState('');
  const [myemail,setMyEmail] = useState('');
  const [erropen,setErrOpen] = useState(true);
  const [open,setOpen] = useState(true);
  //Circle Round 
  const handleBacktoLogin = async(e) => {
    e.preventDefault();
    history.push("/");
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    await axios.post("/apis/v1/register",{
      name: myname,
      password: mypassword,
      email: myemail,
    },
    {
      headers:{
        "Content-Type":"text/plain",
      },
    }).then((res)=>{
      console.log(res.data);
      setMyName('');
      setMyPassword('');
      setMyEmail('');
      {res.data.status !== -1 ? history.replace(from) : setErrOpen(false) }
    }).catch((error)=>{
      console.log(error)
    })
  }
  return(
    <>
    {erropen ?
    (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <button className="round-button" onClick={handleBacktoLogin}>
            LogIn
          </button>
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
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
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
                name="password"
                label="Password"
                value={mypassword}
                type="password"
                id="password"
                autoComplete="Password"
                onChange={(e)=>{setMyPassword(e.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                value={myemail}
                type="email"
                id="email"
                autoComplete="Email"
                onChange={(e)=>{setMyEmail(e.target.value)}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>):
    (<div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <button className="round-button" onClick={handleBacktoLogin}>
                LogIn
              </button>
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
                  Sign up
                </Typography>
                <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
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
                    name="password"
                    label="Password"
                    value={mypassword}
                    type="password"
                    id="password"
                    autoComplete="Password"
                    onChange={(e)=>{setMyPassword(e.target.value)}}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    value={myemail}
                    type="email"
                    id="email"
                    autoComplete="Email"
                    onChange={(e)=>{setMyEmail(e.target.value)}}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign up
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
                    已經有人註冊，請更換帳號
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