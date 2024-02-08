import ProfileForm from '../components/forms/ProfileForm'
import SettingsForm from '../components/forms/SettingsForm'
import CertificatesForm from '../components/forms/CertificatesForm'

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
                <CertificatesForm />
            </div>
            <div>
                <SettingsForm />
            </div>
        </div>
    )
}

export default ProfileSettings
