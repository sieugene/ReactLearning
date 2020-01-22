import s from "./Profile.module.css";
import React from "react";


const ProfileData = (props) => {
    return (
        <div className={s.infoProfile}>
            <div className={s.editButton}>
                {props.id == props.urlMatchParams &&
                <button onClick={() => {
                    props.setEditProfile(true)
                }}>Edit
                </button>
                }
            </div>
            <hr/>
            <span><b>About me: </b> <p>{props.profile.aboutMe}</p></span>
            <span><b>Full name: </b> <p>{props.profile.fullName}</p></span>
            <span><b>Status:</b> <p>{props.status}</p></span>
            <span><b>Seek work: </b> <p>{props.profile.lookingForAJob ? 'yes' : 'no'}</p></span>
            <span><b>Description of the search: </b> <p>{props.profile.lookingForAJobDescription}</p></span>
            {Object.keys(props.profile.contacts).map(key =>
                <Contact key={key} contactTitle={key} contactBody={props.profile.contacts[key]}/>
            )}
        </div>
    )
}
const Contact = ({contactTitle, contactBody}) => {
    return (
        <div>
            {!!contactBody &&
            <span>
                <b>{contactTitle}: </b>
                    <p>
                        <a href={contactBody} target="_blank" rel="noopener noreferrer">
                            {contactBody}
                        </a>
                    </p>
            </span>
            }
        </div>

    )
}

export default ProfileData;