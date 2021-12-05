import React,{useEffect,useState} from 'react';
import { useHistory,useLocation,useParams } from 'react-router-dom';

//import AllDecoration from '../AllDecoration/AllDecoration';
import Sidebar from '../Sidebar/Sidebar';
import HeaderInContent from '../HeaderInContent/HeaderInContent';
import CreatePOP from './CreatePOP/CreatePOP';
import BuildRCD from './BuildRCD/BuildRCD';
import BuildingStatus from './BuildingStatus/BuildingStatus';
import RCDInformation from './RCDInfo/RCDInfo';
export default function RCDFunc(){
  
  let {title} = useParams();
  if(title === "createpop"){
    return(
      <>
        <Sidebar/>
        <CreatePOP/>
      </>
    )
  }else if(title === "buildrcd"){
    return(
      <>
        <Sidebar/>
        <BuildRCD/>
      </>
    )
  }else if(title === "buildingstatus"){
    return(
      <>
        <Sidebar/>
        <BuildingStatus/>
      </>
    )
  }else if(title === "rcdinfo"){
    return(
      <>
        <Sidebar/>
        <RCDInformation/>
      </>
    )
  }
}