import ProfilePic from '../components/forms/ProfilePic'
import DirtyAlert from '../components/forms/DirtyAlert'
import ProfileForm from '../components/forms/ProfileForm'
import ChangeEmailPasswordForm from '../components/forms/ChangeEmailPasswordForm'
import CertificatesForm from '../components/forms/CertificatesForm'
import SettingsForm from '../components/forms/SettingsForm'

const ProfileSettings = () => {

    return (
        <div>
            <div>
                <ProfilePic />
            </div>
            <div>
                <h1>Profile & Settings</h1>
            </div>
            <div>
                <DirtyAlert />
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
