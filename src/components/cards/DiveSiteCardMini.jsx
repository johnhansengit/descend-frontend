import { useEffect } from "react";
import { useStore } from '../../services/store';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const DiveSiteCardMini = () => {

    const { diveSites, fetchDiveSites } = useStore();

    useEffect(() => {
        fetchDiveSites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {diveSites.map((diveSite) => {
                return (
                    <Link to={`/${diveSite.country}/${diveSite.name}`} key={diveSite.id}>
                        <Card
                            sx={{
                                height: '100%',
                                width: 150,
                                backgroundColor: (theme) => theme.palette.secondary.main,
                            }}
                        >
                            <CardActionArea>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        gap: 0,
                                        height: '100%',
                                    }}
                                >
                                    <h2 style={{ marginBottom: 5 }}>{diveSite.name}</h2>
                                    <h4 style={{ marginTop: 1, marginBottom: 0 }}>{diveSite.country}</h4>
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