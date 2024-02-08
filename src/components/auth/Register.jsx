import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../services/Auth'

const Register = ({ setAuthForm, setRegisteredEmail }) => {

  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const registeredUser = await RegisterUser({
      email: formValues.email,
      password: formValues.password
    })
    if (registeredUser) {
      setRegisteredEmail(formValues.email)
      setAuthForm('signin')
    }
    setFormValues({
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerEmail">Email</label>
          <input
            onChange={handleChange}
            id="registerEmail"
            name="email"
            type="email"
            value={formValues.email}
            required
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor="registerPassword">Password</label>
          <input
            onChange={handleChange}
            id="registerPassword"
            type="password"
            name="password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <label htmlFor="registerConfirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            id="registerConfirmPassword"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>
        <button
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.confirmPassword === formValues.password)
          }
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
