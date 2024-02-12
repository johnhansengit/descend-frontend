import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link, Typography, Box } from '@mui/material';
import SignIn from '../components/auth/SignIn';
import Register from '../components/auth/Register';

const Landing = ({ user, setUser }) => {
    let navigate = useNavigate();
    const [authForm, setAuthForm] = useState('signin');
    const [registeredUserName, setRegisteredUserName] = useState('');

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.text.primary,
                fontFamily: (theme) => theme.typography.fontFamily,
            }}
        >
            <Typography
                component="h1"
                variant="h1"
                sx={{
                    fontSize: 'clamp(65px, 9vw, 9vw)',
                    fontWeight: 900,
                    color: (theme) => theme.palette.secondary.main,
                }}
            >
                DESCEND
            </Typography>

            {user ? (
                <Button onClick={() => navigate('/hub')} color="primary">
                    Dive In
                </Button>
            ) : (
                authForm === 'signin' ? (
                    <>
                        <SignIn setUser={setUser} prePopulatedUserName={registeredUserName} />
                        <Box textAlign="center">
                            <Link 
                                underline="none"
                                onClick={() => setAuthForm('register')} variant="body2" color="secondary"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>
                    </>
                ) : (
                    <>
                        <Register setAuthForm={setAuthForm} setRegisteredUserName={setRegisteredUserName} />
                        <Box textAlign="center">
                            <Link
                                underline="none"
                                onClick={() => setAuthForm('signin')} variant="body2" color="secondary"
                            >
                                {"Back to Sign In"}
                            </Link>
                        </Box>
                    </>
                )
            )}
        </Box>
    );
};

export default Landing;