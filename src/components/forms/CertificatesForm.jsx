import { useState, useEffect } from 'react';
import Client from '../../services/api';
import { useForm } from 'react-hook-form';
import { useStore } from '../../services/store';

const CertificatesForm = () => {

  const { isDirty, setIsDirty } = useStore();
  const { register, handleSubmit } = useForm();
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
    <div>
      <h2>Certifications</h2>
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
        <div>
          <label htmlFor="certificationOptions">Certification:</label>
          <select id="certificationOptions" {...register('certificationRequirementId', { required: 'Certification is required' })} onChange={handleInputChange}>
            <option value="">Select Certification</option>
            {certificationOptions.sort((a, b) => a.name.localeCompare(b.name)).map(certification => {
              return (
                <option key={certification.id} value={certification.id}>{certification.name}</option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="certificationIssueDate">Issue Date:</label>
          <input type="date" id="certificationIssueDate" {...register('issueDate')} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="certificationDiveShop">Issuing Dive Shop:</label>
          <input id="certificationDiveShop" {...register('diveShop')} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="certificationLocation">Location:</label>
          <input id="certificationLocation" {...register('location')} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="certificationInstructor">Instructor:</label>
          <input id="certificationInstructor" {...register('instructor')} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="certificationInstructorNo">Instructor Number:</label>
          <input id="certificationInstructorNo" {...register('instructorNo')} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CertificatesForm;
