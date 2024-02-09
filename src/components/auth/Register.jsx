import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../services/Auth';
import { CheckUserName } from '../../services/Auth';

const Register = ({ setAuthForm, setRegisteredUserName }) => {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [userNameError, setUserNameError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setIsTyping(true);
    let value = e.target.value;
    if (e.target.name === 'userName' && /\s/.test(value)) {
      return; // Don't update the userName field if the new value contains spaces
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
            setUserNameError('Username already exists');
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
    const debouncedPasswordValidation = debounce(() => {
      let errors = [];
      if (formValues.password) {
        if (formValues.password.length < 8) {
          errors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(formValues.password)) {
          errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(formValues.password)) {
          errors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[0-9]/.test(formValues.password)) {
          errors.push("Password must contain at least one number.");
        }
        if (formValues.password !== formValues.confirmPassword) {
          errors.push("Passwords must match.");
        }
      }
      setPasswordErrors(errors);
    }, 1000);

    if (isTyping) {
      debouncedPasswordValidation();
    }
  }, [formValues.password, formValues.confirmPassword, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userNameError || passwordErrors.length > 0) {
      return;
    }
    try {
      const registeredUser = await RegisterUser({
        userName: formValues.userName,
        password: formValues.password
      });
      if (registeredUser) {
        setRegisteredUserName(formValues.userName);
        setAuthForm('signin');
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "An unexpected error occurred";
      if (errorMessage.includes("email")) {
        setUserNameError(errorMessage);
      } else {
        setPasswordErrors([errorMessage]);
      }
    }
    setFormValues({
      userName: '',
      password: '',
      confirmPassword: ''
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
          {passwordErrors.map((error, index) => <p key={index}>{error}</p>)}
        </div>
        <button disabled={userNameError || passwordErrors.length > 0}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
