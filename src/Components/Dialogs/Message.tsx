import React from 'react';
import { CurrentUserType } from '../../Types/DialogsTypes';
import { confirmmDeletingMessage, AuthUserPhoto } from '../../assets/Helpers/HelperDialog';
import s from "./Dialogs.module.css";
import { CurrentUserPhoto } from './../../assets/Helpers/HelperDialog';
import { formatDate } from './../../assets/Helpers/HelperDialog';


type PropsType = {
    userId: number
    currentUserInChat: CurrentUserType | {} | any
    DeleteMessageTC: (messageId: string, userId: number) => void
    authUserPhoto: {
        small: string | null
        large: string | null
    }
    id: string
    body: string
    addedAt: string
    senderId: number
    senderName: string
    viewed: boolean
    translatedBody?: null
    recipientId?: number
    recipientName?: string
    deletedBySender?: boolean
    deletedByRecipient?: boolean
    isSpam?: boolean
    distributionId?: null
}


const Message: React.FC<PropsType> = (props) => {
    let alignMessage = (senderId: number) => {
        if (props.currentUserInChat.userId === senderId) {
            return ' ' + s.leftAlignMessage
        } else {
            return ' ' + s.rightAlignMessage
        }
    }
    let userId = props.userId;
    return (
        <div className={props.viewed === true ?
            s.messagesWithFriendId + alignMessage(props.senderId) : s.notViewedMessage + alignMessage(props.senderId)}
            onClick={() => { confirmmDeletingMessage(props.id, props.currentUserInChat.userId, props.DeleteMessageTC) }}>
            <div className={s.main__img__username}>
                {props.senderId === Number(userId) ?
                    <CurrentUserPhoto currentUserInChat={props.currentUserInChat} />
                    :
                    <AuthUserPhoto authUserPhoto={props.authUserPhoto} />
                }
                <h4>{props.senderName}</h4>
                <div className={s.dateAdded}>{formatDate(props.addedAt)}</div>
            </div>
            {/*<div>Id: {m.id}</div>*/}
            {/*check read message*/}
            {/*<div>SenderId: {m.senderId}</div>*/}
            {/*<div>recipientId: {m.recipientId}</div>*/}
            <div className={s.chatText}>{props.body}</div>
        </div>
    )
}

export default Message