import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInUser, CheckUserName } from '../../services/Auth';
import { Button, TextField, Box, Typography } from '@mui/material';

const SignIn = ({ setUser, prePopulatedUserName }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        userName: prePopulatedUserName || '',
        password: ''
    });
    const [signInError, setSignInError] = useState('');

    const handleChange = (e) => {
        setFormValues(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }));
    };

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
        setFormValues(prevValues => ({ ...prevValues, password: '' }));
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
                Sign in before you dive in
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="signinUserName"
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
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="signinPassword"
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
            {signInError && <p>{signInError}</p>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                    mt: 3, 
                    mb: 2, 
                    backgroundColor: (theme) => theme.palette.warning.main,
                }}
                disabled={!formValues.userName || !formValues.password}
            >
                Sign In
            </Button>
        </Box>
    );
};

export default SignIn;