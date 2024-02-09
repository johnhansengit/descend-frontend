// App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckSession } from './services/Auth'
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Hub from './pages/Hub';
import ProfileSettings from './pages/ProfileSettings';
import Dives from './pages/Dives';
import LogDive from './pages/LogDive';
import DiveSites from './pages/DiveSites';
import AddDiveSite from './pages/AddDiveSite';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {

  const [user, setUser] = useState(null)
  const [isDirty, setIsDirty] = useState(false);

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)  
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  
  return (
    <>
      {user ? 
        <header>
          <Nav user={user} handleLogOut={handleLogOut}/>
        </header>
        :
        null
      }
      <main>
        <Routes>
        <Route path="/" element={<Landing user={user} setUser={setUser}/>} />
          <Route path="/hub" element={<ProtectedRoute user={user}><Hub /></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute user={user}><ProfileSettings isDirty={isDirty} setIsDirty={setIsDirty} /></ProtectedRoute>} />
          <Route path="/dives" element={<ProtectedRoute user={user}><Dives /></ProtectedRoute>} />
          <Route path="/log-dive" element={<ProtectedRoute user={user}><LogDive isDirty={isDirty} setIsDirty={setIsDirty} /></ProtectedRoute>} />
          <Route path="/dive-sites" element={<ProtectedRoute user={user}><DiveSites /></ProtectedRoute>} />
          <Route path="/add-dive-site" element={<ProtectedRoute user={user}><AddDiveSite isDirty={isDirty} setIsDirty={setIsDirty} /></ProtectedRoute>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;


// stream
// feed
// current
// hover
// sorted
// safetystop
// surfaceinterval
// signal orient regulator time elevate descend