import React from 'react';
import {Field, reduxForm} from "redux-form";
import s from './MessagesForm.module.css'

const MessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className={s.container}>
            <Field name='newMessage' placeholder='Write a message' component='input'/>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const ReduxMessageForm = reduxForm({form:'Message'})(MessageForm)

