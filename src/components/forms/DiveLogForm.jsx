import { useState, useEffect, useCallback } from 'react';
import Client from '../../services/api';
import { useForm } from 'react-hook-form';
import { useStore } from '../../services/store';
import { FormLabel, RadioGroup, Radio, Typography, Box, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Slider, Checkbox, CircularProgress } from '@mui/material';

const DiveLogForm = ({ editMode, diveLogId }) => {

  const { isDirty, setIsDirty } = useStore();
  const { register, handleSubmit, setValue, watch } = useForm();

  const salinity = watch('salinity');
  const wetsuitThickness = watch('wetsuitThickness');
  const gas = watch('gas');
  const tank = watch('tank');

  const [loading, setLoading] = useState(false)

  const [diveLogExists, setDiveLogExists] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [temperature, setTemperature] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [suitType, setSuitType] = useState('wetsuit');

  const [tempSliderChanged, setTempSliderChanged] = useState(false);
  const [visibilitySliderChanged, setVisibilitySliderChanged] = useState(false);
  const [isWetsuitThicknessVisible, setIsWetsuitThicknessVisible] = useState(true);

  const [maxDepthUnit, setMaxDepthUnit] = useState();
  const [visibilityUnit, setVisibilityUnit] = useState();
  const [airUnit, setAirUnit] = useState();
  const [tempUnit, setTempUnit] = useState();
  const [diveWeightUnit, setDiveWeightUnit] = useState();

  const fetchDiveLog = useCallback(async (id) => {
    try {
      const response = await Client.get(`/api/diveLogs/${id}`);
      if (response.data && Object.keys(response.data).length > 0) {
        setDiveLogExists(true);
        Object.keys(response.data).forEach(key => {
          setValue(key, response.data[key]);
        });
      }
    } catch (error) {
      console.error('Error fetching dive log data:', error);
    }
  }, [setValue]);

  const fetchUserSettings = useCallback(async () => {
    setLoading(true)
    try {
      const response = await Client.get('/api/settings');
      if (response.data) {
        const { measureDepth, measurePressure, measureTemp, measureWeight } = response.data;

        console.log('preset: ', measureDepth, measurePressure, measureTemp, measureWeight)

        setMaxDepthUnit(measureDepth);
        setVisibilityUnit(measureDepth);
        setAirUnit(measurePressure);
        setTempUnit(measureTemp);
        setDiveWeightUnit(measureWeight);

        console.log('postset: ', maxDepthUnit, visibilityUnit, airUnit, tempUnit, diveWeightUnit)
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (editMode && diveLogId) {
        await fetchDiveLog(diveLogId);
      } else {
        await fetchUserSettings();
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleInputChange = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleTempSliderChange = (event, newValue) => {
    setTemperature(newValue);
    setTempSliderChanged(true);
    handleInputChange();
  };

  const handleVisibilitySliderChange = (event, newValue) => {
    setVisibility(newValue);
    setVisibilitySliderChanged(true);
    handleInputChange();
  }

  const handleSuitTypeChange = (event) => {
    const newValue = event.target.value;
    setSuitType(newValue);
    if (newValue === 'wetsuit') {
      setIsWetsuitThicknessVisible(true);
    } else {
      setIsWetsuitThicknessVisible(false);
    }
    handleInputChange();
  }

  const onSubmit = async (data) => {
    let diveLogData = {};

    Object.keys(data).forEach(key => {
      if (data[key] !== '') {
        diveLogData[key] = data[key];
      }
    });

    if (!tempSliderChanged) {
      delete diveLogData.temperature;
    }
    if (!visibilitySliderChanged) {
      delete diveLogData.visibility;
    }

    try {
      if (diveLogExists) {
        await Client.put('/api/diveLogs', diveLogData);
      } else {
        await Client.post('/api/diveLogs', diveLogData);
        setDiveLogExists(true);
      }
      setIsDirty(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      {
        loading === false ?

          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.foreground,
              color: (theme) => theme.palette.text.primary,
              fontFamily: (theme) => theme.typography.fontFamily,
              p: 3,
              borderRadius: 2,
            }
            }
          >
            <Typography
              variant="h4"
              sx={{ mb: 2 }}
            >
              Log Dive
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField id="logDiveDate" type="date" label="Date" {...register('date', { required: true })} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="logDiveTimeIn" type="time" label="Time In" {...register('timeIn', { required: true })} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="logDiveTimeOut" type="time" label="Time Out" {...register('timeOut', { required: true })} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Dive</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField id="logDiveMaxDepth" type="number" min="0" step="1" label="Max Depth" {...register('maxDepth', { required: true, valueAsNumber: true, min: { value: 0, message: 'Max Depth must be a positive number.' } })}
                    onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="logDiveMaxDepthUnit-label">Unit</InputLabel>
                    <Select
                      id="logMaxDepthUnit"
                      labelId="logMaxDepthUnit-label"
                      label="Max Depth Unit"
                      {...register('maxDepthUnit')}
                      defaultValue={maxDepthUnit}
                      onChange={handleInputChange}>
                      <MenuItem value="m">m</MenuItem>
                      <MenuItem value="ft">ft</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField id="logDiveAirStart" type="number" min="0" step="1" label="Air Start" {...register('airStart', { valueAsNumber: true, min: { value: 0, message: 'Air Start must be a positive number.' } })}
                    onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <TextField id="logDiveAirEnd" type="number" min="0" step="1" label="Air End" {...register('airEnd', { valueAsNumber: true, min: { value: 0, message: 'Air End must be a positive number.' }, validate: value => value <= watch('airStart') || 'Air End must be less than or equal to Air Start.' })}
                    onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="logDiveAirUnit-label">Unit</InputLabel>
                    <Select
                      id="logDiveAirUnit"
                      labelId="logDiveAirUnit-label"
                      label="Air Unit"
                      {...register('airUnit')}
                      defaultValue={airUnit}
                      onChange={handleInputChange}>
                      <MenuItem value="bar">bar</MenuItem>
                      <MenuItem value="psi">psi</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox {...register('safetyStop')} onChange={handleInputChange} />}
                    label="Safety Stop"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox {...register('deco')} onChange={handleInputChange} />}
                    label="Deco"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Gas & Equipment</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField id="logDiveDiveWeight" type="number" min="0" step="1" label="Dive Weight" {...register('diveWeight', { valueAsNumber: true, min: { value: 0, message: 'Dive Weight must be a positive number.' } })}
                    onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="logDiveDiveWeightUnit-label">Unit</InputLabel>
                    <Select
                      id="logDiveWeightUnit"
                      labelId="logDiveWeightUnit-label"
                      label="Dive Weight Unit"
                      {...register('diveWeightUnit')}
                      defaultValue={diveWeightUnit}
                      onChange={handleInputChange}>
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="lbs">lbs</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="logGas-label">Gas</InputLabel>
                    <Select
                      id="logGas"
                      labelId="logGas-label"
                      label="Gas"
                      value={gas}
                      defaultValue="air"
                      onChange={handleInputChange}>
                      <MenuItem value="air">air</MenuItem>
                      <MenuItem value="Nitrox">Nitrox</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <InputLabel id="logTank-label">Tank</InputLabel>
                    <Select
                      id="logTank"
                      labelId="logTank-label"
                      label="Tank"
                      value={tank}
                      defaultValue={"Aluminum 11.1L/80 cu.ft."}
                      onChange={handleInputChange}>
                      <MenuItem value="Steel 15.0L/125 cu.ft.">Steel 15.0L/125 cu.ft.</MenuItem>
                      <MenuItem value="Steel 12.2L/100 cu.ft.">Steel 12.2L/100 cu.ft.</MenuItem>
                      <MenuItem value="Aluminum 11.1L/80 cu.ft.">Aluminum 11.1L/80 cu.ft.</MenuItem>
                      <MenuItem value="Steel 10.5L/85 cu.ft.">Steel 10.5L/85 cu.ft.</MenuItem>
                      <MenuItem value="Aluminum 5.7L/40 cu.ft.">Aluminum 5.7L/40 cu.ft.</MenuItem>
                      <MenuItem value="Steel 3L/25 cu.ft.">Steel 3L/25 cu.ft.</MenuItem>
                      <MenuItem value="Aluminum 2.7L/19 cu.ft.">Aluminum 2.7L/19 cu.ft.</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox {...register('backPlate')} onChange={handleInputChange} />}
                    label="Back Plate"
                    sx={{ mt: 1, ml: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="logDiveSuitType-label">Suit Type</InputLabel>
                    <Select
                      id="logDiveSuitType"
                      labelId="logDiveSuitType-label"
                      label="Dive Suit"
                      value={suitType}
                      defaultValue={"wetsuit"}
                      onChange={handleSuitTypeChange}>
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="rashguard">Rashguard</MenuItem>
                      <MenuItem value="wetsuit">Wetsuit</MenuItem>
                      <MenuItem value="drysuit">Drysuit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {isWetsuitThicknessVisible && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="logDiveWetsuitThickness-label">Wetsuit Thickness</InputLabel>
                      <Select
                        id="logDiveWetsuitThickness"
                        labelId="logDiveWetsuitThickness-label"
                        label="Wetsuit Thickness"
                        value={wetsuitThickness}
                        defaultValue={"5mm"}
                        onChange={handleInputChange}>
                        <MenuItem value="2mm">2mm</MenuItem>
                        <MenuItem value="3mm">3mm</MenuItem>
                        <MenuItem value="4mm">4mm</MenuItem>
                        <MenuItem value="5mm">5mm</MenuItem>
                        <MenuItem value="6mm">6mm</MenuItem>
                        <MenuItem value="7mm">7mm</MenuItem>
                        <MenuItem value="8mm">8mm</MenuItem>
                        <MenuItem value="9mm">9mm</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="h6">Conditions</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id="temperature-slider"
                    sx={{ color: (theme) => theme.palette.text.main }}
                    gutterBottom
                  >
                    Temperature
                  </Typography>
                  <Slider
                    id="logDiveTemp"
                    aria-labelledby="temperature-slider"
                    value={temperature}
                    min={0}
                    max={tempUnit === 'C' ? 30 : 90}
                    step={1}
                    {...register('temp')}
                    onChange={handleTempSliderChange}
                    valueLabelDisplay="auto"
                    sx={{
                      ml: 1,
                      color: (theme) => tempSliderChanged ? theme.palette.primary.main : theme.palette.greyed,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ mt: 2, ml: 2 }} id="logDiveTempUnit-label">Unit</InputLabel>
                    <Select
                      id="logDiveTempUnit"
                      labelId="logDiveTempUnit-label"
                      label="Temp Unit"
                      {...register('tempUnit')}
                      defaultValue={tempUnit}
                      sx={{ mt: 2, ml: 2 }}
                      onChange={handleInputChange}>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    id="visibility-slider"
                    sx={{ color: (theme) => theme.palette.text.main }}
                    gutterBottom
                  >
                    Visibility
                  </Typography>
                  <Slider
                    id="logDiveVisibility"
                    aria-labelledby="visibility-slider"
                    value={visibility}
                    min={0}
                    max={visibilityUnit === 'ft' ? 130 : 40}
                    step={5}
                    {...register('visibility')}
                    onChange={handleVisibilitySliderChange}
                    valueLabelDisplay="auto"
                    sx={{
                      ml: 1,
                      color: (theme) => visibilitySliderChanged ? theme.palette.primary.main : theme.palette.greyed,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ mt: 2, ml: 2 }} id="logDiveVisibilityUnit-label">Unit</InputLabel>
                    <Select
                      id="logDiveVisibilityUnit"
                      labelId="logDiveVisibilityUnit-label"
                      label="Vis Unit"
                      {...register('visibilityUnit')}
                      defaultValue={visibilityUnit}
                      sx={{ mt: 2, ml: 2 }}
                      onChange={handleInputChange}>
                      <MenuItem value="m">m</MenuItem>
                      <MenuItem value="ft">ft</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" id="logSalinity-label">Salinity</FormLabel>
                    <RadioGroup
                      aria-labelledby="logSalinity-label"
                      id="logSalinity"
                      value={salinity}
                      row
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="salt" control={<Radio />} label="Salt" />
                      <FormControlLabel value="fresh" control={<Radio />} label="Fresh" />
                      <FormControlLabel value="brackish" control={<Radio />} label="Brackish" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Notes</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="logDiveDescription"
                    label="Description"
                    {...register('description')}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth sx={{ backgroundColor: (theme) => theme.palette.accent.main }}>
                    {diveLogExists ? 'Update' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </form>
            {
              isSubmitted && (
                <div>
                  Dive Log Updated!
                </div>
              )
            }
          </Box >
          :
          <Box >
            <CircularProgress />
          </Box>
      }
    </>
  );
};

export default DiveLogForm;