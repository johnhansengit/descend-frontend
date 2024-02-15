import { useEffect, useState } from "react";
import { IconButton, Card, CardContent, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Client from '../../services/api';

const DiveSiteCardMini = () => {

    const [diveLogs, setDiveLogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDive, setSelectedDive] = useState(null);

    const deleteDive = async (id) => {
        try {
            await Client.delete(`/api/diveLogs/${id}`);
            fetchDives();
        } catch (error) {
            console.error('Error deleting diveLog:', error);
        }
    };

    const fetchDives = async () => {
        try {
            const response = await Client.get('/api/diveLogs');
            const diveLogs = response.data;
            setDiveLogs(diveLogs);
        } catch (error) {
            console.error('fetchDives -> error', error);
        }
    }

    const handleOpen = (id) => {
        setSelectedDive(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deleteDive(selectedDive);
        setOpen(false);
    };

    useEffect(() => {
        fetchDives();
    }, []);

    return (
        <>
            {diveLogs.map((diveLog) => {
                return (
                    <Card key={diveLog.id}
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
                                <Link 
                                    to={`/dives/${diveLog.id}`}
                                >
                                    <h3 style={{ margin: 3 }}>{diveLog.DiveSite?.name}</h3>
                                    <p style={{ margin: 3 }}>{diveLog.DiveSite?.country}</p>
                                    <p style={{ margin: 3 }}>{diveLog.date}</p>
                                    {diveLog.DiveType?.map(diveType => (
                                        <p key={diveType.id}>{diveType.diveType}</p>
                                    ))}
                                    <p style={{ margin: 3 }}>{diveLog.maxDepth} {diveLog.maxDepthUnit}</p>
                                </Link >
                                <IconButton aria-label="delete" size="small" style={{ position: 'absolute', right: 0, top: 0 }} onClick={() => handleOpen(diveLog.id)}>
                                    <DeleteIcon sx={{ ":hover": { cursor: "pointer" } }} />
                                </IconButton>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Delete Dive Log"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You sure you wanna call this dive?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DiveSiteCardMini