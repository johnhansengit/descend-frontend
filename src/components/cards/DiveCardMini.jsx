import { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Client from '../../services/api';

const DiveSiteCardMini = () => {

    const [diveLogs, setDiveLogs] = useState([]);

    useEffect(() => {
        const fetchDives = async () => {
            try {
                const response = await Client.get('/api/diveLogs');
                const diveLogs = response.data;
                setDiveLogs(diveLogs);
            } catch (error) {
                console.error('fetchDives -> error', error);
            }
        }
        fetchDives();
    }, []);

    return (
        <>
            {diveLogs.map((diveLog) => {
                return (
                    <Link to={`/dives/${diveLog.id}`} key={diveLog.id}>
                        <Card
                            sx={{
                                height: '100%',
                                width: 150,
                                backgroundColor: (theme) => theme.palette.secondary.main,
                            }}
                        >
                            <CardActionArea>
                                <CardContent
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    gap={0}
                                    height="100%"
                                >
                                    <h3 style={{ margin: 3 }}>{diveLog.DiveSite?.name}</h3>
                                    <p style={{ margin: 3 }}>{diveLog.DiveSite?.country}</p>
                                    <p style={{ margin: 3 }}>{diveLog.date}</p>
                                    {diveLog.DiveType?.map(diveType => (
                                        <p key={diveType.id}>{diveType.diveType}</p>
                                    ))}
                                    <p style={{ margin: 3 }}>{diveLog.maxDepth} {diveLog.maxDepthUnit}</p>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                )
            })}
        </>
    )
}

export default DiveSiteCardMini