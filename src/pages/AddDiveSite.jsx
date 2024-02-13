import { Drawer } from '@mui/material';
import DiveSiteForm from '../components/forms/DiveSiteForm';

const AddDiveSite = ({ open, onClose }) => {
  return (
    <div>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 'min(100%, 500px)',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
      >
        <DiveSiteForm />
      </Drawer>
    </div>
  );
};

export default AddDiveSite;