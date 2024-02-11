import { Link } from 'react-router-dom';

const Nav = ({ handleLogOut }) => {

  return (
    <nav>
      <ul>
        <li><Link to="/hub">Hub</Link></li>
        <li><Link to="/dives">My Dives</Link></li>
        <li><Link to="/log-dive">Log a Dive</Link></li>
        <li><Link to="/dive-sites">Dive Sites</Link></li>
        <li><Link to="/dive-sites/add">Add a Dive Site</Link></li>
        <li><Link to="/profile-settings">Profile & Settings</Link></li>
        <li><Link onClick={handleLogOut} to="/">Sign Out</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
