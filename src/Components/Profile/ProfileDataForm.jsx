import React from 'react';
import {Field, reduxForm} from "redux-form";
import {InputMessage} from "../../assets/FormControl/FormsControls";
import s from "./Profile.module.css";

const ProfileDataForm = (props) => {
    return (
        <div className={s.profileContain}>
            <form onSubmit={props.handleSubmit}>
                <button>Save</button>
                {props.error &&
                    <div className={s.someError}>
                        {props.error}
                    </div>
                }
                <br/>
                <span>AboutMe: {props.profile.aboutMe}<br/></span>
                <Field placeholder='About me' name='aboutMe' component={InputMessage}/>
                <span>FullName: {props.profile.fullName}<br/></span>
                <Field placeholder='Full Name' name='fullName' component={InputMessage}/>
                <span>lookingForAJob: {props.profile.lookingForAJob}</span>
                <Field placeholder='Looking for a job' type="checkbox" name='lookingForAJob' component={InputMessage}/>
                <span>lookingForAJobDescription: {props.profile.lookingForAJobDescription}</span>
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
            <b>{contactTitle}:</b>{contactBody}
            <Field placeholder={`https://www.${contactTitle}.com`}
                   name={`contacts.${contactTitle}`} component={InputMessage}/>
        </div>
    )
}
const ReduxEditProfile = reduxForm({form: 'editProfile'})(ProfileDataForm)

export default ReduxEditProfile;
