import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../services/store';  
import { ft2m } from '../../helpers/conversionUtils';
import Client from '../../services/api';

const DiveSiteForm = () => {

  const navigate = useNavigate();

  const user = useStore(state => state.user);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [isDiveSiteDuplicate, setIsDiveSiteDuplicate] = useState(false);

  const country = watch('country');
  const name = watch('name');

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
      if (data.depthUnit === 'ft') {
        data.minDepth = ft2m(data.minDepth);
        data.maxDepth = ft2m(data.maxDepth);
      }
  
      delete data.depthUnit;
      data.userId = user.id
  
      const response = await Client.post('/api/diveSites/add', data);
  
      console.log('Success:', response.data);

      reset();

      navigate(`/dive-sites/${encodeURIComponent(data.country)}/${encodeURIComponent(data.name)}`);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  

return (
  <div>
    <div><h2>Add a Dive Site</h2></div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="divesiteName">Dive Site Name</label>
        <input id="divesiteName" {...register('name', { required: true })} />
        {errors.name && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="divesiteCountry">Country</label>
        <input id="divesiteCountry" {...register('country', { required: true })} />
        {errors.country && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="divesiteMinDepth">Minimum Depth of Interest</label>
        <input type="number" id="divesiteMinDepth" {...register('minDepth', { required: true })} />
        {errors.minDepth && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="divesiteMaxDepth">Maximum Depth of Interest</label>
        <input type="number" id="divesiteMaxDepth" {...register('maxDepth', { required: true })} />
        {errors.maxDepth && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="divesiteDepthUnit">Depth Unit</label>
        <select id="divesiteDepthUnit" {...register('depthUnit', { required: true })}>
          <option value="">Select unit</option>
          <option value="m">m</option>
          <option value="ft">ft</option>
        </select>
        {errors.depthUnit && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="divesiteCurrent">Current</label>
        <select id="divesiteCurrent" {...register('current', { required: true })}>
          <option value="">Select current strength</option>
          <option value="none">None</option>
          <option value="mild">Mild</option>
          <option value="moderate">Moderate</option>
          <option value="strong">Strong</option>
        </select>
        {errors.current && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="divesiteDescription">Description</label>
        <textarea id="divesiteDescription" {...register('description', { required: true })} />
        {errors.description && <p>This field is required</p>}
      </div>

      <fieldset>
        <legend>Salinity</legend>
        <div>
          <label htmlFor="divesiteSalinitySalt">
            <input type="radio" id="divesiteSalinitySalt" value="salt" {...register('salinity', { required: true })} />
            Salt
          </label>
          <label htmlFor="divesiteSalinityFresh">
            <input type="radio" id="divesiteSalinityFresh" value="fresh" {...register('salinity', { required: true })} />
            Fresh
          </label>
          <label htmlFor="divesiteSalinityBrackish">
            <input type="radio" id="divesiteSalinityBrackish" value="brackish" {...register('salinity', { required: true })} />
            Brackish
          </label>
        </div>
        {errors.salinity && <p>This field is required</p>}
      </fieldset>

      <button type="submit" disabled={isDiveSiteDuplicate}>Submit</button>
      {isDiveSiteDuplicate && <p>A dive site with that name already exists in {country}.</p>}
    </form>
  </div>
);
};

export default DiveSiteForm;