import React,{useEffect,useState} from 'react';
import { useHistory,useLocation,useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import HeaderInContent from '../HeaderInContent/HeaderInContent';
import TableDetail from '../TableDetail/TableDetail'
export default function Inbox(){
  let {title} = useParams();
  const User = sessionStorage.getItem("username");
  return(
    <>
    <Sidebar/>
    <HeaderInContent title={title} username={User} />
    <TableDetail subtitle={title}/>
    </>
  )
}