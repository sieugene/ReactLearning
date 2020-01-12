import React from 'react';
import s from './UserMessage.module.css';
import {Field, reduxForm} from "redux-form";
import UserMessage from "./UserMessage";
import {InputMessage} from "../../assets/FormControl/FormsControls";
import {required} from "../utils/validators/validators";


const Info = (props) => {
    //map getting users
    let getUsers = props.Users.map(u =>
        <UserMessage message={u.message} key={u.id} id={u.id} name={u.name} img={u.img}/>);
    //onSubmit for redux-form
    let addMessage = (formData) => {
        props.NewAddMessage(formData.userTextMessage);
    }
    //creating form
    const AddMessageForm = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <Field placeholder='write a message'
                       validate={[required]} name='userTextMessage' component={InputMessage}/>
                <button>ok</button>
            </form>
        )
    }
    //create redux-form
    const AddMessageReduxForm = reduxForm({form: 'AddMessage'})(AddMessageForm);
    return (
        <div>
            <div className={s.main__block}>
                {getUsers}
                <AddMessageReduxForm onSubmit={addMessage}/>
            </div>

        </div>
    )
}
export default Info;