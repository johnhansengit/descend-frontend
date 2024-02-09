import { useState, useEffect } from 'react';
import Client from '../../services/api';
import { useForm } from 'react-hook-form';
import { useStore } from '../../services/store';

const ProfileForm = () => {

    const { isDirty, setIsDirty } = useStore();

    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            heightUnit: 'cm',
            weightUnit: 'kg'
        }
    });

    const [profileExists, setProfileExists] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const heightUnit = watch('heightUnit');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Client.get('/api/profile');
                if (response.data) {
                    setProfileExists(true);
                    Object.keys(response.data).forEach(key => {
                        setValue(key, response.data[key]);
                    });
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [setValue]);

    const handleInputChange = () => {
        if (!isDirty) {
            setIsDirty(true);
        }
        if (isSubmitted) {
            setIsSubmitted(false);
        }
    };

    const onSubmit = async (data) => {
        let profileData = {};

        Object.keys(data).forEach(key => {
            if (data[key] !== '') {
                profileData[key] = data[key];
            }
        });

        try {
            if (profileExists) {
                await Client.put('/api/profile', profileData);
            } else {
                await Client.post('/api/profile', profileData);
                setProfileExists(true);
            }
            setIsDirty(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="profileFirstName">First Name:</label>
                    <input id="profileFirstName" {...register('firstName')} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="profileLastName">Last Name:</label>
                    <input id="profileLastName" {...register('lastName')} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="profileDob">Date of Birth:</label>
                    <input type="date" id="profileDob" {...register('dob')} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="profileHeightUnit">Height:</label>
                    <select id="profileHeightUnit" {...register('heightUnit')} onChange={handleInputChange}>
                        <option value="cm">cm</option>
                        <option value="ft/in">ft/in</option>
                    </select>
                    {heightUnit === 'cm' ? (
                        <input id="profileHeightCm" type="number" min="0" step="1" {...register('heightCm')} onChange={handleInputChange} />
                    ) : (
                        <>
                            <input id="profileHeightFt" type="number" min="0" step="1" placeholder="ft" {...register('heightFt')}  onChange={handleInputChange}/>
                            <input id="profileHeightIn" type="number" min="0" step="1" placeholder="in" {...register('heightIn')}  onChange={handleInputChange}/>
                        </>
                    )}
                </div>
                <div>
                    <label htmlFor="profileWeightUnit">Weight:</label>
                    <select id="profileWeightUnit" {...register('weightUnit')} onChange={handleInputChange}>
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                    <input id="profileWeight" type="number" min="0" step="1" {...register('weight')}  onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="profileAgency">Diver Certification Agency:</label>
                    <select id="profileAgency" {...register('agency')} onChange={handleInputChange}>
                        <option value="PADI">PADI</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="profileDiverNo">Diver Certification Number:</label>
                    <input id="profileDiverNo" {...register('diverNo')} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="profileInsuranceProvider">Dive Insurance Provider:</label>
                    <input id="profileInsuranceProvider" {...register('insuranceProvider')} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="profileDiveInsuranceNo">Dive Insurance Number:</label>
                    <input id="profileDiveInsuranceNo" {...register('diveInsuranceNo')} onChange={handleInputChange} />
                </div>
                <button type="submit">{profileExists ? 'Update' : 'Submit'}</button>
            </form>
            {isSubmitted && (
                <div>
                    Profile Updated!
                </div>
            )}
        </div>
    );
};

export default ProfileForm;
