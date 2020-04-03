import React from 'react';
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { InputMessage } from "../../assets/FormControl/FormsControls";
import s from "./Profile.module.css";
import { ProfileType } from '../../Types/ProfileTypes';

type PropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>> = (props) => {
    return (
        <div className={s.infoProfile}>
            <form onSubmit={props.handleSubmit}>
                <button className='waves-effect waves-light btn-small indigo darken-4 mb10'>Save</button>
                {props.error &&
                    <div className={s.someError}>
                        {props.error}
                    </div>
                }
                <br />
                <span><b>About me:</b></span>
                <Field placeholder='About me' name='aboutMe' component={InputMessage} />
                <span><b>Full name: </b></span>
                <Field placeholder='Full Name' name='fullName' component={InputMessage} />
                <span><b>Seek work: </b></span>
                <Field placeholder='Looking for a job' type="checkbox" name='lookingForAJob' component={InputMessage} />
                <span><b>Description of the search: </b></span>
                <Field placeholder='Looking for a job desc' name='lookingForAJobDescription' component={InputMessage} />
                {Object.keys(props.profile.contacts).map(key =>
                    <Contact key={key} contactTitle={key} contactBody={''} />
                )}
            </form>
        </div>
    )
}
type ContactsType = {
    contactTitle: string
    contactBody: string
}
const Contact: React.FC<ContactsType> = ({ contactTitle, contactBody }) => {
    return (
        <div>
            <span>
                <b>{contactTitle}: </b>
                <p>
                    <a href={contactBody} target="_blank" rel="noopener noreferrer">
                        {contactBody}
                    </a>
                </p>
            </span>
            <Field placeholder={`https://www.${contactTitle}.com`}
                name={`contacts.${contactTitle}`} component={InputMessage} />
        </div>
    )
}
const ReduxEditProfile = reduxForm<{}, PropsType>({ form: 'editProfile' })(ProfileDataForm)

export default ReduxEditProfile;

