import { useState, useEffect } from 'react';
import Client from '../../../services/api';
import { useForm } from 'react-hook-form';
import { Typography, Box, Grid, TextField, Button } from '@mui/material';

const PrevDivesForm = ({ userId }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [diveTypes, setDiveTypes] = useState([]);
  const [prevDivesData, setPrevDivesData] = useState(null);

  useEffect(() => {
    const fetchDiveTypes = async () => {
      try {
        const response = await Client.get('/api/diveTypes');
        setDiveTypes(response.data);
      } catch (error) {
        console.error('Error fetching dive types:', error);
      }
    };

    const fetchPrevDivesData = async () => {
      try {
        const response = await Client.get('/api/stats/');
        if (response.data && Object.keys(response.data).length > 0) {
          setPrevDivesData(response.data);
          response.data.forEach(dive => {
            setValue(`diveType-${dive.diveTypeId}`, dive.previousDives || 0);
          });
        }
      } catch (error) {
        console.error('Error fetching previous dives data:', error);
      }
    };

    fetchDiveTypes();
    fetchPrevDivesData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    const formattedData = Object.keys(data).map(key => {
      const diveTypeId = parseInt(key.replace('diveType-', ''), 10);
      return {
        diveTypeId,
        previousDives: data[key],
      };
    });

    try {
      if (prevDivesData) {
        await Client.put('/api/stats/', formattedData);
      } else {
        await Client.post('/api/stats/', formattedData);
      }
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
        Previous Dives
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Open Water Dives */}
          {diveTypes
            .filter((diveType) => diveType.id === 1)
            .map((diveType) => (
              <Grid item xs={6} key={diveType.id}>
                <TextField
                  id={`diveType-${diveType.id}`}
                  label={diveType.diveType}
                  type="number"
                  min="0"
                  fullWidth
                  {...register(`diveType-${diveType.id}`, { valueAsNumber: true })}
                />
              </Grid>
            ))}
          {/* Deep Dives */}
          {diveTypes
            .filter((diveType) => diveType.id === 7)
            .map((diveType) => (
              <Grid item xs={6} key={diveType.id}>
                <TextField
                  id={`diveType-${diveType.id}`}
                  label={diveType.diveType}
                  type="number"
                  min="0"
                  fullWidth
                  {...register(`diveType-${diveType.id}`, { valueAsNumber: true })}
                />
              </Grid>
            ))}
          {diveTypes
            .filter((diveType) => diveType.id !== 1 && diveType.id !== 7 && diveType.id !== 24)
            .sort((a, b) => a.diveType.localeCompare(b.diveType))
            .map((diveType) => (
              <Grid item xs={4} key={diveType.id}>
                <TextField
                  id={`diveType-${diveType.id}`}
                  label={diveType.diveType}
                  type="number"
                  min="0"
                  fullWidth
                  {...register(`diveType-${diveType.id}`, { valueAsNumber: true })}
                />
              </Grid>
            ))}
          <Grid item xs={12}>
            <Button type="submit" fullWidth sx={{ backgroundColor: (theme) => theme.palette.accent.main }}>
              {prevDivesData ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PrevDivesForm;