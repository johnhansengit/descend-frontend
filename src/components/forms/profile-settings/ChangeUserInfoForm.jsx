import { useForm } from 'react-hook-form';
import { ChangeUserName, ChangeEmail, ChangePassword } from '../../../services/Auth';

const ChangeUserInfoForm = () => {
  const { register, handleSubmit, errors } = useForm();

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
          <label htmlFor="userName">New Username</label>
          <input
            name="userName"
            ref={register({ required: false })}
          />
        </div>
        <div>
          <label htmlFor="email">New Email</label>
          <input
            name="email"
            ref={register({ required: false, pattern: /\S+@\S+\.\S+/ })}
          />
          {errors.email && <p>Invalid email format</p>}
        </div>
        <div>
          <label htmlFor="password">Current Password (required to make changes)</label>
          <input
            name="password"
            type="password"
            ref={register({ required: false })}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            name="newPassword"
            type="password"
            ref={register({ required: false })}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ChangeUserInfoForm;