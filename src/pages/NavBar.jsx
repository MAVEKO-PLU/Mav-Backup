import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar() {
  const navigate = useNavigate();
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationSelect = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    handleNotificationClose();
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#063970" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          MAVEKO
        </Typography>
        <div>
          <Button sx={{ marginLeft: "25px" }} color="inherit" onClick={() => navigate("/master")}>
            Master List
          </Button>
          <Button sx={{ marginLeft: "25px" }} color="inherit" onClick={() => navigate("/customer")}>
            Customer List
          </Button>
          <Button sx={{ marginLeft: "25px" }} color="inherit" onClick={() => navigate("/supplier")}>
            Supplier List
          </Button>
          <IconButton
            color="inherit"
            sx={{
              bgcolor: "red",
              ml: "25px",
              borderRadius: "4px",
              padding: "8px",
              marginRight: "8px",
            }}
            onClick={handleLogout}
          >
            <LogoutIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{
              bgcolor: "black",
              ml: "8px",
              borderRadius: "4px",
              padding: "8px",
            }}
            onClick={handleNotificationClick}
          >
            <NotificationsIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index}>
                  <Typography variant="subtitle2" gutterBottom>
                    {notification.title}
                  </Typography>
                  <Typography variant="body2">{notification.body}</Typography>
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleNotificationClose}>No notifications</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
