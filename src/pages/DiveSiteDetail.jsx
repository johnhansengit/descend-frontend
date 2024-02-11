import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { m2ft, C2F } from '../helpers/conversionUtils';
import Client from '../services/api';

const DiveSiteDetail = () => {
    const { country, name } = useParams();
    const [diveSite, setDiveSite] = useState(null);
    const [userSettings, setUserSettings] = useState(null);

    useEffect(() => {
        const fetchDiveSite = async () => {
            console.log('country:', country, 'name:', name)
            try {
                const response = await Client.get(`/api/divesites/${encodeURIComponent(country)}/${encodeURIComponent(name)}`);
                const diveSiteData = response.data;
                console.log('diveSiteData:', diveSiteData);
                setDiveSite(diveSiteData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchUserSettings = async () => {
            try {
                const response = await Client.get('/api/settings');
                const settingsData = response.data;
                setUserSettings(settingsData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDiveSite();
        fetchUserSettings();
    }, [country, name]);

    if (!diveSite) {
        return <div>Loading...</div>;
    }

    const distanceUnit = userSettings.measureDepth === 'ft' ? 'ft' : 'm';
    const tempUnit = userSettings.measureTemp === 'F' ? 'F' : 'C';
    const minDepth = userSettings.measureDepth === 'ft' ? m2ft(diveSite.minDepth) : diveSite.minDepth;
    const maxDepth = userSettings.measureDepth === 'ft' ? m2ft(diveSite.maxDepth) : diveSite.maxDepth;
    const avgVis = userSettings.measureDepth === 'ft' ? m2ft(diveSite.avgVis) : diveSite.avgVis;
    const avgTemp = userSettings.measureTemp === 'F' ? C2F(diveSite.avgTemp) : diveSite.avgTemp;

    return (
        <div>
            <h1>{diveSite.name}</h1>
            <p>Country: {diveSite.country}</p>
            {/* GoogleMaps using coords diveSite.coordLat and diveSite.coordLong, if they are not null*/}
            <p>Minimum Depth: {minDepth} {distanceUnit}</p>
            <p>Maximum Depth: {maxDepth} {distanceUnit}</p>
            <p>Salinity: {diveSite.salinity}</p>
            <p>Description: {diveSite.description}</p>

            <h2>Conditions</h2>
            <p>{diveSite.current}</p>
            {avgTemp !== null && <p>Average Temperature: {avgTemp} {tempUnit}</p>}
            {avgVis !== null && <p>Average Visibility: {avgVis} {distanceUnit}</p>}

            <h2>Comment Ratings</h2>
            {diveSite.commentRatings.map((commentRating) => (
                <div key={commentRating.id}>
                    <p>Date: {new Date(commentRating.date).toLocaleDateString()}</p>
                    <p>Comment: {commentRating.comment}</p>
                    <p>Rating: {commentRating.rating}</p>
                    <p>User: {commentRating.user.userName}</p>
                </div>
            ))}

            <h2>Dive Pics</h2>
            {diveSite.divePics.map((divePic) => (
                <img key={divePic.id} src={divePic.filePath} alt="Dive Pic" />
            ))}

            <h2>Created By</h2>
            <p>{diveSite.user.userName}</p>
        </div>
    );
};

export default DiveSiteDetail;