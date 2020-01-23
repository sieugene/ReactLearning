import React from 'react';
import {Field, reduxForm} from "redux-form";


const MessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field name='newMessage' placeholder='Write a message' component='input'/>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const ReduxMessageForm = reduxForm({form:'Message'})(MessageForm)

