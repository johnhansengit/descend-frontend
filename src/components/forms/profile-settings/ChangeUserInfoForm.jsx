import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ChangeUserName, ChangeEmail, ChangePassword, CheckUserName, CheckEmail } from '../../../services/Auth';

const ChangeUserInfoForm = () => {
  const { handleSubmit, register, control, watch } = useForm();
  const userName = watch('userName');
  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    newPassword: '',
    email: ''
  });
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setIsTyping(true);
    let value = e.target.value;
    if (e.target.name === 'userName' && /\s/.test(value)) {
      return; // Don't update the userName field if the new value contains spaces
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
    if (/\s/.test(userName)) {
      setFormValues(prevState => ({ ...prevState, userName: prevState.userName }));
    } else {
      setFormValues(prevState => ({ ...prevState, userName }));
    }
  }, [userName]);

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
      }
      setPasswordErrors(errors);
    }, 1000);

    if (isTyping) {
      debouncedPasswordValidation();
    }
  }, [formValues.newPassword, isTyping]);

  const onSubmit = async (data) => {
    try {
      if (data.userName) {
        await ChangeUserName(data.userName);
      }
      if (data.email) {
        await ChangeEmail(data.email);
      }
      if (data.password && data.newPassword) {
        await ChangePassword(data.password, data.newPassword);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Update Username, Email, or Password</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="changeUserName">New Username</label>
          <Controller
            name="userName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <input
                id="changeUserName"
                type="text"
                {...field}
                onChange={(e) => {
                  if (!/\s/.test(e.target.value)) {
                    field.onChange(e);
                  }
                }}
              />
            )}
          />
          {userNameError && <p>{userNameError}</p>}
        </div>
        <div>
          <label htmlFor="changeEmail">New Email</label>
          <input
            id="changeEmail"
            type="email"
            {...register('email', { required: true })}
            onChange={handleChange}
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <div>
          <label htmlFor="changeCurrentPassword">Current Password (required to make changes)</label>
          <input
            id="changeCurrentPassword"
            type="password"
            {...register('password', { required: true })}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="changeNewPassword">New Password</label>
          <input
            id="changeNewPassword"
            type="password"
            {...register('newPassword', { required: true })}
            onChange={handleChange}
          />
          {passwordErrors.length > 0 && (
            <ul>
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ChangeUserInfoForm;