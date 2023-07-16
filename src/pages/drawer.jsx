import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { mainListItems } from './listitem';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import './dashboard.css'
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import Badge from '@mui/material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
  
  const [notifications, setNotifications] = useState([]);
 
  const [allRead, setAllRead] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleNotificationRead = (notificationId) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
    setNotifications(updatedNotifications);
  };  const handleNotificationClick = () => {
    setShowDialog(true);
  };

  const [showDialog, setShowDialog] = useState(false);
  const handleNotification = () => {
    setShowDialog(true);
  };
  const unreadNotifications = notifications.filter((notification) => !notification.read);
  useEffect(() => {
    // Fetch notification data from your API endpoint
    fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/notif_data')
      .then((response) => response.json())
      .then((data) => {
        const notificationsWithReadProperty = data.map((notification) => ({
          ...notification,
          read: false, // Set the read property as false by default
        }));
        setNotifications(notificationsWithReadProperty);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    const allNotificationsRead = notifications.every((notification) => notification.read);
    setAllRead(allNotificationsRead);
  }, [notifications]);
  return (
    <>
      <AppBar  style={{backgroundColor:"#2f4f75"}} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <IconButton sx={{ color: 'white' }} edge="start" aria-label="open drawer" onClick={toggleDrawer}>
            
            <MenuIcon />  
          </IconButton>
        <Typography textAlign={'center'} className='appbar'>MAVEKO</Typography>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} />
         
          <IconButton sx={{ color: 'white' }} aria-label="open notification page"  onClick={handleOpen}  >
            
          <Badge badgeContent={unreadNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
          </IconButton>
          
        
        
        </Toolbar>
      </AppBar>
      <Drawer  variant="permanent" open={open}>
        <Toolbar />
        <List component="nav">{mainListItems}</List>

      </Drawer>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {notifications.length === 0 ? (
            <DialogContentText>All notifications are read.</DialogContentText>
          ) : (
            <List>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  button
                >
                  {/* <Checkbox 
                    checked={notification.read} 
                    onCha
                    nge={() => handleNotificationRead(notification.id)}
                  /> */}
                 
                  <ListItemText
                    primary={notification.title}
                    secondary={notification.date}
                    secondaryTypographyProps={{ color: 'textSecondary' }}
                  />
                  <DialogContentText>{notification.description}</DialogContentText>
                  <IconButton
 sx={{margin:'5px'}}
  aria-label="open notification"
  onClick={() => handleNotificationRead(notification.id)}
>

<VisibilityIcon/>

</IconButton>
                </ListItem>
              ))}
            </List>
          )}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
