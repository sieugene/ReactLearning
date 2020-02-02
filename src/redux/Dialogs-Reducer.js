import {DialogsAPI, ProfileAPI} from "../Api/Api";
import {useDebugValue} from "react";

const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_MESSAGES_WITH_FRIEND = 'SET_MESSAGES_WITH_FRIEND'
const SET_COUNT_NEW_MESSAGES = 'SET_COUNT_NEW_MESSAGES';
const SET_CURRENT_USER_IN_CHAT = 'SET_CURRENT_USER_IN_CHAT';
const SET_SUCCESS_LOADING = 'SET_SUCCESS_LOADING'

let initialState = {
    listDialogs: [],
    messagesWithFriend: {
        items: [],
        totalCount: null
    },
    countNesMessages: null,
    currentUserInChat: [],
    loading: false
}

const DialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_DIALOGS:
            return {
                ...state,
                ...state.listDialogs,
                listDialogs: action.allDialogs
            }
        case SET_MESSAGES_WITH_FRIEND:
            return {
                ...state,
                messagesWithFriend: {
                    ...state.messagesWithFriend,
                    items: action.messages
                },

            }
        case SET_COUNT_NEW_MESSAGES:
            return {
                ...state,
                countNesMessages: action.countNesMessages
            }
        case SET_CURRENT_USER_IN_CHAT:
            return {
                ...state,
                currentUserInChat: action.profile
            }
        case SET_SUCCESS_LOADING: {
                return{
                    ...state,
                    loading: action.loading
                }
            }
        default:
            return state
    }
}


export const setAllDialogsAC = (allDialogs) => {
    return {
        type: SET_ALL_DIALOGS, allDialogs
    }
}
export const setCountNewMessages = (countNesMessages) => {
    return {
        type: SET_COUNT_NEW_MESSAGES, countNesMessages
    }
}

export const setCurrentUserInChatAC = (profile) => {
    return {
        type: SET_CURRENT_USER_IN_CHAT, profile
    }
}


export const setMessagesListWithFriendAC = (messages, totalCount) => {
    return {
        type: SET_MESSAGES_WITH_FRIEND, messages, totalCount
    }
}

export const setSuccessLoadingAC = (loading) => {
    return{
        type: SET_SUCCESS_LOADING, loading
    }
}

export const startChattingThunkCreator = (userId) => async (dispatch) => {
    let response = await DialogsAPI.startChatting(userId)
    console.log('startChatting')
    console.log(response)
}

export const getAllDialogsThunkCreator = () => async (dispatch) => {
    dispatch(setSuccessLoadingAC(true));
    let response = await DialogsAPI.getAllDialogs()
    dispatch(setSuccessLoadingAC(false));
    console.log('getAllDialogs')
    dispatch(setAllDialogsAC(response.data));
    console.log(response.data)
}


export const getListMessagesWithFriendThunkCreator = (userId) => async (dispatch) => {
    let response = await DialogsAPI.getListMessagesWithFriend(userId)
    dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
    console.log('getListMessagesWithFriend');
    console.log(response.data)
    //set current user in chat
      response = await ProfileAPI.getProfile(userId)
    dispatch(setCurrentUserInChatAC(response.data))
    Promise.all([response]).then( values => {
        dispatch(setSuccessLoadingAC(false));
    })

}

export const sendMessageToFriendThunkCreator = (userId, newMessage) => async (dispatch) => {
    await DialogsAPI.sendMessageToFriend(userId, newMessage);
    dispatch(getListMessagesWithFriendThunkCreator(userId));
}

export const getListNewMessagesThunkCreator = (userId) => async (dispatch) => {
    let response = await DialogsAPI.listNewMessage();
    dispatch(setCountNewMessages(response.data))
    console.log('getListNewMessages');
    console.log(response.data)
}

export const getReturnMessageDateThunkCreator = (userId,date) => async(dispatch) => {
    let response = await DialogsAPI.returnMessageThanDate(userId,date);
    dispatch(setMessagesListWithFriendAC(response.data));
}



export default DialogsReducer;