import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listitem";
import Chart from "./chart";
import Deposits from "./deposit";
import Orders from "./orders";
import "./dashboard.css";
import MasterList from './MasterList.jsx';
import DashboardDrawer from './drawer';
function Copyright(props) {
  return (

    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" >
        Deliverd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="dashbody" sx={{
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[100],
    flexGrow: 1,
    maxWidth: "calc(100% - 240px)", // Subtract the width of the drawer
    marginLeft: "240px", // Adjust based on the width of the drawer
    overflow: "auto",
    marginRight:'0px',
  }}>
      
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex", maxWidth: "100%", marginLeft: "2%", marginRight: "-10%", }}>
            <CssBaseline />
            <DashboardDrawer/>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[100],
                flexGrow: 1,
                height: "150vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container style={{ maxWidth: "fit-content" }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={0} lg={9}>
                    <Paper
                      sx={{
                        p: 2,

                        display: "flex",
                        flexDirection: "column",
                        height: 440,
                      }}
                    >
                      <Chart />
                    </Paper>
                  </Grid >
                  {/* Recent Deposits */}

                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 440,
                      
                      }}
                    >
                      <Deposits />
                    </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "460px",
                        overflow: "auto",
                      }}
                    >
                      <MasterList />
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
}
