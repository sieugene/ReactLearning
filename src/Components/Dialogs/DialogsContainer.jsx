import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {
    getAllDialogsThunkCreator,
    getListMessagesWithFriendThunkCreator, sendMessageToFriendThunkCreator,
    startChattingThunkCreator
} from "../../redux/Dialogs-Reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";




let mapStateToProps = (state) => {
    return {
        messages: state.dialogs.messages,
        listDialogs: state.dialogs.listDialogs,
        messagesWithFriends: state.dialogs.messagesWithFriends
    }
}

export const DialogsContainer = compose(
    withRouter,
    connect(mapStateToProps,{
        startChattingThunk:startChattingThunkCreator,
        getAllDialogsThunk: getAllDialogsThunkCreator,
        getListMessagesWithFriendThunk: getListMessagesWithFriendThunkCreator,
        sendMessageToFriendThunk: sendMessageToFriendThunkCreator
    })
)(Dialogs)
