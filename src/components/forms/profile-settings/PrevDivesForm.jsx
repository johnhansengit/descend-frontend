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
    <div>
      <div>
        <h2>Previous Dives</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Open Water Dives */}
        {diveTypes
          .filter((diveType) => diveType.id === 1)
          .map((diveType) => (
            <div key={diveType.id}>
              <label htmlFor={`diveType-${diveType.id}`}>{diveType.diveType}</label>
              <input
                id={`diveType-${diveType.id}`}
                name={`diveType-${diveType.id}`}
                type="number"
                min="0"
                {...register(`diveType-${diveType.id}`, { valueAsNumber: true })}
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
                name={`diveType-${diveType.id}`}
                type="number"
                min="0"
                {...register(`diveType-${diveType.id}`, { valueAsNumber: true })}
              />
            </div>
          ))}
        {diveTypes
          .filter((diveType) => diveType.id !== 1 && diveType.id !== 7 && diveType.id !== 24)
          .sort((a, b) => a.diveType.localeCompare(b.diveType))
          .map((diveType) => (
            <div key={diveType.id}>
              <label htmlFor={`diveType-${diveType.id}`}>{diveType.diveType}</label>
              <input
                id={`diveType-${diveType.id}`}
                name={`diveType-${diveType.id}`}
                type="number"
                min="0"
                {...register(`diveType-${diveType.id}`, { valueAsNumber: true })}
              />
            </div>
          ))}
        <button type="submit">{prevDivesData ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default PrevDivesForm;