// App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckSession } from './services/Auth'
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Hub from './pages/Hub';
import Footer from './components/Footer';
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
          <Route path="/hub" element={<Hub />} />
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