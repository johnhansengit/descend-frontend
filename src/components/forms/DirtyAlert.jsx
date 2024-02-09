import { useStore } from '../../services/store'

const DirtyAlert = () => {

    const { isDirty } = useStore();

    return (
        <div>
            {isDirty ? <p>Don&apos;t forget to save your changes!</p> : null}
        </div>
    )
}

export default DirtyAlert
