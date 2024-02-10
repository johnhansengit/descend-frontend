import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser, CheckUserName } from '../../services/Auth'

const SignIn = ({ setUser, prePopulatedUserName }) => {
  
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({ 
        userName: prePopulatedUserName || '', 
        password: '' 
    })

    const [signInError, setSignInError] = useState('');

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userNameExists = await CheckUserName(formValues.userName);
            if (!userNameExists) {
                setSignInError("Doesn't look like there's a diver by that username in our group, dude. Try registering first.");
                return;
            }
            const payload = await SignInUser(formValues);
            setUser(payload);
            navigate('/hub');
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "An unexpected error occurred";
            setSignInError(errorMessage);
        }
        setFormValues({ ...formValues, password: '' });
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="signinUserName">User Name</label>
                <input
                    onChange={handleChange}
                    id="signinUserName"
                    name="userName"
                    type="string"
                    value={formValues.userName}
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
            <div>
                {signInError && <p>{signInError}</p>}
            </div>
            <button disabled={!formValues.userName || !formValues.password}>
                Sign In
            </button>
            </form>
        </div>
    )
}

export default SignIn