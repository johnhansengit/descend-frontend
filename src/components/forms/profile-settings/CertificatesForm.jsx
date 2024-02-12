import { useState, useEffect } from 'react';
import Client from '../../../services/api';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../../../services/store';
import { Typography, Box, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const CertificatesForm = () => {

  const { isDirty, setIsDirty } = useStore();
  const { control, register, handleSubmit } = useForm();
  const [certifications, setCertifications] = useState([]);
  const [certificationOptions, setCertificationOptions] = useState([]);

  const fetchCertifications = async () => {
    try {
      const response = await Client.get('/api/certifications');
      setCertifications(response.data || [])
    } catch (error) {
      console.error('Error fetching certification data:', error);
    }
  };

  const fetchCertificationOptions = async () => {
    try {
      const response = await Client.get('/api/certifications/options');
      setCertificationOptions(response.data)
    } catch (error) {
      console.error('Error fetching certifications options data:', error);
    }
  };

  const deleteCertification = async (id) => {
    try {
      await Client.delete(`/api/certifications/${id}`);
      fetchCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  useEffect(() => {
    fetchCertifications();
    fetchCertificationOptions();
  }, []);

  const handleInputChange = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  const onSubmit = async (data) => {
    let certificationData = {};

    Object.keys(data).forEach(key => {
      if (data[key] !== '') {
        certificationData[key] = data[key];
      }
    });

    try {
      await Client.post('/api/certifications', certificationData);
      setIsDirty(false);
      fetchCertifications();
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
        Certifications
      </Typography>
      <div>
        {certifications
          .sort((a, b) => {
            if (a.issueDate === b.issueDate) {
              return b.id - a.id;
            }
            return new Date(b.issueDate) - new Date(a.issueDate);
          })
          .map(certification => {
            return (
              <div key={certification.id}>
                <p>{certification.CertificationRequirement.name}</p>
                <p>{certification.issueDate}</p>
                <p>{certification.diveShop}</p>
                <p>{certification.instructor}</p>
                <p>{certification.instructorNo}</p>
                <button onClick={() => deleteCertification(certification.id)}>Delete</button>
              </div>
            );
          })}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="certificationOptions-label">Certification</InputLabel>
              <Controller
                name="certificationRequirementId"
                control={control}
                defaultValue=""
                rules={{ required: 'Certification is required' }}
                render={({ field }) => (
                  <Select id="certificationOptions" {...field} onChange={handleInputChange}>
                    <MenuItem value="">Select Certification</MenuItem>
                    {certificationOptions.sort((a, b) => a.name.localeCompare(b.name)).map(certification => {
                      return (
                        <MenuItem key={certification.id} value={certification.id}>{certification.name}</MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField id="certificationIssueDate" type="date" label="Issue Date" {...register('issueDate')} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="certificationDiveShop" label="Issuing Dive Shop" {...register('diveShop')} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField id="certificationLocation" label="Location" {...register('location')} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField id="certificationInstructor" label="Instructor" {...register('instructor')} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField id="certificationInstructorNo" label="Instructor Number" {...register('instructorNo')} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth sx={{ backgroundColor: (theme) => theme.palette.accent.main }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CertificatesForm;
