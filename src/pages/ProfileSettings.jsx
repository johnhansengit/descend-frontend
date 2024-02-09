import { useStore } from '../services/store'
import ProfilePic from '../components/forms/ProfilePic'
import ProfileForm from '../components/forms/ProfileForm'
import ChangeEmailPasswordForm from '../components/forms/ChangeEmailPasswordForm'
import CertificatesForm from '../components/forms/CertificatesForm'
import SettingsForm from '../components/forms/SettingsForm'

const ProfileSettings = () => {

    const { isDirty } = useStore();

    return (
        <div>
            <div>
                <ProfilePic />
            </div>
            <div>
                <h1>Profile & Settings</h1>
            </div>
            <div>
                {isDirty ? <p>Don&apos;t forget to save your changes!</p> : null}
            </div>
            <div>
                <ProfileForm />
            </div>
            <div>
                <ChangeEmailPasswordForm />
            </div>
            <div>
                <CertificatesForm />
            </div>
            <div>
                <SettingsForm />
            </div>
        </div>
    )
}

export default ProfileSettings
