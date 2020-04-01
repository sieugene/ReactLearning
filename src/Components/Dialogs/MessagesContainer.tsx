import React from 'react';
import { connect } from "react-redux";
import {
    getListMessagesWithFriendThunkCreator, getReturnMessageDateThunkCreator, sendMessageToFriendThunkCreator,
    syncMessagesWithFrinedThunkCreator
} from "../../redux/Dialogs-Reducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Messages from "./Messages";
import {Redirect} from "react-router-dom";
import { AppStateType } from '../../redux/store-redux';
import { MessageItemType, CurrentUserType } from '../../Types/DialogsTypes';

type MapStateType = {
    id: number | null
    messagesWithFriend: {
        items: MessageItemType[],
        totalCount: number | null
    }
    currentUserInChat: CurrentUserType | {}
    authUserPhoto: {
        small: string | null
        large: string | null
    }
}
type MapDispatchType = {
    getListMessagesWithFriendThunk: (userId: number) => void
    SyncInterval: (userId: number) => void
    ClearIntreval: () => void
    sendMessageToFriendThunk: (userId: number, newMessage: string | null) => void
    getReturnMessageDateThunk: (userId: number, date: string) => void
}
type WithRouterType = {
    match:{
        params:{
            userId: number
        }
    }
}
type PropsType = MapStateType & MapDispatchType & WithRouterType

class MessagesContainer extends React.Component<PropsType> {
    constructor(props:PropsType) {
        super(props);
        this.state = { load: false };
    }
    componentDidMount() {
        this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps:PropsType) {
        this.props.ClearIntreval();
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
            this.props.ClearIntreval();
        } else if (prevProps.match.params.userId === this.props.match.params.userId) {
            this.props.SyncInterval(this.props.match.params.userId);
        }
    }
    render() {
        if(!this.props.id){
            return <Redirect to={'/login'}/>
        }
        return (
            <Messages userId={this.props.match.params.userId} 
            sendMessageToFriendThunk={this.props.sendMessageToFriendThunk} 
            currentUserInChat={this.props.currentUserInChat}
            authUserPhoto={this.props.authUserPhoto}
            messagesWithFriend={this.props.messagesWithFriend}
            getReturnMessageDateThunk={this.props.getReturnMessageDateThunk}
            />
        )
    }
}
let mapStateToProps = (state: AppStateType):MapStateType => {
    return {
        messagesWithFriend: state.dialogs.messagesWithFriend,
        currentUserInChat: state.dialogs.currentUserInChat,
        authUserPhoto: state.app.userPhoto,
        id: state.Auth.id
    }
}
//<MapStateType,MapDispatchType,null,AppStateType>
export default compose(
    withRouter,
    connect(mapStateToProps, {
        getListMessagesWithFriendThunk: getListMessagesWithFriendThunkCreator,
        sendMessageToFriendThunk: sendMessageToFriendThunkCreator,
        getReturnMessageDateThunk: getReturnMessageDateThunkCreator,
        syncMessagesWithFrinedThunk: syncMessagesWithFrinedThunkCreator
    })
)(MessagesContainer)
