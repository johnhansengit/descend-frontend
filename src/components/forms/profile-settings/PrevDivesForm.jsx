import { useState, useEffect } from 'react';
import Client from '../../../services/api';
import { useForm } from 'react-hook-form';

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
        setPrevDivesData(response.data);
        response.data.forEach(dive => {
          setValue(`diveType${dive.diveTypeId}`, dive.previousDives);
        });
      } catch (error) {
        console.error('Error fetching previous dives data:', error);
      }
    };

    fetchDiveTypes();
    fetchPrevDivesData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      if (prevDivesData) {
        await Client.put(`/api/stats/${userId}`, data);
      } else {
        await Client.post(`/api/stats/${userId}`, data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Previous Dives</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Open Water Dives */}
        {diveTypes
          .filter((diveType) => diveType.id === 1)
          .map((diveType) => (
            <div key={diveType.id}>
              <label htmlFor={`diveType-${diveType.id}`}>{diveType.diveType}</label>
              <input
                id={`diveType-${diveType.id}`}
                type="number"
                min="0"
                {...register(`diveType${diveType.id}`, { valueAsNumber: true })}
              />
            </div>
          ))}
        {/* Deep Dives */}
        {diveTypes
          .filter((diveType) => diveType.id === 7)
          .map((diveType) => (
            <div key={diveType.id}>
              <label htmlFor={`diveType-${diveType.id}`}>{diveType.diveType}</label>
              <input
                id={`diveType-${diveType.id}`}
                type="number"
                min="0"
                {...register(`diveType${diveType.id}`, { valueAsNumber: true })}
              />
            </div>
          ))}
        {diveTypes
          .filter((diveType) => diveType.id !== 1 && diveType.id !== 7)
          .sort((a, b) => a.diveType.localeCompare(b.diveType))
          .map((diveType) => (
            <div key={diveType.id}>
              <label htmlFor={`diveType-${diveType.id}`}>{diveType.diveType}</label>
              <input
                id={`diveType-${diveType.id}`}
                type="number"
                min="0"
                {...register(`diveType${diveType.id}`, { valueAsNumber: true })}
              />
            </div>
          ))}
        <button type="submit">{prevDivesData ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default PrevDivesForm;