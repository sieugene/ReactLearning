import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    getListMessagesWithFriendThunkCreator,sendMessageToFriendThunkCreator,
} from "../../redux/Dialogs-Reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Messages from "./Messages";


const MessagesContainer = (props) => {
    let userId = props.match.params.userId;
    useEffect(() => {
        props.getListMessagesWithFriendThunk(userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return(
        <div>
            <Messages {...props}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        messagesWithFriend: state.dialogs.messagesWithFriend,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps,{
        getListMessagesWithFriendThunk: getListMessagesWithFriendThunkCreator,
        sendMessageToFriendThunk: sendMessageToFriendThunkCreator,
    })
)(MessagesContainer)
