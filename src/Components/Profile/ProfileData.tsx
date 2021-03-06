import s from "./Profile.module.css";
import React from "react";
import { ProfileType } from './../../Types/ProfileTypes'

type PropsType = {
    id: number | null
    urlMatchParams: string
    setEditProfile: (editMode: boolean) => void
    profile: ProfileType
    status: string | null
}

const ProfileData: React.FC<PropsType> = (props) => {
    return (
        <div className={s.infoProfile}>
            <div className={s.editButton}>
                {props.id === Number(props.urlMatchParams) &&
                    <p className='waves-effect waves-light btn-small indigo lighten-4 black-text mb10' onClick={() => {
                        props.setEditProfile(true)
                    }}>Edit
                </p>
                }
            </div>
            <hr />
            <div className="row">
                <div className="col s6">
                    <b>About me: </b>
                </div>
                <div className="col s6 right-align">
                    <p>{props.profile.aboutMe}</p>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <b>Full name: </b>
                </div>
                <div className="col s6 right-align">
                    <p>{props.profile.fullName}</p>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <b>Status:</b>
                </div>
                <div className="col s6 right-align">
                    <p>{props.status}</p>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <b>Seek work: </b>
                </div>
                <div className="col s6 right-align">
                    <p>{props.profile.lookingForAJob ? 'yes' : 'no'}</p>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <b>Description of the search: </b>
                </div>
                <div className="col s6 right-align">
                    <p>{props.profile.lookingForAJobDescription}</p>
                </div>
            </div>
            {Object.keys(props.profile.contacts).map((key: any) =>
                <Contact key={key} contactTitle={key} contactBody={props.profile.contacts[key]} />
            )}
        </div>
    )
}
type ContactsType = {
    contactTitle: string
    contactBody: string | {}
}
const Contact: React.FC<ContactsType> = ({ contactTitle, contactBody }) => {
    return (
        <div>
            {!!contactBody &&
                <div className="row">
                    <div className="col s4">
                        <b>{contactTitle}: </b>
                    </div>
                    <div className="col s8 right-align">
                        {typeof (contactBody) === "string" ?
                            <a href={contactBody} target="_blank" rel="noopener noreferrer">
                                {contactBody}
                            </a>
                            :
                            ' ' + console.log('ERR_3000__contact')
                        }
                    </div>
                </div>
            }
        </div>

    )
}

export default ProfileData;