import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../../services/Auth'

const SignIn = ({ setUser, prePopulatedEmail }) => {
  
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({ 
        email: prePopulatedEmail || '', 
        password: '' 
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await SignInUser(formValues)
        setFormValues({ email: '', password: '' })
        setUser(payload)
        navigate('/hub')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="signinEmail">Email</label>
                <input
                    onChange={handleChange}
                    id="signinEmail"
                    name="email"
                    type="email"
                    value={formValues.email}
                    required
                    autoComplete='on'
                />
            </div>
            <div>
                <label htmlFor="signinPassword">Password</label>
                <input
                    onChange={handleChange}
                    id="signinPassword"
                    type="password"
                    name="password"
                    value={formValues.password}
                    required
                />
            </div>
            <button disabled={!formValues.email || !formValues.password}>
                Sign In
            </button>
            </form>
        </div>
    )
}

export default SignIn