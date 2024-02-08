import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../services/Auth';

const Register = ({ setAuthForm, setRegisteredEmail }) => {
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setIsTyping(true);
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
    const debouncedEmailValidation = debounce(() => {
      const regex = /\S+@\S+\.\S+/;
      if (formValues.email && !regex.test(formValues.email)) {
        setEmailError("Valid email required.");
      } else {
        setEmailError('');
      }
    }, 1000);

    if (isTyping) {
      debouncedEmailValidation();
    }
  }, [formValues.email, isTyping]);

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
    if (emailError || passwordErrors.length > 0) {
      return;
    }
    try {
      const registeredUser = await RegisterUser({
        email: formValues.email,
        password: formValues.password
      });
      if (registeredUser) {
        setRegisteredEmail(formValues.email);
        setAuthForm('signin');
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "An unexpected error occurred";
      if (errorMessage.includes("email")) {
        setEmailError(errorMessage);
      } else {
        setPasswordErrors([errorMessage]);
      }
    }
    setFormValues({
      email: '',
      password: '',
      confirmPassword: ''
    });
    setIsTyping(false);
  };
  

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
          {passwordErrors.map((error, index) => <p key={index}>{error}</p>)}
        </div>
        <button disabled={emailError || passwordErrors.length > 0}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
