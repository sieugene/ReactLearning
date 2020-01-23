import React, {useEffect} from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {
    getAllDialogsThunkCreator,
    getListMessagesWithFriendThunkCreator, getListNewMessagesThunkCreator, sendMessageToFriendThunkCreator,
    startChattingThunkCreator
} from "../../redux/Dialogs-Reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


const DialogsContainer = (props) => {
    useEffect(()=>{
        props.getAllDialogsThunk();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <Dialogs {...props}/>
    )
}



let mapStateToProps = (state) => {
    return {
        listDialogs: state.dialogs.listDialogs,
        messagesWithFriend: state.dialogs.messagesWithFriend,
        countNesMessages: state.dialogs.countNesMessages
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps,{
        startChattingThunk:startChattingThunkCreator,
        getAllDialogsThunk: getAllDialogsThunkCreator,
        getListMessagesWithFriendThunk: getListMessagesWithFriendThunkCreator,
        sendMessageToFriendThunk: sendMessageToFriendThunkCreator,
        getListNewMessagesThunk: getListNewMessagesThunkCreator
    })
)(DialogsContainer)
