import React,{useState,useEffect} from 'react';
import './Login.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#26379B',
    height: 48,
    border: '2px solid #f5f5f5',
    borderRadius: '50%',
    padding: '0 30px',
    marginTop: 10,
    '&: hover':{
      background: 'green'
    }
  },
});
export default function Login({setToken}){
  const [myname,setMyName] = useState('');
  const [mypassword,setMyPassword] = useState('');
  const [tokenkey,setTokenKey] = useState('');
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("token");
    if (loggedInUser) {
      return <Redirect to="/dashboard"/>
    }
  }, []);
  const onClickSubmit = async (e) => {
    e.preventDefault()
    /*await axios.get("/person").then((res)=>{
      if(res.data){
        
        for(let i = 0; i < res.data.persons.length;i++){
          console.log(res.data.persons[i].first_name);
          if(res.data.persons[i].first_name === firstname && res.data.persons[i].last_name === lastname){
            setToken(true)
            break;
          }else{
            continue;
          }
        }
      }else{
        console.log("Nothing")
      }
    })*/
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
      sessionStorage.setItem("token",res.data.data.token)
      console.log(res.data.data.token)
      console.log(res.data)
      if(res.data.data.pwd === mypassword){
        return <Redirect to="/dashboard"/>
      }else{
        setToken(false);
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  const classes = useStyles();
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={onClickSubmit}>
        <label>
          <p>Name</p>
          <input type="text" value={myname} onChange={(e)=>setMyName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={mypassword} onChange={(e)=>setMyPassword(e.target.value)} />
        </label>
        <div className={classes.root} >
        <Button>Submit</Button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}