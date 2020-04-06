import React from 'react';
import { Field, reduxForm } from "redux-form";
import s from './MessagesForm.module.css'


const MessageForm = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            return false
        }
        if (event.key === 'Enter') {
            props.handleSubmit();
        }
    }
    const disableForm = props.disabledForm
    return (
        <form onSubmit={props.handleSubmit} className={s.container}>
            <div className="row p10">
                <div className="col s1"></div>
                <div className="col xl10 m9 l9 s9">
                    <Field name='newMessage' placeholder='Start writing, shift + enter to go to the next line' component='textarea' className="message-textarea"
                        onKeyPress={handleKeyPress}
                        disabled={disableForm}
                    />
                </div>
                <div className="col xl1 m2 l2 s2 center-align">
                    <button className='btn-Medium transparent sendMessage pt25' disabled={disableForm}>
                        <i className="Medium material-icons black-text">send</i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export const ReduxMessageForm = reduxForm({ form: 'Message' })(MessageForm)
