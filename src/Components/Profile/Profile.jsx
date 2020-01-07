import React from 'react';
import Preloader from "../../assets/preloader/Preloader";
import s from './Profile.module.css';
const Profile = (props) => {
    if(!props.profile){
       return <Preloader/>
    }
    return(
        <div className={s.profileContain}>
            <img src={
                props.profile.photos.small === null ? 'http://www.pngmart.com/files/10/User-Account-Person-PNG-File.png'
                    : props.profile.photos.small
            } alt=''/><br/>
            AboutMe: {props.profile.aboutMe}<br/>
            FullName: {props.profile.fullName}
        </div>
    )
}

export default Profile
