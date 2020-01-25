import {DialogsAPI, ProfileAPI} from "../Api/Api";

const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_MESSAGES_WITH_FRIEND = 'SET_MESSAGES_WITH_FRIEND'
const SET_COUNT_NEW_MESSAGES = 'SET_COUNT_NEW_MESSAGES';
const SET_CURRENT_USER_IN_CHAT = 'SET_CURRENT_USER_IN_CHAT';

let initialState = {
    listDialogs: [],
    messagesWithFriend: {
        items: [],
        totalCount: null
    },
    countNesMessages: null,
    currentUserInChat: []
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

export const startChattingThunkCreator = (userId) => async (dispatch) => {
    let response = await DialogsAPI.startChatting(userId)
    console.log('startChatting')
    console.log(response)
}

export const getAllDialogsThunkCreator = () => async (dispatch) => {
    let response = await DialogsAPI.getAllDialogs();
    console.log('getAllDialogs')
    dispatch(setAllDialogsAC(response.data));
    console.log(response.data)
}


export const getListMessagesWithFriendThunkCreator = (userId) => async (dispatch) => {
    let response = await DialogsAPI.getListMessagesWithFriend(userId)
    dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount))
    console.log('getListMessagesWithFriend');
    console.log(response.data)
    //set current user in chat
     response = await ProfileAPI.getProfile(userId)
    dispatch(setCurrentUserInChatAC(response.data))


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


export default DialogsReducer;