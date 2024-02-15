import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';

const Nav = ({ handleLogOut, toggleAddDiveSite }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };
  
  const handleAddDiveSiteClick = () => {
    setIsDrawerOpen(false); 
    toggleAddDiveSite(true)();
  };

  return (
    <nav>
      <IconButton
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <ExploreIcon
          sx={{
            fontSize: 40,
            color: (theme) => theme.palette.secondary.main,
          }}
        />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.primary.main,
            fontFamily: (theme) => theme.typography.fontFamily,
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/hub" onClick={toggleDrawer(false)}>
            <ListItemText primary="Hub" />
          </ListItem>
          {/* <ListItem button component={Link} to="/dives" onClick={toggleDrawer(false)}>
            <ListItemText primary="My Dives" />
          </ListItem> */}
          <ListItem button component={Link} to="/log-dive" onClick={toggleDrawer(false)}>
            <ListItemText primary="Log a Dive" />
          </ListItem>
          {/* <ListItem button component={Link} to="/dive-sites" onClick={toggleDrawer(false)}>
            <ListItemText primary="Dive Sites" />
          </ListItem> */}
          <ListItem button onClick={handleAddDiveSiteClick}>
            <ListItemText primary="Add a Dive Site" />
          </ListItem>
          <ListItem button component={Link} to="/profile-settings" onClick={toggleDrawer(false)}>
            <ListItemText primary="Profile & Settings" />
          </ListItem>
          <ListItem button component={Link} to="/" onClick={() => { handleLogOut(); toggleDrawer(false)(); }}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default Nav;