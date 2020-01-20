import React, {useState} from 'react';
import Preloader from "../../assets/preloader/Preloader";
import s from './Profile.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ReduxEditProfile from "./ProfileDataForm";

const Profile = React.memo(props => {
    if (!props.profile) {
        return <Preloader/>
    }
    let [editProfile, setEditProfile] = useState(false);
    const onSubmit = (formData) => {
        if(formData === props.profile){
            setEditProfile(false)
        }else {
            //here thunk
            props.updateProfileUserThunk(formData).then( () => {
                setEditProfile(false)
            })
        }
    }
    return (
        <div className={s.profileContain}>
            {editProfile ? <ReduxEditProfile initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/>
                :
                <div className={s.profileContain}>
                    <img src={
                        props.profile.photos.small === null ?
                            'http://cdn.onlinewebfonts.com/svg/img_566357.png'
                            : props.profile.photos.small
                    } alt=''/><br/>
                    <button onClick={() => {setEditProfile(true)}}>Edit</button>
                    <span><b>AboutMe:</b> {props.profile.aboutMe}<br/></span>
                    <span><b>FullName:</b> {props.profile.fullName}<br/></span>
                    <ProfileStatusWithHooks status={props.status}
                                            updateStatusUserThunk={props.updateStatusUserThunk}
                                            id={props.id}
                                            urlMatchParams={props.urlMatchParams}
                    />
                    <span><b>lookingForAJob:</b>
                        {props.profile.lookingForAJob ? 'yes' : 'no'}
                    </span>
                    <span><b>lookingForAJobDescription:</b> {props.profile.lookingForAJobDescription}</span>
                    {Object.keys(props.profile.contacts).map(key =>
                        <Contact key={key} contactTitle={key} contactBody={props.profile.contacts[key]}/>
                    )}
                </div>
            }
        </div>
    )
})
const Contact = ({contactTitle, contactBody}) => {
    return (
        <div><b>{contactTitle}:</b>{contactBody}</div>
    )

}


export default Profile
