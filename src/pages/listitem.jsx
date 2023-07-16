import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { PriceChange, PriceCheck, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dashboard from './dashboard';
import { useNavigate } from "react-router-dom";
import SchemaIcon from '@mui/icons-material/Schema';

export const mainListItems = (
  <React.Fragment>
    <div style={{marginLeft:'10px'}}>   <ListItemButton component={Link} to="/dash">
      <ListItemIcon style={{ color: '#05184C' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/master">
      <ListItemIcon style={{ color: '#05184C' }}>
        <PriceChange/>
      </ListItemIcon>
      <ListItemText primary="MASTER PRICE LIST" />
    </ListItemButton>
    <ListItemButton component={Link} to="/customer" >
      <ListItemIcon style={{ color: '#05184C' }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="PRICE LIST" />
    </ListItemButton  >
    <ListItemButton component={Link} to="/supplier">
      <ListItemIcon style={{ color: '#05184C' }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="REPORTS" />
    </ListItemButton>
    <ListItemButton component={Link} to="/approval">
      <ListItemIcon style={{ color: '#05184C' }}>
        <PriceCheck />
      </ListItemIcon>
      <ListItemText primary="SEARCH" />
    </ListItemButton>
    <ListItemButton component={Link} to="/validation">
      <ListItemIcon style={{ color: '#05184C' }}>
        <SchemaIcon/>
      </ListItemIcon>
      <ListItemText primary="FORMULA" />
    </ListItemButton></div>
 
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon style={{ color: '#05184C' }}>
        <Search />
      </ListItemIcon>
      <ListItemText primary="SEARCH" />
    </ListItemButton>
  </React.Fragment>
);
