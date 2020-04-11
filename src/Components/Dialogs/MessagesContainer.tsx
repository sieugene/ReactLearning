import React from 'react';
import { connect } from "react-redux";
import {
    getListMessagesWithFriendThunkCreator, getReturnMessageDateThunkCreator, sendMessageToFriendThunkCreator,
    DeleteMessageTC
} from "../../redux/Dialogs-Reducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Messages from "./Messages";
import { AppStateType } from '../../redux/store-redux';
import { MessageItemType, CurrentUserType } from '../../Types/DialogsTypes';
import { withAuthRedirect } from './../HOC/AuthRedirectHOC';

type MapStateType = {
    id: number | null
    messagesWithFriend: {
        items: MessageItemType[],
        totalCount: number
    }
    currentUserInChat: CurrentUserType | {}
    authUserPhoto: {
        small: string | null
        large: string | null
    }
    loading: boolean
    disabledForm: boolean
}
type MapDispatchType = {
    getListMessagesWithFriendThunk: (userId: number) => void
    sendMessageToFriendThunk: (userId: number, newMessage: string) => void
    getReturnMessageDateThunk: (userId: number, date: string) => void
    DeleteMessageTC: (messageId: string, userId: number) => void
}
type OwnPropsType = {
    ClearIntreval: () => void,
    SyncInterval: (userId: number) => void
}
type WithRouterType = {
    match: {
        params: {
            userId: number
        }
    }
}
type PropsType = MapStateType & MapDispatchType & WithRouterType & OwnPropsType

class MessagesContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
        this.state = { load: false };
    }
    componentDidMount() {
        this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps: PropsType) {
        this.props.ClearIntreval();
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
            this.props.ClearIntreval();
        } else if (prevProps.match.params.userId === this.props.match.params.userId) {
            this.props.SyncInterval(this.props.match.params.userId);
        }
    }
    render() {
        return (
            <Messages userId={this.props.match.params.userId}
                sendMessageToFriendThunk={this.props.sendMessageToFriendThunk}
                currentUserInChat={this.props.currentUserInChat}
                authUserPhoto={this.props.authUserPhoto}
                messagesWithFriend={this.props.messagesWithFriend}
                getReturnMessageDateThunk={this.props.getReturnMessageDateThunk}
                loading={this.props.loading}
                DeleteMessageTC={this.props.DeleteMessageTC}
                disabledForm={this.props.disabledForm}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        messagesWithFriend: state.dialogs.messagesWithFriend,
        currentUserInChat: state.dialogs.currentUserInChat,
        authUserPhoto: state.app.userPhoto,
        id: state.Auth.id,
        loading: state.dialogs.loading,
        disabledForm: state.dialogs.disabledForm
    }
}
//<MapStateType,MapDispatchType,null,AppStateType>


export default compose(
    withRouter,
    withAuthRedirect,
    connect<MapStateType, MapDispatchType, null, AppStateType>(mapStateToProps, {
        getListMessagesWithFriendThunk: getListMessagesWithFriendThunkCreator,
        sendMessageToFriendThunk: sendMessageToFriendThunkCreator,
        getReturnMessageDateThunk: getReturnMessageDateThunkCreator,
        DeleteMessageTC
    })
)(MessagesContainer)
