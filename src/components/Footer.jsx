import { Box } from '@mui/material';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.secondary.main,
        boxShadow: '0px -3px 5px 0px rgba(0,0,0,0.5)',
      }}
    >
      <p style={{
        textAlign: "center",
        fontSize: "0.8em",
        marginLeft: '1em',  
      }}
      >
        a <a href="https://johnhansen.io" rel="noreferrer" target="_blank">john hansen</a> creation  © {currentYear}
      </p>
    </Box>
  )
}

export default Footer;
