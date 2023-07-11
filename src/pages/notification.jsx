// import React, { useState, useEffect } from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Button from '@mui/material/Button';


// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showDialog, setShowDialog] = useState(false);
//   const [allRead, setAllRead] = useState(false);

//   useEffect(() => {
//     // Fetch notification data from your API endpoint
//     fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/notif_data')
//       .then((response) => response.json())
//       .then((data) => {
//         const notificationsWithReadProperty = data.map((notification) => ({
//           ...notification,
//           read: false, // Set the read property as false by default
//         }));
//         setNotifications(notificationsWithReadProperty);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     const allNotificationsRead = notifications.every((notification) => notification.read);
//     setAllRead(allNotificationsRead);
//   }, [notifications]);

//   const handleNotificationClick = () => {
//     setShowDialog(true);
//   };

//   const handleDialogClose = () => {
//     setShowDialog(false);
//   };

//   const handleNotificationRead = (notificationId) => {
//     const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
//     setNotifications(updatedNotifications);
//   };

//   const unreadNotifications = notifications.filter((notification) => !notification.read);

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleNotificationClick}>
//         <Badge badgeContent={unreadNotifications.length} color="error">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <Dialog open={showDialog} onClose={handleDialogClose}>
//         <DialogTitle>Notifications</DialogTitle>
//         <DialogContent>
//           {notifications.length === 0 ? (
//             <DialogContentText>All notifications are read.</DialogContentText>
//           ) : (
//             <List>
//               {notifications.map((notification) => (
//                 <ListItem
//                   key={notification.id}
//                   button
//                 >
//                   <Checkbox 
//                     checked={notification.read} 
//                     onChange={() => handleNotificationRead(notification.id)}
//                   />
//                   <ListItemText
//                     primary={notification.title}
//                     secondary={notification.date}
//                     secondaryTypographyProps={{ color: 'textSecondary' }}
//                   />
//                   <DialogContentText>{notification.description}</DialogContentText>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Notification;