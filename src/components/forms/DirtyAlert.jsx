import { useStore } from '../../services/store'
import { Alert } from '@mui/material'

const DirtyAlert = () => {

    const { isDirty } = useStore();

    return (
        <div>
            {isDirty ? 
            <Alert severity="warning">Don&apos;t forget to save your changes!</Alert>
            : 
            null
            }
        </div>
    )
}

export default DirtyAlert
