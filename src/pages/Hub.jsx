import { useStore } from '../services/store';
import { Box, Typography } from '@mui/material';
import SideScroller from '../components/SideScroller';
import DiveCardMini from '../components/cards/DiveCardMini';
import DiveSiteCardMini from '../components/cards/DiveSiteCardMini';

const Hub = () => {

  const { user } = useStore();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      pt={2}
      pb={10}
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
          fontSize: 'clamp(50px, 5vw, 10vw)',
          fontWeight: 900,
          textAlign: 'center',
          mb: 2,
          color: (theme) => theme.palette.secondary.main,
        }}
      >
        The Hub
      </Typography>
      <SideScroller Title={`${user.userName}'s Dive Log`} Component={DiveCardMini} />
      <SideScroller Title="Explore Dive Sites" Component={DiveSiteCardMini} />
    </Box>
  )
}

export default Hub
