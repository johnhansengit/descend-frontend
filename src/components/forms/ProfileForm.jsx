import { useState, useEffect } from 'react';
import Client from '../../services/api';
import { useForm } from 'react-hook-form';

const ProfileForm = () => {
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            heightUnit: 'cm',
            weightUnit: 'kg'
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const heightUnit = watch('heightUnit');
    const weightUnit = watch('weightUnit');

    useEffect(() => {
        if (heightUnit === 'cm') {
            setValue('heightFt', '');
            setValue('heightIn', '');
        } else {
            setValue('heightCm', '');
        }
    }, [heightUnit, setValue]);

    useEffect(() => {
        setValue('weight', '');
    }, [weightUnit, setValue]);

    const onSubmit = async (data) => {
        const profileData = new FormData();

        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                return;
            } else if (key === 'profilePic' && data[key].length > 0) {
                profileData.append(key, data[key][0]);
            } else {
                profileData.append(key, data[key]);
            }
        });
        
        try {
            const response = await Client.post('/api/profile', profileData);
            console.log('Profile created:', response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="profileUserName">User Name:</label>
                    <input id="profileUserName" {...register('userName')} />
                </div>
                <div>
                    <label htmlFor="profileFirstName">First Name:</label>
                    <input id="profileFirstName" {...register('firstName')} />
                </div>
                <div>
                    <label htmlFor="profileLastName">Last Name:</label>
                    <input id="profileLastName" {...register('lastName')} />
                </div>
                <div>
                    <label htmlFor="profileDob">Date of Birth:</label>
                    <input type="date" id="profileDob" {...register('dob')} />
                </div>
                <div>
                    <label htmlFor="profileProfilePic">Profile Picture:</label>
                    <input type="file" id="profileProfilePic" {...register('profilePic')} />
                </div>
                <div>
                    <label htmlFor="profileHeightUnit">Height:</label>
                    <select id="profileHeightUnit" {...register('heightUnit')}>
                        <option value="cm">cm</option>
                        <option value="ft/in">ft/in</option>
                    </select>
                    {heightUnit === 'cm' ? (
                        <input id="profileHeightCm" {...register('heightCm')} />
                    ) : (
                        <>
                            <input id="profileHeightFt" {...register('heightFt')} placeholder="ft" />
                            <input id="profileHeightIn" {...register('heightIn')} placeholder="in" />
                        </>
                    )}
                </div>
                <div>
                    <label htmlFor="profileWeightUnit">Weight:</label>
                    <select id="profileWeightUnit" {...register('weightUnit')}>
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                    <input id="profileWeight" {...register('weight')} />
                </div>
                <div>
                    <label htmlFor="profileAgency">Diver Certification Agency:</label>
                    <select id="profileAgency" {...register('agency')}>
                        <option value="PADI">PADI</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="profileDiverNo">Diver Certification Number:</label>
                    <input id="profileDiverNo" {...register('diverNo')} />
                </div>
                <div>
                    <label htmlFor="profileInsuranceProvider">Dive Insurance Provider:</label>
                    <input id="profileInsuranceProvider" {...register('insuranceProvider')} />
                </div>
                <div>
                    <label htmlFor="profileDiveInsuranceNo">Dive Insurance Number:</label>
                    <input id="profileDiveInsuranceNo" {...register('diveInsuranceNo')} />
                </div>
                <button type="submit">Submit</button>
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
