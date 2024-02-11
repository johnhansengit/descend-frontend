import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ft2m } from './helpers/conversionUnits';
import Client from './services/api';

const DiveSiteForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isDiveSiteDuplicate, setIsDiveSiteDuplicate] = useState(false);

  const country = watch('country');
  const name = watch('name');

  useEffect(() => {
    const checkDiveSiteDuplicate = async () => {
      if (country && name) {
        const response = await Client.get(`/api/divesites/check?country=${country}&name=${name}`);
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

      const response = await Client.get('/api/divesites/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle response...

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div><h2>Add a Dive Site</h2></div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Dive Site Name
            <input {...register('name', { required: true })} />
            {errors.name && <p>This field is required</p>}
          </label>

          <label>
            Country
            <input {...register('country', { required: true })} />
            {errors.country && <p>This field is required</p>}
          </label>

          <label>
            Minimum Depth of Interest
            <input type="number" {...register('minDepth', { required: true })} />
            {errors.minDepth && <p>This field is required</p>}
          </label>

          <label>
            Maximum Depth of Interest
            <input type="number" {...register('maxDepth', { required: true })} />
            {errors.maxDepth && <p>This field is required</p>}
          </label>

          <label>
            Depth Unit
            <select {...register('depthUnit', { required: true })}>
              <option value="">Select unit</option>
              <option value="m">m</option>
              <option value="ft">ft</option>
            </select>
            {errors.depthUnit && <p>This field is required</p>}
          </label>

          <label>
            Current
            <select {...register('current', { required: true })}>
              <option value="">Select current strength</option>
              <option value="none">None</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="strong">Strong</option>
            </select>
            {errors.current && <p>This field is required</p>}
          </label>

          <label>
            Description
            <textarea {...register('description', { required: true })} />
            {errors.description && <p>This field is required</p>}
          </label>

          <fieldset>
            <legend>Salinity</legend>
            <label>
              <input type="radio" value="salt" {...register('salinity', { required: true })} />
              Salt
            </label>
            <label>
              <input type="radio" value="fresh" {...register('salinity', { required: true })} />
              Fresh
            </label>
            <label>
              <input type="radio" value="brackish" {...register('salinity', { required: true })} />
              Brackish
            </label>
            {errors.salinity && <p>This field is required</p>}
          </fieldset>

          <button type="submit" disabled={isDiveSiteDuplicate}>Submit</button>
          {isDiveSiteDuplicate && <p>A dive site with that name already exists in {country}.</p>}
        </form>
      </div>
    </div>
  );
};

export default DiveSiteForm;