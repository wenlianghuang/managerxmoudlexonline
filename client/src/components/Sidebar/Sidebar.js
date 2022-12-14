import React,{useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Source from '@mui/icons-material/Source'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Navigationbar from '../Navigationbar/Navigationbar';
import { MyLogo } from '../AllDecoration/AllDecoration';
import {useHistory,useLocation} from 'react-router-dom';
import backgroundimg from '../../imginsrc/react-golang.jpg'
import acerlogo from '../../imginsrc/acerlogo.gif';
import './DrawerList/Drawerlistone';
import MenuBook from '@mui/icons-material/MenuBook';
import BuildOfflineRCD from '../BuildOfflineRCD/BuildOfflineRCD';
const drawerWidth = 240;

export default function Sidebar(){
  const [mobileOpen,setMobileOpen] = useState(false);
  //const [open, setOpen] = useState(true);
  const [rcdfuncopen,setRCDFuncOpen] = useState(false);
  const [inboxopen,setInboxOpen] = useState(false);
  const handleRCDFuncClick = (e) => {
    //setOpen(!open);
    e.preventDefault();
    setRCDFuncOpen(!rcdfuncopen);
  };
  const handleInboxClick = (e) => {
    e.preventDefault();
    setInboxOpen(!inboxopen);
  }
  const history = useHistory();
  let title = "menubook";
  
  const classes = MyLogo();
  return(
    <>
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(128deg, rgba(10,153,33,1) 7%, rgba(253,187,45,1) 100%);',
          height:55,
        }}>
          <Toolbar>
            <img
              src={backgroundimg}
              className={classes.logo}
              alt="Slider"
            />
            <img 
              src={acerlogo}
              className={classes.logo}
              alt="Acer"
              style={{
                position: "relative",
                height:45,
                width:220,
                left:500,
              }}
            />
            {/*
            <Typography variant="h3" noWrap component="div" sx={{
              fontFamily: 'Brush Script',
              position: "relative",
              left: 300,
            }}>
              Acer
            </Typography>
          */}
            <Navigationbar/>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            
          >
            <ListItemButton >
              <ListItemIcon>
                  <Source onClick={()=>history.push("/dashboard")} />
              </ListItemIcon>
            <ListItemText primary="HomePage" />
          </ListItemButton>
          <Divider component="li" style={{borderBottomWidth:0.5,background:"green"}}/>
          <ListItemButton onClick={()=>history.push("/buildofflinercd")}>
            <ListItemIcon>
              <Source />
            </ListItemIcon>
            <ListItemText primary="Build Offline RCD"/>
          </ListItemButton>
          <Divider component="li" style={{borderBottomWidth:0.5, background:"green"}}/>
          <ListItemButton onClick={handleRCDFuncClick}>
            <ListItemIcon>
              <Source/>
            </ListItemIcon>
          <ListItemText primary="RCD Function"/>
          {rcdfuncopen ? <ExpandLess/> : <ExpandMore/> }
          </ListItemButton>
          <Collapse in={rcdfuncopen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4}} onClick={()=>history.push("/RCDFunc/createpop")} >
                <ListItemIcon>
                  <IconButton color="primary" >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
              <ListItemText primary="Create POP"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4}} onClick={()=>history.push("/RCDFunc/buildrcd")} >
                <ListItemIcon>
                  <IconButton color="primary" >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
              <ListItemText primary="Build RCD"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4}} onClick={()=>history.push("/RCDFunc/buildingstatus")} >
                <ListItemIcon>
                  <IconButton color="primary"  >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
              <ListItemText primary="Building Status"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4}} onClick={()=>history.push("/RCDFunc/rcdinfo")} >
                <ListItemIcon>
                  <IconButton color="primary" >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
              <ListItemText primary="RCD Information"/>
              </ListItemButton>
            </List>
          </Collapse>
          <Divider style={{borderBottomWidth:0.5, background:"green"}}/>
          <ListItemButton onClick={handleInboxClick}>
            <ListItemIcon>
              <Source />
            </ListItemIcon>
          <ListItemText primary="Inbox" />
            {inboxopen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={inboxopen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>history.push(`/Inbox/${title}`)}>
                <ListItemIcon>
                  <IconButton color="primary"  >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>history.push('/Inbox/test2')}>
                <ListItemIcon>
                  <IconButton color="primary"  >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Test2" />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider style={{borderBottomWidth:0.5,background:"green"}}/>
          <ListItemButton onClick={()=>history.push("/upload")}>
            <ListItemIcon>
              <Source />
            </ListItemIcon>
            <ListItemText primary="Upload File"/>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  </Box>
  
  </>
  )
}