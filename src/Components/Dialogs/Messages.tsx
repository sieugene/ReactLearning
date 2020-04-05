import React from 'react';
import s from "./Dialogs.module.css";
import { ReduxMessageForm } from "./MessageForm";
import userPhoto from './../../assets/images/userPhoto.png'
import { NavLink } from "react-router-dom";
import { CurrentUserType, MessageItemType } from "./../../Types/DialogsTypes"
import Preloader from '../../assets/preloader/Preloader';



type PropsType = {
    userId: number
    sendMessageToFriendThunk: (userId: number, newMessage: string | null) => void
    currentUserInChat: CurrentUserType | {} | any
    authUserPhoto: {
        small: string | null
        large: string | null
    }
    messagesWithFriend: {
        items: MessageItemType[],
        totalCount: number | null
    };
    getReturnMessageDateThunk: (userId: number, date: string) => void
    loading: boolean
    DeleteMessageTC: (messageId: string, userId: number) => void
}

const Messages: React.FC<PropsType> = (props) => {
    let userId = props.userId;
    //problems with the typing of the form data
    let onTextInMessage = (formData: any) => {
        props.sendMessageToFriendThunk(userId, formData.newMessage)
    }

    const regEx = /[^\d:]/g;
    const addedAt = (date: string) => {
        let format = date.substr(date.length - 12)
        let result = format.replace(regEx, '')
        return result.split(':')[0] + ':' + result.split(':')[1];
    }

    //take current user photo

    let getCurrentUserPhoto = !props.currentUserInChat.photos ? ' ' :
        !props.currentUserInChat.photos.large || !props.currentUserInChat.photos.small ?
            <img src={userPhoto} alt={''} /> : <img src={props.currentUserInChat.photos.large} alt={''} />;
    //take auth profile photo
    let getUserPhoto = !props.authUserPhoto.small || !props.authUserPhoto.large ? ' ' :
        <img src={props.authUserPhoto.small} alt={''} /> || <img src={props.authUserPhoto.large} alt={''} />

    const confirmmDeletingMessage = (id: string, userId: number) => {
        let isConfirm = window.confirm(`delete a message?`);
        if (isConfirm) {
            props.DeleteMessageTC(id, userId)
        }
    }
    let alignMessage = (senderId: number) => {
        if(props.currentUserInChat.userId === senderId){
            return ' ' + s.leftAlignMessage
        }else{
            return ' ' + s.rightAlignMessage
        }
    }
    if (props.loading) {
        return <Preloader />
    }
    return (
        <div className="message__main container">
            <div className="row">
                <div className="col s12">
                    <div className={s.messagesContain}>
                        {!props.currentUserInChat ? '' :
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
                                        s.messagesWithFriendId + alignMessage(m.senderId) : s.notViewedMessage + alignMessage(m.senderId)}
                                        onClick={() => { confirmmDeletingMessage(m.id, props.currentUserInChat.userId) }}>
                                        <div className={s.main__img__username}>
                                            {m.senderId === Number(userId) ?
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