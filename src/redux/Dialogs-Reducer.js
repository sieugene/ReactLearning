import {DialogsAPI} from "../Api/Api";
const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_MESSAGES_WITH_FRIEND = 'SET_MESSAGES_WITH_FRIEND'
const SET_COUNT_NEW_MESSAGES = 'SET_COUNT_NEW_MESSAGES';

let initialState = {
    listDialogs: [],
    messagesWithFriend: {
        items:[],
        totalCount: null
    },
    countNesMessages: null
}

const DialogsReducer = (state = initialState,action) => {
    switch(action.type) {
        case SET_ALL_DIALOGS:
            return{
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
            return{
                ...state,
                countNesMessages: action.countNesMessages
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
    return{
        type: SET_COUNT_NEW_MESSAGES,countNesMessages
    }
}

export const setMessagesListWithFriendAC = (messages,totalCount) => {
    return {
        type: SET_MESSAGES_WITH_FRIEND, messages,totalCount
    }
}

export const startChattingThunkCreator = (userId) => async(dispatch) => {
    let response = await DialogsAPI.startChatting(userId)
    console.log('startChatting')
    console.log(response)
}

export const getAllDialogsThunkCreator = () => async(dispatch) => {
    let response = await DialogsAPI.getAllDialogs();
    console.log('getAllDialogs')
    dispatch(setAllDialogsAC(response.data));
    console.log(response.data)
}

export const getListMessagesWithFriendThunkCreator = (userId) => async(dispatch) => {
    let response = await DialogsAPI.getListMessagesWithFriend(userId);
    dispatch(setMessagesListWithFriendAC(response.data.items,response.data.totalCount))
    console.log('getListMessagesWithFriend');
    console.log(response.data)
}

export const sendMessageToFriendThunkCreator = (userId,newMessage) => async(dispatch) => {
    let response = await DialogsAPI.sendMessageToFriend(userId,newMessage);
    dispatch(getListMessagesWithFriendThunkCreator(userId));
}

export const getListNewMessagesThunkCreator = () => async(dispatch) => {
    let response = await DialogsAPI.listNewMessage();
    dispatch(setCountNewMessages(response.data))
    console.log('getListNewMessages');
    console.log(response.data)
}


export default DialogsReducer;