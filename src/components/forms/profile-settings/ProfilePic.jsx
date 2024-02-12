import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import { Box } from '@mui/material';

const ProfilePic = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 'clamp(30vmin, 30vmin, 200px)',
        height: 'clamp(30vmin, 30vmin, 200px)',
        borderRadius: '50%',
        backgroundColor: (theme) => theme.palette.greyed,
        color: (theme) => theme.palette.primary.main,
      }}
    >
      <ScubaDivingIcon 
        sx={{
          fontSize: '18vmin',
        }}
      />
    </Box>
  );
};

export default ProfilePic;
