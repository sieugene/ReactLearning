import React from 'react';
import Preloader from "../../assets/preloader/Preloader";
import s from './Profile.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Profile = React.memo(props => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={s.profileContain}>
            <img src={
                props.profile.photos.small === null ? 'http://www.pngmart.com/files/10/User-Account-Person-PNG-File.png'
                    : props.profile.photos.small
            } alt=''/><br/>
            <span>AboutMe: {props.profile.aboutMe}<br/></span>
            <span>FullName: {props.profile.fullName}<br/></span>
            <ProfileStatusWithHooks status={props.status}
                           updateStatusUserThunk={props.updateStatusUserThunk}
                           id={props.id}
                           urlMatchParams={props.urlMatchParams}
            />
        </div>
    )
})

export default Profile
