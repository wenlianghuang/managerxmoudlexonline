import React,{useEffect,useState} from 'react';
import { useHistory,useLocation,useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';


export default function Inbox(){
  let {title} = useParams();
  return(
    <>
    <Sidebar/>
    </>
  )
}