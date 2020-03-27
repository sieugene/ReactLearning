import React from 'react';
import { Field, reduxForm } from "redux-form";
import s from './MessagesForm.module.css'

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.container}>
            <div className="row p10">
                <div className="col s10">
                    <Field name='newMessage' placeholder='Write a message' component='textarea' class="materialize-textarea" />
                </div>
                <div className="col s2 center-align">
                    <button className='btn-Medium transparent sendMessage pt25'>
                        <i class="Medium material-icons black-text">send</i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export const ReduxMessageForm = reduxForm({ form: 'Message' })(MessageForm)

