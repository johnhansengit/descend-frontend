import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStore } from '../services/store';
import ProfilePic from '../components/forms/profile-settings/ProfilePic';
import DirtyAlert from '../components/forms/DirtyAlert';
import ProfileForm from '../components/forms/profile-settings/ProfileForm';
import CertificatesForm from '../components/forms/profile-settings/CertificatesForm';
import PrevDivesForm from '../components/forms/profile-settings/PrevDivesForm';
import SettingsForm from '../components/forms/profile-settings/SettingsForm';
import ChangeUserInfoForm from '../components/forms/profile-settings/ChangeUserInfoForm';

const ProfileSettings = () => {
    const { user } = useStore();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.text.primary,
                fontFamily: (theme) => theme.typography.fontFamily,
            }}
        >
            <Typography
                component="h1"
                variant="h1"
                sx={{
                    fontSize: 'clamp(40px,40vw, 6vw)',
                    fontWeight: 900,
                    textAlign: 'center',
                    mb: 2,
                    color: (theme) => theme.palette.secondary.main,
                }}
            >
                Profile & Settings
            </Typography>
            <Box sx={{
                width: '100%',
                maxWidth: 600,
                display: 'flex',
                flexDirection: 'column',    
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProfilePic />
                <Typography
                    variant="h4"
                    sx={{
                        my: 2,
                        textAlign: 'center',
                        color: (theme) => theme.palette.secondary.main,
                    }}
                >
                    {user.userName}
                </Typography>
                <DirtyAlert />
            </Box>
            <Box
                sx={{
                    width: '90%',
                    maxWidth: 600,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Profile</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ProfileForm />
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Certifications</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CertificatesForm />
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Previous Dives</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PrevDivesForm />
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingsForm />
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Update Username or Login</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChangeUserInfoForm />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default ProfileSettings;
