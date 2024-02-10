import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DiveSiteDetail = () => {
    const { id } = useParams();
    const [diveSite, setDiveSite] = useState(null);

    useEffect(() => {
        const fetchDiveSite = async () => {
            try {
                const response = await fetch(`/api/divesites/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const diveSiteData = await response.json();
                setDiveSite(diveSiteData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDiveSite();
    }, [id]);

    if (!diveSite) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{diveSite.name}</h1>
            <p>Country: {diveSite.country}</p>
            {/* GoogleMaps using coords diveSite.coordLat and diveSite.coordLong, if they are not null*/}
            <p>Minimum Depth: {diveSite.minDepth}</p>
            <p>Maximum Depth: {diveSite.maxDepth}</p>
            {diveSite.avgTemp !== null && <p>Average Temperature: {diveSite.avgTemp}</p>}
            {diveSite.avgVis !== null && <p>Average Visibility: {diveSite.avgVis}</p>}
            <p>Description: {diveSite.description}</p>
            <p>Salinity: {diveSite.salinity}</p>
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