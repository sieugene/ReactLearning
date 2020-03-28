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


class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { load: false };
    }
    componentDidMount() {
        this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
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
            <Messages {...this.props} />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        messagesWithFriend: state.dialogs.messagesWithFriend,
        listDialogs: state.dialogs.listDialogs,
        currentUserInChat: state.dialogs.currentUserInChat,
        authUserPhoto: state.app.userPhoto,
        id: state.Auth.id
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        getListMessagesWithFriendThunk: getListMessagesWithFriendThunkCreator,
        sendMessageToFriendThunk: sendMessageToFriendThunkCreator,
        getReturnMessageDateThunk: getReturnMessageDateThunkCreator,
        syncMessagesWithFrinedThunk: syncMessagesWithFrinedThunkCreator
    })
)(MessagesContainer)
