import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser, CheckUserName, CheckEmail } from '../../services/Auth';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';

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
    let { name, value } = e.target;
  
    if (name === 'userName') {
      setUserNameError('');
      if (/\s/.test(value)) {
        return; 
      }
    } else if (name === 'email') {
      setEmailError('');
    } else if (name === 'password' || name === 'confirmPassword') {
      setPasswordErrors([]);
      if (name === 'confirmPassword') {
        setConfirmPasswordTyped(true);
      }
    }
  
    setFormValues({ ...formValues, [name]: value });
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
    }, 2000);

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
    }, 2000);

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
    }, 2000);

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
    <Box
      component="form"
      minWidth="max(30vw, 300px)"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        mb: 1,
        padding: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.foreground,
        color: (theme) => theme.palette.text.primary,
        fontFamily: (theme) => theme.typography.fontFamily,
      }}
    >
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
        Register
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="registerUserName"
        label="User Name"
        name="userName"
        autoComplete="username"
        autoFocus
        value={formValues.userName}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
          },
        }}
      />
      <Box width="100%">
        {userNameError && <Alert severity="error">{userNameError}</Alert>}
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="registerEmail"
        label="Email"
        name="email"
        autoComplete="email"
        value={formValues.email}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
          },
        }}
      />
      <Box width="100%">
        {emailError && <Alert severity="error">{emailError}</Alert>}
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="registerPassword"
        value={formValues.password}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="registerConfirmPassword"
        value={formValues.confirmPassword}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.warning.main,
            },
          },
        }}
      />
      {passwordErrors.length > 0 && passwordErrors.map((error, index) => (
        <Box width="100%" key={index}>
          <Alert severity="error" >{error}</Alert>
        </Box>
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: (theme) => theme.palette.warning.main,
        }}
        disabled={!formValues.userName || !formValues.email || !formValues.password || !formValues.confirmPassword || userNameError || emailError || passwordErrors.length > 0}
        >
        Register
      </Button>
    </Box>
  );
};

export default Register;
