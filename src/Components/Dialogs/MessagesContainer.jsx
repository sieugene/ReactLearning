import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
    getListMessagesWithFriendThunkCreator, getReturnMessageDateThunkCreator, sendMessageToFriendThunkCreator,
    syncMessagesWithFrinedThunkCreator
} from "../../redux/Dialogs-Reducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Messages from "./Messages";


class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { load: false };
    }
    componentDidMount() {
        this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
    }
    componentDidUpdate(prevProps) {
        clearInterval(this.timerID);
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.getListMessagesWithFriendThunk(this.props.match.params.userId);
            clearInterval(this.timerID);
        } else if (prevProps.match.params.userId === this.props.match.params.userId) {
            this.timerID = setInterval(
                () => this.props.syncMessagesWithFrinedThunk(this.props.match.params.userId),
                5000
            );
        }
    }
    render() {
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
        authUserPhoto: state.app.userPhoto
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
