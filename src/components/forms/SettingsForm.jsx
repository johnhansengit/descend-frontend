import { useState, useEffect } from 'react';
import Client from '../../services/api';
import { useForm } from 'react-hook-form';

const SettingsForm = ({ userId }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      theme: 'Blue Hole',
      userVisible: true,
      divesVisible: true,
      photosVisible: true,
      measureTemp: 'C',
      measureWeight: 'kg',
      measureDepth: 'm',
      measurePressure: 'bar',
    },
  });
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const response = await Client.get('/api/settings/');
        setSettingsData(response.data);
        for (const key in response.data) {
          setValue(key, response.data[key]);
        }
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    };

    fetchSettingsData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      if (settingsData) {
        await Client.put('/api/settings/', data);
      } else {
        await Client.post('/api/settings/', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="theme">Theme</label>
          <select id="theme" {...register('theme')}>
            <option value="Blue Hole">Blue Hole</option>
            <option value="Night Dive">Night Dive</option>
            <option value="Reef Crest">Reef Crest</option>
            <option value="Kelp Forest">Kelp Forest</option>
          </select>
        </div>
        <div>
          <label htmlFor="userVisible">Buddies can add me to their dives</label>
          <input id="userVisible" type="checkbox" {...register('userVisible')} />
        </div>
        <div>
          <label htmlFor="divesVisible">Buddies can see my dives</label>
          <input id="divesVisible" type="checkbox" {...register('divesVisible')} />
        </div>
        <div>
          <label htmlFor="photosVisible">Photos default shared</label>
          <input id="photosVisible" type="checkbox" {...register('photosVisible')} />
        </div>
        <div>
          <label>Temperature</label>
          <label>
            <input type="radio" value="C" {...register('measureTemp')} />
            C
          </label>
          <label>
            <input type="radio" value="F" {...register('measureTemp')} />
            F
          </label>
        </div>
        <div>
          <label>Dive Weight</label>
          <label>
            <input type="radio" value="kg" {...register('measureWeight')} />
            kg
          </label>
          <label>
            <input type="radio" value="lbs" {...register('measureWeight')} />
            lbs
          </label>
        </div>
        <div>
          <label>Depth & Vis</label>
          <label>
            <input type="radio" value="m" {...register('measureDepth')} />
            m
          </label>
          <label>
            <input type="radio" value="ft" {...register('measureDepth')} />
            ft
          </label>
        </div>
        <div>
          <label>Air</label>
          <label>
            <input type="radio" value="bar" {...register('measurePressure')} />
            bar
          </label>
          <label>
            <input type="radio" value="psi" {...register('measurePressure')} />
            psi
          </label>
        </div>
        <button type="submit">{settingsData ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default SettingsForm;