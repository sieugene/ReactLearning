import React from 'react';
import s from "./Dialogs.module.css";
import { ReduxMessageForm } from "./MessageForm";
import userPhoto from './../../assets/images/userPhoto.png'
import { NavLink } from "react-router-dom";

const Messages = (props) => {
    let userId = props.match.params.userId;
    let onTextInMessage = (formData) => {
        props.sendMessageToFriendThunk(userId, formData.newMessage)
    }

    const regEx = /[^\d:]/g;
    const addedAt = (date) => {
        let format = date.substr(date.length - 12)
        let result = format.replace(regEx, '')
        return result.split(':')[0] + ':' + result.split(':')[1];
    }

    //take current user photo
    let getCurrentUserPhoto = props.currentUserInChat.length === 0 ? '' :
        !props.currentUserInChat.photos.large || !props.currentUserInChat.photos.small ?
            <img src={userPhoto} alt={''} /> : <img src={props.currentUserInChat.photos.large} alt={''} />;
    //take auth profile photo
    let getUserPhoto = !props.authUserPhoto ? ' ' :
        <img src={props.authUserPhoto.small} alt={''} /> || <img src={props.authUserPhoto.large} alt={''} />
    return (
        <div className="message__main container">
            <div className="row">
                <div className="col s12">
                    <div className={s.messagesContain}>
                        {props.currentUserInChat.length === 0 ? '' :
                            <div className={s.chatTittle}>
                                <h3 className='left-align'>
                                    <NavLink to='/Dialogs'>
                                        Back
                                    </NavLink>
                                </h3>
                                <h3 className='center-align'>{props.currentUserInChat.fullName}</h3>
                                <NavLink to={'/profile/' + userId}>
                                    {getCurrentUserPhoto}
                                </NavLink>
                            </div>
                        }
                        <div className={s.mainChatBlock}>
                            <div className={s.chatBody}>
                                {props.messagesWithFriend.items.length >= 10 &&
                                    <button className={s.past__messages} onClick={() => {
                                        props.getReturnMessageDateThunk(props.currentUserInChat.userId, '2020.01.01')
                                    }}>
                                        Past messages
                                    </button>
                                }
                                {props.messagesWithFriend.items.length === 0 ? 'You don\'t have messages with this user' :
                                    props.messagesWithFriend.items.map(m => <div key={m.id} className={m.viewed === true ?
                                        s.messagesWithFriendId : s.notViewedMessage}>
                                        <div className={s.main__img__username}>
                                            {m.senderId === userId ?
                                                getCurrentUserPhoto
                                                :
                                                getUserPhoto
                                            }
                                            <h4>{m.senderName}</h4>
                                            <div className={s.dateAdded}>{addedAt(m.addedAt)}</div>
                                        </div>
                                        {/*<div>Id: {m.id}</div>*/}
                                        {/*check read message*/}
                                        {/*<div>SenderId: {m.senderId}</div>*/}
                                        {/*<div>recipientId: {m.recipientId}</div>*/}
                                        <div className={s.chatText}>{m.body}</div>
                                    </div>)
                                }
                            </div>
                        </div>
                        <ReduxMessageForm onSubmit={onTextInMessage} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages;