import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { mainListItems } from './listitem';
import MenuIcon from '@mui/icons-material/Menu';
import './dashboard.css'
import NotificationsIcon from "@mui/icons-material/Notifications";
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: theme.mixins.toolbar.minHeight + 16,
}));

export default function DashboardDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar  style={{backgroundColor:"#2f4f75"}} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Typography textAlign={'center'} className='appbar'>MAVEKO</Typography>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} />
          
          <IconButton sx={{ color: 'white' }} aria-label="open drawer" >
            
            <NotificationsIcon/>
          </IconButton>
          <IconButton sx={{ color: 'white' }} edge="start" aria-label="open drawer" onClick={toggleDrawer}>
            
            <MenuIcon />  
          </IconButton>
        
        </Toolbar>
      </AppBar>
      <Drawer  variant="permanent" open={open}>
        <Toolbar />
        <List component="nav">{mainListItems}</List>
      </Drawer>
      <Content>
        {/* Your main content goes here */}
      </Content>
    </>
  );
}
