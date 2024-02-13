import { useEffect } from 'react';
import Client from '../../../services/api';
import { useForm, Controller } from 'react-hook-form';
import { useThemeStore } from '../../../services/store';
import { Box, Button, ToggleButtonGroup, ToggleButton, Typography, Grid, FormControl, FormControlLabel, Switch } from '@mui/material';

const SettingsForm = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const response = await Client.get('/api/settings/');
        for (const key in response.data) {
          setValue(key, response.data[key]);
        }
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    };

    fetchSettingsData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await Client.put('/api/settings/', data);
      setTheme(data.theme);
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
        Settings
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>Color Theme</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name="theme"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value}
                    exclusive
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      setTheme(newValue);
                    }}
                    aria-label="theme"
                  >
                    <ToggleButton value="Blue Hole" aria-label="blue hole">
                      Blue Hole
                    </ToggleButton>
                    <ToggleButton value="Night Dive" aria-label="night dive">
                      Night Dive
                    </ToggleButton>
                    <ToggleButton value="Reef Crest" aria-label="reef crest">
                      Reef Crest
                    </ToggleButton>
                    <ToggleButton value="Kelp Forest" aria-label="kelp forest">
                      Kelp Forest
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="userVisible"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />
              }
              label="Buddies can add me to their dives"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="divesVisible"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />
              }
              label="Buddies can see my dives"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="photosVisible"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />
              }
              label="My dive photos are public by default"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name="measureTemp"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value}
                    exclusive
                    onChange={(event, newValue) => field.onChange(newValue)}
                    aria-label="measureTemp"
                  >
                    <ToggleButton value="C" aria-label="C">
                      C
                    </ToggleButton>
                    <ToggleButton value="F" aria-label="F">
                      F
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name="measureWeight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value}
                    exclusive
                    onChange={(event, newValue) => field.onChange(newValue)}
                    aria-label="measureWeight"
                  >
                    <ToggleButton value="kg" aria-label="kg">
                      kg
                    </ToggleButton>
                    <ToggleButton value="lbs" aria-label="lbs">
                      lbs
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name="measureDepth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value}
                    exclusive
                    onChange={(event, newValue) => field.onChange(newValue)}
                    aria-label="measureDepth"
                  >
                    <ToggleButton value="m" aria-label="m">
                      m
                    </ToggleButton>
                    <ToggleButton value="ft" aria-label="ft">
                      ft
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name="measurePressure"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value}
                    exclusive
                    onChange={(event, newValue) => field.onChange(newValue)}
                    aria-label="measurePressure"
                  >
                    <ToggleButton value="bar" aria-label="bar">
                      bar
                    </ToggleButton>
                    <ToggleButton value="psi" aria-label="psi">
                      psi
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth sx={{ backgroundColor: (theme) => theme.palette.accent.main }}>
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box >
  );
};

export default SettingsForm;