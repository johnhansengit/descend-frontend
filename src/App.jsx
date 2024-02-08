// App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckSession } from './services/Auth'
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Register from './components/auth/Register';
import SignIn from './components/auth/SignIn';
import Hub from './pages/Hub';
import './App.css';

function App() {

  const [user, setUser] = useState(null)

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
      <header>
        <Nav user={user} handleLogOut={handleLogOut}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/hub" element={<Hub user={user}/>} />
        </Routes>
      </main>
      <footer>
        {/* Footer content */}
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