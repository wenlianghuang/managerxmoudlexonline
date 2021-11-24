import React from 'react';
import { ListItemButton,ListItemIcon } from '@mui/material';
import { IconButton } from '@material-ui/core';
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { ListItemText } from '@mui/material';
import List from '@mui/material/List';
import {useHistory,useLocation} from 'react-router-dom';
export default function Drawerlistone(){
  const history = useHistory();
  return(
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <IconButton color="primary" onClick={()=>history.push('/Inbox/menubook')} >
            <MenuBookIcon/>
          </IconButton>
        </ListItemIcon>
      <ListItemText primary="Starred" />
      </ListItemButton>
    </List>
  )
}