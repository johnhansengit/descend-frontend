import ProfilePic from '../components/forms/ProfilePic'
import ProfileForm from '../components/forms/ProfileForm'
import ChangePasswordForm from '../components/forms/ChangePasswordForm'
import CertificatesForm from '../components/forms/CertificatesForm'
import SettingsForm from '../components/forms/SettingsForm'

const ProfileSettings = ({ isDirty, setIsDirty}) => {

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
                <ProfileForm isDirty={isDirty} setIsDirty={setIsDirty} />
            </div>
            <div>
                <ChangePasswordForm isDirty={isDirty} setIsDirty={setIsDirty} />
            </div>
            <div>
                <CertificatesForm isDirty={isDirty} setIsDirty={setIsDirty} />
            </div>
            <div>
                <SettingsForm isDirty={isDirty} setIsDirty={setIsDirty} />
            </div>
        </div>
    )
}

export default ProfileSettings
