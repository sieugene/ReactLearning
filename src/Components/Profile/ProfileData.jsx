import s from "./Profile.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";


const ProfileData = (props) => {
    return (
        <div className={s.infoProfile}>
            <div className={s.editButton}>
                {props.myProfile &&
                <button onClick={() => {
                    props.setEditProfile(true)
                }}>Edit
                </button>
                }
            </div>
            <hr/>
            <span><b>AboutMe:</b> {props.profile.aboutMe}</span>
            <span><b>FullName:</b> {props.profile.fullName}</span>
            <span><b>Status:</b> {props.status}</span>
            <span><b>lookingForAJob: </b>{props.profile.lookingForAJob ? 'yes' : 'no'}</span>
            <span><b>lookingForAJobDescription:</b> {props.profile.lookingForAJobDescription}</span>
            {Object.keys(props.profile.contacts).map(key =>
                <Contact key={key} contactTitle={key} contactBody={props.profile.contacts[key]}/>
            )}
        </div>
    )
}
const Contact = ({contactTitle, contactBody}) => {
    return (
        <span><b>{contactTitle}:</b>{contactBody}</span>
    )
}

export default ProfileData;