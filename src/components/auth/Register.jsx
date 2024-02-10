import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser, CheckUserName, CheckEmail } from '../../services/Auth';

const Register = ({ setAuthForm, setRegisteredUserName }) => {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [confirmPasswordTyped, setConfirmPasswordTyped] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setIsTyping(true);
    let value = e.target.value;
    if (e.target.name === 'userName' && /\s/.test(value)) {
      return; // Don't update the userName field if the new value contains spaces
    }
    if (e.target.name === 'confirmPassword') {
      setConfirmPasswordTyped(true);
    }
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  useEffect(() => {
    const debouncedUserNameCheck = debounce(async () => {
      if (formValues.userName) {
        try {
          const exists = await CheckUserName(formValues.userName);
          if (exists) {
            setUserNameError('Sorry dude, another diver already snagged that handle.');
          } else {
            setUserNameError('');
          }
        } catch (error) {
          console.error('Error checking username:', error);
        }
      }
    }, 1000);

    if (isTyping) {
      debouncedUserNameCheck();
    }
  }, [formValues.userName, isTyping]);

  useEffect(() => {
    const debouncedEmailCheck = debounce(async () => {
      if (formValues.email) {
        try {
          const exists = await CheckEmail(formValues.email);
          if (exists) {
            setEmailError('Weird, that email is already in use. Maybe you already have an account? Try logging in.');
          } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            setEmailError('Invalid email format');
          } else {
            setEmailError('');
          }
        } catch (error) {
          console.error('Error checking email:', error);
        }
      }
    }, 1000);

    if (isTyping) {
      debouncedEmailCheck();
    }
  }, [formValues.email, isTyping]);

  useEffect(() => {
    const debouncedPasswordValidation = debounce(() => {
      let errors = [];
      if (formValues.password) {
        if (formValues.password.length < 8) {
          errors.push("Password's gotta have as many characters as an octopus has legs, dude.");
        }
        if (!/[A-Z]/.test(formValues.password)) {
          errors.push("Okay let's add at leaset one uppercase letter in there, buddy.");
        }
        if (!/[a-z]/.test(formValues.password)) {
          errors.push("No need for shouting, dude. Lowercase letters are your friend.");
        }
        if (!/[0-9]/.test(formValues.password)) {
          errors.push("Safety first. Try adding at least one number, for password strength.");
        }
        if (confirmPasswordTyped && formValues.password !== formValues.confirmPassword) {
          errors.push("Your passwords are not buddying up, dude.");
        }
      }
      setPasswordErrors(errors);
    }, 1000);
  
    if (isTyping) {
      debouncedPasswordValidation();
    }
  }, [formValues.password, formValues.confirmPassword, isTyping, confirmPasswordTyped]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userNameError || passwordErrors.length > 0 || emailError) {
      return;
    }
    try {
      const registeredUser = await RegisterUser({
        userName: formValues.userName,
        password: formValues.password,
        email: formValues.email
      });
      if (registeredUser) {
        setRegisteredUserName(formValues.userName);
        setAuthForm('signin');
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "An unexpected error occurred";
      if (errorMessage.includes("email")) {
        setEmailError(errorMessage);
      } else if (errorMessage.includes("username")) {
        setUserNameError(errorMessage);
      } else {
        setPasswordErrors([errorMessage]);
      }
    }
    setFormValues({
      userName: '',
      password: '',
      confirmPassword: '',
      email: ''
    });
    setIsTyping(false);
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerUserName">User Name</label>
          <input
            onChange={handleChange}
            id="registerUserName"
            name="userName"
            type="string"
            value={formValues.userName}
            required
          />
        </div>
        <div>
          {userNameError && <p>{userNameError}</p>}
        </div>
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
          {emailError && <p>{emailError}</p>}
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
        <div>
          {passwordErrors.length > 0 && (
            <ul>
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <button disabled={userNameError || emailError || passwordErrors.length > 0}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
