import { Link, Element } from 'react-scroll';
import ProfilePic from '../components/forms/ProfilePic'
import DirtyAlert from '../components/forms/DirtyAlert'
import ProfileForm from '../components/forms/ProfileForm'
import CertificatesForm from '../components/forms/CertificatesForm'
import PrevDivesForm from '../components/forms/PrevDivesForm'
import SettingsForm from '../components/forms/SettingsForm'
import ChangeUserInfoForm from '../components/forms/ChangeUserInfoForm'

const ProfileSettings = () => {

    return (
        <div>
            <div>
                <ProfilePic />
                User Name
            </div>
            <div>
                <h1>Profile & Settings</h1>
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
                <Link to="updateUserInfo" smooth={true}>Update Username, Email or Password</Link>
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
