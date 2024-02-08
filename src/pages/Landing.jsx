import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from '../components/auth/SignIn'
import Register from '../components/auth/Register'

const Landing = ({ user, setUser }) => {

  let navigate = useNavigate()

  const [authForm, setAuthForm] = useState('signin')
  const [registeredEmail, setRegisteredEmail] = useState('');

  return (
    <div>
        <div>
            <h1>DESCEND</h1>
        </div>
        {user ? 
            <div>
                <button onClick={() => navigate('/hub')}>
                    Head to the Hub
                </button>
            </div> 
            : 
            <div>
                {authForm === 'signin' ?
                    <div>
                        <div>
                            <SignIn setUser={setUser} prePopulatedEmail={registeredEmail} />
                        </div>
                        <div>
                            <button onClick={() => setAuthForm('register')}>
                                Click Here To Register
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <Register setAuthForm={setAuthForm} setRegisteredEmail={setRegisteredEmail} />
                    </div>
                }
            </div>
        }
    </div>
  )
}

export default Landing