import { useForm } from 'react-hook-form';

const DiveSiteForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/divesites/new', {
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DiveSiteForm;