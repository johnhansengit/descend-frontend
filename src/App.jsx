import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeStore, useStore } from './services/store'; // Adjusted import path
import { CheckSession } from './services/Auth';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Hub from './pages/Hub';
import ProfileSettings from './pages/ProfileSettings';
import Dives from './pages/Dives';
import LogDive from './pages/LogDive';
import DiveSites from './pages/DiveSites';
import AddDiveSite from './pages/AddDiveSite';
import DiveSiteDetail from './pages/DiveSiteDetail';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ThemeProvider, Box } from '@mui/material'; // Added Box import
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const App = () => {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const theme = useThemeStore(state => state.theme);

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        position: 'fixed',
        top: 10,
        right: 0,
        zIndex: 1201
      }}>
        {user && <Nav user={user} handleLogOut={handleLogOut} />}
      </Box>
      <main>
        <Routes>
          <Route path="/" element={<Landing user={user} setUser={setUser} />} />
          <Route path="/hub" element={<ProtectedRoute user={user}><Hub /></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute user={user}><ProfileSettings /></ProtectedRoute>} />
          <Route path="/dives" element={<ProtectedRoute user={user}><Dives /></ProtectedRoute>} />
          <Route path="/log-dive" element={<ProtectedRoute user={user}><LogDive /></ProtectedRoute>} />
          <Route path="/dive-sites/add" element={<ProtectedRoute user={user}><AddDiveSite /></ProtectedRoute>} />
          <Route path="/dive-sites/:country/:name" element={<DiveSiteDetail />} />
          <Route path="/dive-sites" element={<ProtectedRoute user={user}><DiveSites /></ProtectedRoute>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  );
};

export default App;
