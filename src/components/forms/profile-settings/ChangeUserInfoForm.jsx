import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../../../services/store';
import { ChangeUserName, ChangeEmail, ChangePassword, CheckUserName, CheckEmail } from '../../../services/Auth';

const ChangeUserInfoForm = () => {

  const { user } = useStore();

  const { handleSubmit, register, control, watch, setValue } = useForm();
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
    <div>
      <div>
        <h2>Update Username, Email, or Password</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="changeNewUserName">New Username</label>
          <Controller
            name="newUserName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                id="changeNewUserName"
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
            {...register('email')}
            onChange={handleChange}
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <div>
          <label htmlFor="changeNewPassword">New Password</label>
          <input
            id="changeNewPassword"
            type="password"
            {...register('newPassword')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="changeConfirmNewPassword">Confirm New Password</label>
          <input
            id="changeConfirmNewPassword"
            type="password"
            name="confirmNewPassword"
            value={formValues.confirmNewPassword}
            onChange={handleChange}
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
        <div>
          <label htmlFor="changeCurrentPassword">Current Password (required to make changes)</label>
          <input
            id="changeCurrentPassword"
            type="password"
            {...register('password', { required: true })}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ChangeUserInfoForm;