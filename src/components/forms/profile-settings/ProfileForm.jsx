import { useState, useEffect } from 'react';
import Client from '../../../services/api';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useStore } from '../../../services/store';
import { Alert, Typography, Box, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ProfileForm = () => {

    const { isDirty, setIsDirty } = useStore();

    const { control, register, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            heightUnit: 'cm',
            weightUnit: 'kg'
        }
    });

    const [profileExists, setProfileExists] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const heightUnit = useWatch({
        control,
        name: 'heightUnit',
        defaultValue: 'cm'
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Client.get('/api/profile');
                if (response.data && Object.keys(response.data).length > 0) {
                    setProfileExists(true);
                    Object.keys(response.data).forEach(key => {
                        setValue(key, response.data[key]);
                    });
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [setValue, reset]);

    const handleInputChange = () => {
        if (!isDirty) {
            setIsDirty(true);
        }
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    };

    const onSubmit = async (data) => {
        let profileData = {};

        Object.keys(data).forEach(key => {
            if (data[key] !== '') {
                profileData[key] = data[key];
            }
        });

        try {
            if (profileExists) {
                await Client.put('/api/profile', profileData);
            } else {
                await Client.post('/api/profile', profileData);
                setProfileExists(true);
            }
            setIsDirty(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
                Profile
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="profileFirstName" label="First Name" {...register('firstName')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="profileLastName" label="Last Name" {...register('lastName')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="profileDob" type="date" label="Date of Birth" {...register('dob')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="profileHeightUnit-label">Height Unit</InputLabel>
                            <Controller
                                name="heightUnit"
                                control={control}
                                defaultValue="cm"
                                render={({ field }) => (
                                    <Select id="profileHeightUnit" labelId="profileHeightUnit-label" {...field}>
                                        <MenuItem value="cm">cm</MenuItem>
                                        <MenuItem value="ft/in">ft/in</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {heightUnit === 'cm' ? (
                        <Grid item xs={8}>
                            <TextField id="profileHeightCm" type="number" min="0" step="1" {...register('heightCm')} onChange={handleInputChange} fullWidth />
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={4}>
                                <TextField id="profileHeightFt" type="number" min="0" step="1" placeholder="ft" {...register('heightFt')} onChange={handleInputChange} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="profileHeightIn" type="number" min="0" step="1" placeholder="in" {...register('heightIn')} onChange={handleInputChange} fullWidth />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="profileWeightUnit-label">Weight Unit</InputLabel>
                            <Controller
                                name="weightUnit"
                                control={control}
                                defaultValue="kg"
                                render={({ field }) => (
                                    <Select id="profileWeightUnit" labelId="profileWeightUnit-label" {...field} onChange={handleInputChange}>
                                        <MenuItem value="kg">kg</MenuItem>
                                        <MenuItem value="lbs">lbs</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="profileWeight" type="number" min="0" step="1" {...register('weight')} onChange={handleInputChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="profileAgency-label">Diver Certification Agency</InputLabel>
                            <Controller
                                name="agency"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select id="profileAgency" labelId="profileAgency-label" {...field} onChange={handleInputChange}>
                                        <MenuItem value="PADI">PADI</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="profileDiverNo" label="Diver Certification Number" {...register('diverNo')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="profileInsuranceProvider" label="Dive Insurance Provider" {...register('insuranceProvider')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="profileDiveInsuranceNo" label="Dive Insurance Number" {...register('diveInsuranceNo')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                backgroundColor: (theme) => theme.palette.accent.main,
                                color: (theme) => theme.palette.text.primary,
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.secondary.main,
                                }
                            }}
                        >
                            {profileExists ? 'Update' : 'Submit'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {isSubmitted && (
                <Alert severity="success" fullWidth sx={{ mt: 1}}>Success!</Alert>
            )}
        </Box>
    );
};

export default ProfileForm;