import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../services/store';
import { ChangeUserName, ChangeEmail, ChangePassword, CheckUserName, CheckEmail } from '../../../services/Auth';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const ChangeUserInfoForm = () => {

  const { user } = useStore();

  const { handleSubmit, watch, setValue } = useForm();
  const newUserName = watch('newUserName');
  const [formValues, setFormValues] = useState({
    newUserName: '',
    email: '',
    newPassword: '',
    confirmNewPassword: '',
    password: ''
  });
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [confirmNewPasswordTyped, setConfirmNewPasswordTyped] = useState(false);

  const handleChange = (e) => {
    setIsTyping(true);
    let value = e.target.value;
    if (e.target.name === 'newUserName' && /\s/.test(value)) {
      return;
    }
    if (e.target.name === 'confirmNewPassword') {
      setConfirmNewPasswordTyped(true);
    }
    setFormValues({ ...formValues, [e.target.name]: value });
  };

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  useEffect(() => {
    if (/\s/.test(newUserName)) {
      setFormValues(prevState => ({ ...prevState, newUserName: prevState.newUserName }));
    } else {
      setFormValues(prevState => ({ ...prevState, newUserName }));
    }
  }, [newUserName]);

  useEffect(() => {
    const debouncedUserNameCheck = debounce(async () => {
      if (formValues.newUserName) {
        try {
          const exists = await CheckUserName(formValues.newUserName);
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
  }, [formValues.newUserName, isTyping]);

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
      if (formValues.newPassword) {
        if (formValues.newPassword.length < 8) {
          errors.push("Password's gotta have as many characters as an octopus has legs, dude.");
        }
        if (!/[A-Z]/.test(formValues.newPassword)) {
          errors.push("Okay let's add at leaset one uppercase letter in there, buddy.");
        }
        if (!/[a-z]/.test(formValues.newPassword)) {
          errors.push("No need for shouting, dude. Lowercase letters are your friend.");
        }
        if (!/[0-9]/.test(formValues.newPassword)) {
          errors.push("Safety first. Try adding at least one number, for password strength.");
        }
        if (confirmNewPasswordTyped && formValues.newPassword !== formValues.confirmNewPassword) {
          errors.push("Your new passwords are not buddying up, dude.");
        }
      }
      setPasswordErrors(errors);
    }, 1000);

    if (isTyping) {
      debouncedPasswordValidation();
    }
  }, [confirmNewPasswordTyped, formValues.confirmNewPassword, formValues.newPassword, isTyping]);

  const onSubmit = async (data) => {
    try {
      if (data.newUserName) {
        await ChangeUserName({ userId: user.id, password: data.password, newUserName: data.newUserName });
      }
      if (data.email) {
        await ChangeEmail({ userId: user.id, password: data.password, newEmail: data.email });
      }
      if (data.password && data.newPassword) {
        await ChangePassword({ userId: user.id, password: data.password, newPassword: data.newPassword });
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
    setFormValues({
      newUserName: '',
      email: '',
      newPassword: '',
      confirmNewPassword: '',
      password: ''
    });
    setValue('newUserName', '');
    setValue('email', '');
    setValue('newPassword', '');
    setValue('confirmNewPassword', '');
    setValue('password', '');
  };


  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.foreground,
        color: (theme) => theme.palette.text.primary,
        fontFamily: (theme) => theme.typography.fontFamily,
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
      >
        Update Username or Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        margin="normal"
        fullWidth
        id="changeNewUserName"
        label="New Username"
        name="newUserName"
        autoComplete="username"
        autoFocus
        value={formValues.newUserName}
        onChange={handleChange}
      />
      {userNameError && <Alert severity="error">{userNameError}</Alert>}
      <TextField
        margin="normal"
        fullWidth
        id="changeEmail"
        label="New Email"
        name="email"
        autoComplete="email"
        value={formValues.email}
        onChange={handleChange}
      />
      {emailError && <Alert severity="error">{emailError}</Alert>}
      <TextField
        margin="normal"
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        id="changeNewPassword"
        value={formValues.newPassword}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        id="changeConfirmNewPassword"
        value={formValues.confirmNewPassword}
        onChange={handleChange}
      />
      {passwordErrors.length > 0 && passwordErrors.map((error, index) => (
        <Box width="100%" key={index}>
          <Alert severity="error" >{error}</Alert>
        </Box>
      ))}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Current Password (required to make changes)"
        type="password"
        id="changeCurrentPassword"
        value={formValues.password}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { // Normal state
              borderColor: (theme) => theme.palette.accent.main,
              borderWidth: 3,
            },
            '&:hover fieldset': { // Hover state
              borderColor: (theme) => theme.palette.accent.main,
            },
            '&.Mui-focused fieldset': { // Focused state
              borderColor: (theme) => theme.palette.accent.main,
            },
          },
        }}      
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: (theme) => theme.palette.accent.main,
        }}
        disabled={!formValues.password}
      >
        Update
      </Button>
      </form>
    </Box>
  );
};

export default ChangeUserInfoForm;