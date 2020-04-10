import React from 'react';
import s from "./Dialogs.module.css";
import { ReduxMessageForm } from "./MessageForm";
import { NavLink } from "react-router-dom";
import { CurrentUserType, MessageItemType } from "./../../Types/DialogsTypes"
import Preloader from '../../assets/preloader/Preloader';
import {CurrentUserPhoto} from '../../assets/Helpers/HelperDialog';
import Message from './Message';


type PropsType = {
    userId: number
    sendMessageToFriendThunk: (userId: number, newMessage: string) => void
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
    disabledForm: boolean
}
export type SendMessageFormDataType = {
    userId: number,
    newMessage: string
}

const Messages: React.FC<PropsType> = (props) => {
    let userId = props.userId;
    //problems with the typing of the form data
    let onTextInMessage = (formData: SendMessageFormDataType) => {
        props.sendMessageToFriendThunk(userId, formData.newMessage)
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
                                    <CurrentUserPhoto currentUserInChat={props.currentUserInChat} />
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
                                    props.messagesWithFriend.items.map(m =>
                                        <Message key={m.id}
                                            id={m.id}
                                            viewed={m.viewed}
                                            senderId={m.senderId}
                                            currentUserInChat={props.currentUserInChat}
                                            DeleteMessageTC={props.DeleteMessageTC}
                                            userId={userId}
                                            authUserPhoto={props.authUserPhoto}
                                            senderName={m.senderName}
                                            addedAt={m.addedAt}
                                            body={m.body}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReduxMessageForm onSubmit={onTextInMessage} {...props} />
        </div>
    )
}

export default Messages;