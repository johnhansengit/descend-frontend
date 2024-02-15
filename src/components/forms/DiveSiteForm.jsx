import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../services/store';
import { ft2m } from '../../helpers/conversionUtils';
import Client from '../../services/api';
import { getNames } from 'country-list';
import { Grid, Slider, TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, RadioGroup, Radio, Alert } from '@mui/material';

const DiveSiteForm = ({ onClose }) => {

  const user = useStore(state => state.user);
  const { addDiveSite } = useStore();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [isDiveSiteDuplicate, setIsDiveSiteDuplicate] = useState(false);

  const country = watch('country');
  const name = watch('name');
  const depthUnit = watch('depthUnit');
  const current = watch('current');
  const [depth, setDepth] = useState([0, 40]);
  const [sliderChanged, setSliderChanged] = useState(false);
  const [sliderMax, setSliderMax] = useState(40);

  const [countries, setCountries] = useState([]);

  const handleSliderChange = (event, newValue) => {
    setDepth(newValue);
    setSliderChanged(true);
  };

  useEffect(() => {
    setCountries(getNames());
  }, []);

  useEffect(() => {
    setSliderMax(depthUnit === 'ft' ? 130 : 40);
  }, [depthUnit]);

  useEffect(() => {
    const checkDiveSiteDuplicate = async () => {
      if (country && name) {
        const response = await Client.get(`/api/diveSites/check?country=${country}&name=${name}`);
        if (response.ok) {
          const isDuplicate = await response.json();
          setIsDiveSiteDuplicate(isDuplicate);
        }
      }
    };

    checkDiveSiteDuplicate();
  }, [country, name]);

  const onSubmit = async (data) => {
    try {
      data.minDepth = depth[0];
      data.maxDepth = depth[1];

      if (data.depthUnit === 'ft') {
        data.minDepth = ft2m(data.minDepth);
        data.maxDepth = ft2m(data.maxDepth);
      }

      delete data.depthUnit;
      data.userId = user.id;

      const response = await Client.post('/api/diveSites/add', data);
      const newDiveSite = response.data;
      addDiveSite(newDiveSite);
      onClose();
      reset();

    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 1,
        mb: 1,
        padding: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: (theme) => theme.palette.foreground,
        color: (theme) => theme.palette.text.primary,
        fontFamily: (theme) => theme.typography.fontFamily,
      }}
    >
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
        Add a Dive Site
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="divesiteName"
        label="Dive Site Name"
        name="name"
        autoComplete="name"
        autoFocus
        {...register('name')}
      />
      {errors.name && <Alert severity="error">This field is required</Alert>}
      <FormControl fullWidth margin="normal">
        <InputLabel id="divesiteCountry-label">Country</InputLabel>
        <Select
          labelId="divesiteCountry-label"
          id="divesiteCountry"
          value={country}
          label="Country"
          {...register('country')}
        >
          <MenuItem value="">
            <em>Select country</em>
          </MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors.country && <Alert severity="error">This field is required</Alert>}
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
            <Typography
              id="depth-slider"
              sx={{ color: (theme) => theme.palette.text.main }}
              gutterBottom
            >
              Min/Max Depth of Interest
            </Typography>
            <Slider
              id="divesiteDepth"
              value={depth}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="depth-slider"
              min={0}
              max={sliderMax}
              sx={{
                color: (theme) => sliderChanged ? theme.palette.primary.main : theme.palette.greyed,
              }}
            />
            {errors.minDepth && <Alert severity="error">Minimum depth is required</Alert>}
            {errors.maxDepth && <Alert severity="error">Maximum depth is required</Alert>}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel
              id="divesiteDepthUnit-label"
              sx={{ mt: 2 }}
            >
              Unit
            </InputLabel>
            <Select
              labelId="divesiteDepthUnit-label"
              id="divesiteDepthUnit"
              value={depthUnit}
              label="Depth Unit"
              sx={{ mt: 2 }}
              {...register('depthUnit')}
            >
              <MenuItem value="">
                <em>Select depth unit</em>
              </MenuItem>
              <MenuItem value="m">m</MenuItem>
              <MenuItem value="ft">ft</MenuItem>
            </Select>
          </FormControl>
          {errors.depthUnit && <Alert severity="error">This field is required</Alert>}
        </Grid>
      </Grid>
      <FormControl fullWidth margin="normal">
        <InputLabel id="divesiteCurrent-label">Current</InputLabel>
        <Select
          labelId="divesiteCurrent-label"
          id="divesiteCurrent"
          value={current}
          label="Current"
          {...register('current')}
        >
          <MenuItem value="">
            <em>Select current strength</em>
          </MenuItem>
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="mild">Mild</MenuItem>
          <MenuItem value="moderate">Moderate</MenuItem>
          <MenuItem value="strong">Strong</MenuItem>
        </Select>
      </FormControl>
      {errors.current && <Alert severity="error">This field is required</Alert>}
      <TextField
        margin="normal"
        fullWidth
        id="divesiteDescription"
        label="Description"
        name="description"
        multiline
        rows={4}
        {...register('description')}
      />
      {errors.description && <Alert severity="error">This field is required</Alert>}
      <FormControl component="fieldset" fullWidth margin="normal">
        <RadioGroup row aria-label="salinity" name="salinity" {...register('salinity')}>
          <FormControlLabel value="salt" control={<Radio />} label="Salt" />
          <FormControlLabel value="fresh" control={<Radio />} label="Fresh" />
          <FormControlLabel value="brackish" control={<Radio />} label="Brackish" />
        </RadioGroup>
      </FormControl>
      {errors.salinity && <Alert severity="error">This field is required</Alert>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          mb: 1.5,
          backgroundColor: (theme) => theme.palette.accent.main,
          color: (theme) => theme.palette.text.primary,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.secondary.main,
          }
        }}
        disabled={isDiveSiteDuplicate}
      >
        Submit
      </Button>
      {isDiveSiteDuplicate && <Alert severity="error">A dive site with that name already exists in {country}.</Alert>}
      <Button
        
        variant="contained"
        sx={{
          mb: 2,
          width: '30%',
          backgroundColor: (theme) => theme.palette.warning.main,
          color: (theme) => theme.palette.text.primary,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.secondary.main,
          }
        }}
        onClick={onClose}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default DiveSiteForm;