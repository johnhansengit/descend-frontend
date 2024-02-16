import { useStore } from '../../services/store'
import { Alert, Box } from '@mui/material'

const DirtyAlert = () => {

    const { isDirty } = useStore();

    return (
        <Box
            mb={2}
        >
            {isDirty ? 
            <Alert severity="warning">Don&apos;t forget to save your changes!</Alert>
            : 
            null
            }
        </Box>
    )
}

export default DirtyAlert
