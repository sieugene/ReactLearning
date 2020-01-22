import {DialogsAPI} from "../Api/Api";
const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_MESSAGES_WITH_FRIEND = 'SET_MESSAGES_WITH_FRIEND'


let initialState = {
    messages: [],
    listDialogs: [
        {
            id: 1,
            userName: 'test',
            hasNewMessages: false,
            lastDialogActivityDate: "2020-01-22T20:53:23.953",
            lastUserActivityDate: "2020-01-22T11:20:18.063",
            newMessagesCount: 0,
            photos:{
                small: null,
                large: null
            }
        }
    ],
    messagesWithFriends: {
        items:[

        ]
        ,
        totalCount: null
    },


}

const DialogsReducer = (state = initialState,action) => {
    switch(action.type) {
        case SET_ALL_DIALOGS:
            return{
                ...state,
                listDialogs: [...state.listDialogs, ...action.allDialogs]
            }
        case SET_MESSAGES_WITH_FRIEND:
            return {
                ...state,
                messagesWithFriends: {
                    items: [...state.messagesWithFriends.items, ...action.messages]
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
    console.log('sendMessageToFriendThunkCreator');
    console.log(response.data)
}


export default DialogsReducer;