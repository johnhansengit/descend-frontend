import { useEffect } from 'react';
import Client from '../../../services/api';
import { useForm } from 'react-hook-form';
import { useThemeStore } from '../../../services/store'; 

const SettingsForm = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  const { register, handleSubmit, setValue } = useForm();

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
    <div>
      <div>
        <h2>Settings</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="settingsTheme">Theme</label>
          <select id="settingsTheme" {...register('theme')}>
            <option value="Blue Hole">Blue Hole</option>
            <option value="Night Dive">Night Dive</option>
            <option value="Reef Crest">Reef Crest</option>
            <option value="Kelp Forest">Kelp Forest</option>
          </select>
        </div>
        <div>
          <label htmlFor="settingsUserVisible">Buddies can add me to their dives</label>
          <input id="settingsUserVisible" type="checkbox" {...register('userVisible')} />
        </div>
        <div>
          <label htmlFor="settingsDivesVisible">Buddies can see my dives</label>
          <input id="settingsDivesVisible" type="checkbox" {...register('divesVisible')} />
        </div>
        <div>
          <label htmlFor="settingsPhotosVisible">Photos default shared</label>
          <input id="settingsPhotosVisible" type="checkbox" {...register('photosVisible')} />
        </div>
        <div>
          <label htmlFor="settingsTemp">Temperature</label>
          <label>
            <input id="settingsTemp" type="radio" value="C" {...register('measureTemp')} />
            C
          </label>
          <label>
            <input type="radio" value="F" {...register('measureTemp')} />
            F
          </label>
        </div>
        <div>
          <label htmlFor="settingsDiveWeight">Dive Weight</label>
          <label>
            <input id="settingsDiveWeight" type="radio" value="kg" {...register('measureWeight')} />
            kg
          </label>
          <label>
            <input type="radio" value="lbs" {...register('measureWeight')} />
            lbs
          </label>
        </div>
        <div>
          <label htmlFor="settingsDepthVis">Depth & Vis</label>
          <label>
            <input id="settingsDepthVis" type="radio" value="m" {...register('measureDepth')} />
            m
          </label>
          <label>
            <input type="radio" value="ft" {...register('measureDepth')} />
            ft
          </label>
        </div>
        <div>
          <label htmlFor="settingsAir">Air</label>
          <label>
            <input id="settingsAir" type="radio" value="bar" {...register('measurePressure')} />
            bar
          </label>
          <label>
            <input type="radio" value="psi" {...register('measurePressure')} />
            psi
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default SettingsForm;