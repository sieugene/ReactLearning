import React from 'react';
import {Field, reduxForm} from "redux-form";
import {InputMessage} from "../../assets/FormControl/FormsControls";
import s from "./Profile.module.css";

const ProfileDataForm = (props) => {
    return (
        <div className={s.infoProfile}>
            <form onSubmit={props.handleSubmit}>
                <button className={s.saveButton}>Save</button>
                {props.error &&
                    <div className={s.someError}>
                        {props.error}
                    </div>
                }
                <br/>
                <span><b>About me: </b> <p>{props.profile.aboutMe}</p></span>
                <Field placeholder='About me' name='aboutMe' component={InputMessage}/>
                <span><b>Full name: </b> <p>{props.profile.fullName}</p></span>
                <Field placeholder='Full Name' name='fullName' component={InputMessage}/>
                <span><b>Seek work: </b> <p>{props.profile.lookingForAJob ? 'yes' : 'no'}</p></span>
                <Field placeholder='Looking for a job' type="checkbox" name='lookingForAJob' component={InputMessage}/>
                <span><b>Description of the search: </b> <p>{props.profile.lookingForAJobDescription}</p></span>
                <Field placeholder='Looking for a job desc' name='lookingForAJobDescription' component={InputMessage}/>
                {Object.keys(props.profile.contacts).map(key =>
                    <Contact key={key} contactTitle={key} contactBody={props.profile.contacts[key]}/>
                )}
            </form>
        </div>
    )
}
const Contact = ({contactTitle, contactBody}) => {
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
                   name={`contacts.${contactTitle}`} component={InputMessage}/>
        </div>
    )
}
const ReduxEditProfile = reduxForm({form: 'editProfile'})(ProfileDataForm)

export default ReduxEditProfile;
