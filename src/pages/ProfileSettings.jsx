import { Link, Element } from 'react-scroll';
import { useStore } from '../services/store';
import ProfilePic from '../components/forms/profile-settings/ProfilePic'
import DirtyAlert from '../components/forms/DirtyAlert'
import ProfileForm from '../components/forms/profile-settings/ProfileForm'
import CertificatesForm from '../components/forms/profile-settings/CertificatesForm'
import PrevDivesForm from '../components/forms/profile-settings/PrevDivesForm'
import SettingsForm from '../components/forms/profile-settings/SettingsForm'
import ChangeUserInfoForm from '../components/forms/profile-settings/ChangeUserInfoForm'

const ProfileSettings = () => {

    const { user } = useStore();

    return (
        <div>
            <div>
                <h1>Profile & Settings</h1>
            </div>
            <div>
                <ProfilePic />
                {user.userName}
            </div>
            <div>
                <DirtyAlert />
            </div>
            <div>
                <h1>Menu</h1>
                <Link to="profile" smooth={true}>Profile</Link>
                <Link to="certifications" smooth={true}>Certifications</Link>
                <Link to="previousDives" smooth={true}>Previous Dives</Link>
                <Link to="settings" smooth={true}>Settings</Link>
                <Link to="updateUserInfo" smooth={true}>Update Username, Email, or Password</Link>
            </div>
            <div>
                <div>
                    <Element name="profile">
                        <ProfileForm />
                    </Element>
                </div>
                <div>
                    <Element name="certifications">
                        <CertificatesForm />
                    </Element>
                </div>
                <div>
                    <Element name="previousDives">
                        <PrevDivesForm />
                    </Element>
                </div>
                <div>
                    <Element name="settings">
                        <SettingsForm />
                    </Element>
                </div>
                <div>
                    <Element name="updateUserInfo">
                        <ChangeUserInfoForm />
                    </Element>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
