import React from 'react';
import s from './UserMessage/UserMessage.module.css';


const Info = (props) => {

    let textMesssage = React.createRef();
    let onChangeMessage = (text) => {
        text = textMesssage.current.value
        props.UpdateChangeMessage(text);
    }
    let addMessage = () => {
        props.NewAddMessage();
    }

    return (
        <div>
            <div className={s.main__block}>
                {props.getUsers}
                <input placeholder='write a message' ref={textMesssage}
                       value={props.userMessage.infoPage.userMessage}
                       onChange={onChangeMessage}
                />
                <button onClick={addMessage}>ok</button>
            </div>

        </div>
    )
}
export default Info;