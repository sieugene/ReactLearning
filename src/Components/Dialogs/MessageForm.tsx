import React from 'react';
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { SendMessageFormDataType } from './Messages';

type PropsType = {
    disabledForm: boolean
}

const MessageForm:React.FC<InjectedFormProps<SendMessageFormDataType> & PropsType> = (props) => {
    const handleKeyPress = (event:React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.shiftKey) {
            return false
        }
        if (event.key === 'Enter') {
            // @ts-ignore
            return props.handleSubmit()
        }
    }
    const disableForm = props.disabledForm
    return (
        <form onSubmit={props.handleSubmit} className={'mobileBottom'}>
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

export const ReduxMessageForm = reduxForm<SendMessageFormDataType,PropsType>({ form: 'Message' })(MessageForm)
