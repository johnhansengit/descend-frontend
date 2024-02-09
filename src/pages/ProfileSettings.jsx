import ProfileForm from '../components/forms/ProfileForm'
import ChangePasswordForm from '../components/forms/ChangePasswordForm'
import CertificatesForm from '../components/forms/CertificatesForm'
import SettingsForm from '../components/forms/SettingsForm'

const ProfileSettings = () => {

    

    return (
        <div>
            <div>
                <h1>Profile & Settings</h1>
            </div>
            <div>
                <ProfileForm />
            </div>
            <div>
                <ChangePasswordForm />
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
