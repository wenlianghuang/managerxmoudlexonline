import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import {useHistory,useLocation,Link,Redirect} from 'react-router-dom'
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

import allAction from "../../store/action"
import {useSelector,useDispatch} from 'react-redux'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//const theme = createTheme();
export default function Homepage({setToken}){
  const theme = createTheme();
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/dashboard",state: {reload: true} } };
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("token");
    console.log(loggedInUser)
    {loggedInUser ? history.replace(from): history.replace("/")}
    {/*{loggedInUser ? <Navigate to="/dashboard"/> : <Navigate to="/"/>}*/}
  }, []);
  
  const [myname,setMyName] = useState('');
  const [mypassword,setMyPassword] = useState('');
  const [erralert,setErrAlert] = useState(true);
  //const accountUser = useSelector(state => state.login)
  //const accountPassword = useSelector(state => state.password)
  //const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();
      /*const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });*/
    await axios.post("/apis/v1/login",{
      name: myname,
      password: mypassword,
    },
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  ).then((res)=>{
    setMyName('');
    setMyPassword('');
    console.log(res.data)
    sessionStorage.setItem("token",res.data.data.token)
    sessionStorage.setItem("username",res.data.data.name)
    if(res.data.data.pwd === mypassword){
      //sessionStorage.setItem("token",res.data.data.token)
      //dispatch(allAction.loginaccount.addLogInAccount(myname))
      //dispatch(allAction.loginaccount.addLogInPassword(mypassword))
      history.replace(from)
      //return <Redirect to="/dashboard"/>
    }else{
      console.log("error")
      setErrAlert(false);
      
    }
    
  }).catch((error)=>{
      console.log(error)
  })
    
  };
  
  return (
      <>
      {erralert ?(
        <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                value={myname}
                name="name"
                autoComplete="Name"
                autoFocus
                onChange={(e)=>setMyName(e.target.value)}
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
                autoComplete="current-password"
                onChange={(e)=>setMyPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/changepw" variant="body2">
                    {"Forget Password?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      </div>
      ) : ( <div>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                value={myname}
                name="name"
                autoComplete="Name"
                autoFocus
                onChange={(e)=>setMyName(e.target.value)}
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
                autoComplete="current-password"
                onChange={(e)=>setMyPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/changepw" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Alert severity="error" >
          <AlertTitle>Error</AlertTitle>
          Your name or password is error.
        </Alert>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      </div>
      )}
      </>
    );
}