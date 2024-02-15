import { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Client from '../../services/api';

const CertificateCard = () => {

    const [certifications, setCertifications] = useState([]);

    const fetchCertifications = async () => {
        try {
            const response = await Client.get('/api/certifications');
            setCertifications(response.data || [])
        } catch (error) {
            console.error('Error fetching certification data:', error);
        }
    };

    const deleteCertification = async (id) => {
        try {
            await Client.delete(`/api/certifications/${id}`);
            fetchCertifications();
        } catch (error) {
            console.error('Error deleting certification:', error);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    return (
        <>
            {certifications
                .sort((a, b) => {
                    if (a.issueDate === b.issueDate) {
                        return b.id - a.id;
                    }
                    return new Date(b.issueDate) - new Date(a.issueDate);
                })
                .map(certification => {
                    return (
                        <Card key={certification.id} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRadius: 2,
                            pt: 2,
                            boxShadow: 4,
                            minWidth: '200px',
                            maxWidth: '400px',
                            height: '200px',
                            backgroundColor: (theme) => theme.palette.greyed
                        }}>
                            <CardContent style={{
                                textAlign: 'center',
                                position: 'relative',
                            }}>
                                <IconButton aria-label="delete" size="small" style={{ position: 'absolute', right: 0, top: 0 }} onClick={() => deleteCertification(certification.id)}>
                                    <DeleteIcon sx={{ ":hover": { cursor: "pointer" } }} />
                                </IconButton>
                                <Typography variant="h6" sx={{ mt: 2 }}>{certification.CertificationRequirement.name}</Typography>
                                <Typography variant="body1" sx={{ mb: 1.5 }}>{certification.issueDate}</Typography>
                                <Typography variant="body2">{certification.diveShop}</Typography>
                                <Typography variant="body2">{certification.instructor}</Typography>
                                <Typography variant="body2">{certification.instructorNo}</Typography>
                            </CardContent>
                        </Card>
                    );
                })}
        </>
    )
}

export default CertificateCard