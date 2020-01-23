import React from 'react';
import s from "./Dialogs.module.css";
import {ReduxMessageForm} from "./MessageForm";
import userPhoto from './../../assets/images/userPhoto.png'

const Messages = (props) => {
    let userId = props.match.params.userId;
    let onTextInMessage = (formData) => {
        props.sendMessageToFriendThunk(userId, formData.newMessage)
    }
    //take current user photo
    let getCurrentUserPhoto = props.currentUserInChat.length === 0 ? '' :
        !props.currentUserInChat.photos.large || !props.currentUserInChat.photos.small ?
            <img src={userPhoto}/> : <img src={props.currentUserInChat.photos.large}/>;
    //take auth profile photo
    let getUserPhoto = !props.authUserPhoto ? ' ' :
        <img src={props.authUserPhoto.small}/> || <img src={props.authUserPhoto.large}/>

    return (
        <div className={s.messagesContain}>
            {props.currentUserInChat.length === 0 ? '' :
                <div className={s.chatTittle}>
                    <h3>{props.currentUserInChat.fullName}</h3>
                    {getCurrentUserPhoto}
                </div>
            }
            <div className={s.mainChatBlock}>
                <div className={s.chatBody}>
                    {props.messagesWithFriend.items.length === 0 ? 'You don\'t have messages with this user' :
                        props.messagesWithFriend.items.map(m => <div key={m.id} className={s.messagesWithFriendId}>
                            {m.senderId == userId ?
                                getCurrentUserPhoto
                                :
                                getUserPhoto
                            }
                            <div>Id: {m.id}</div>
                            <div>Body: {m.body}</div>
                            <div>AddedAt: {m.addedAt}</div>
                            <div>SenderId: {m.senderId}</div>
                            <div>SenderName: {m.senderName}</div>
                            <div>recipientId: {m.recipientId}</div>
                        </div>)
                    }
                </div>
            </div>
            <ReduxMessageForm onSubmit={onTextInMessage}/>
        </div>
    )
}

export default Messages;