import React,{useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import Source from '@mui/icons-material/Source'
import TextSnippet from '@mui/icons-material/TextSnippet'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Navigationbar from '../Navigationbar/Navigationbar';
import { MyLogo } from '../AllDecoration/AllDecoration';
import {useHistory,useLocation} from 'react-router-dom';
//import { Container } from '@material-ui/core';
import Container from '@mui/material/Container'
import backgrounimg from '../../imginsrc/react-golang.jpg'
import './DrawerList/Drawerlistone'
import Drawerlistone from './DrawerList/Drawerlistone';
const drawerWidth = 240;

export default function Sidebar(){
  const [mobileOpen,setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
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
          background: 'linear-gradient(128deg, rgba(10,153,33,1) 7%, rgba(253,187,45,1) 100%);' 
        }}>
          <Toolbar>
            <img
              src={backgrounimg}
              className={classes.logo}
              alt="Slider"
            />
            <Typography variant="h3" noWrap component="div" sx={{
              fontFamily: 'Brush Script',
              position: "relative",
              left: 300,
            }}>
              Acer
            </Typography>
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
            subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                  <Source onClick={()=>history.push("/dashboard")} />
              </ListItemIcon>
            <ListItemText primary="HomePage" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Source />
            </ListItemIcon>
          <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Source />
            </ListItemIcon>
          <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <IconButton color="primary" onClick={()=>history.push(`/Inbox/${title}`)} >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <IconButton color="primary" onClick={()=>history.push('/Inbox/test2')} >
                    <MenuBookIcon/>
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Test2" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  </Box>
  
  </>
  )
}