import React from 'react';
import s from "./Dialogs.module.css";
import {ReduxMessageForm} from "./MessageForm";


const Messages = (props) => {
    let userId = props.match.params.userId;
    let onTextInMessage = (formData) => {
        props.sendMessageToFriendThunk(userId,formData.newMessage)
    }
    return(
        <div>
            <h3>get List message with Friend[params userId {userId}]</h3>
            {props.messagesWithFriend.items.length === 0 ? 'You don\'t have messages with this user' :
                props.messagesWithFriend.items.map(m => <div key={m.id} className={s.messagesWithFriendId}>
                    <div>Id: {m.id}</div>
                    <div>Body: {m.body}</div>
                    <div>AddedAt: {m.addedAt}</div>
                    <div>SenderId: {m.senderId}</div>
                    <div>SenderName: {m.senderName}</div>
                    <div>recipientId: {m.recipientId}</div>
                </div>)
            }
            <div>
                <ReduxMessageForm onSubmit={onTextInMessage}/>
            </div>
        </div>
    )
}

export default Messages;