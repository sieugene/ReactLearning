import { DialogsAPI, ProfileAPI } from "../Api/Api";

const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_MESSAGES_WITH_FRIEND = 'SET_MESSAGES_WITH_FRIEND'
const SET_COUNT_NEW_MESSAGES = 'SET_COUNT_NEW_MESSAGES';
const SET_CURRENT_USER_IN_CHAT = 'SET_CURRENT_USER_IN_CHAT';
const SET_SUCCESS_LOADING = 'SET_SUCCESS_LOADING'


type InitialStateType = {
    listDialogs: [];
    messagesWithFriend: {
        items: [],
        totalCount: number | null
    };
    countNesMessages: number | null;
    currentUserInChat: [];
    loading: boolean;
}

let initialState: InitialStateType = {
    listDialogs: [],
    messagesWithFriend: {
        items: [],
        totalCount: null
    },
    countNesMessages: null,
    currentUserInChat: [],
    loading: false
}

const DialogsReducer = (state = initialState, action: any) => {
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
                    items: action.messages,
                    totalCount: action.totalCount
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
            return {
                ...state,
                loading: action.loading
            }
        }
        default:
            return state
    }
}

type SetAllDialogsACType = {
    type: typeof SET_ALL_DIALOGS
    allDialogs: object
}
export const setAllDialogsAC = (allDialogs: Object): SetAllDialogsACType => {
    return {
        type: SET_ALL_DIALOGS, allDialogs
    }
}
type SetCountNewMessagesType = {
    type: typeof SET_COUNT_NEW_MESSAGES
    countNesMessages: number
}
export const setCountNewMessages = (countNesMessages: number): SetCountNewMessagesType => {
    return {
        type: SET_COUNT_NEW_MESSAGES, countNesMessages
    }
}
type SetCurrentUserInChatACType = {
    type: typeof SET_CURRENT_USER_IN_CHAT
    profile: object
}
export const setCurrentUserInChatAC = (profile: object): SetCurrentUserInChatACType => {
    return {
        type: SET_CURRENT_USER_IN_CHAT, profile
    }
}

type SetMessagesListWithFriendACType = {
    type: typeof SET_MESSAGES_WITH_FRIEND
    messages: object
    totalCount?: number | null
}
export const setMessagesListWithFriendAC = (messages: object, totalCount?: number):
    SetMessagesListWithFriendACType => {
    return {
        type: SET_MESSAGES_WITH_FRIEND, messages, totalCount
    }
}
type SetSuccessLoadingACType = {
    type: typeof SET_SUCCESS_LOADING
    loading: boolean
}
export const setSuccessLoadingAC = (loading: boolean): SetSuccessLoadingACType => {
    return {
        type: SET_SUCCESS_LOADING, loading
    }
}

export const startChattingThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await DialogsAPI.startChatting(userId)
    console.log('startChatting')
    console.log(response)
}

export const getAllDialogsThunkCreator = () => async (dispatch: any) => {
    dispatch(setSuccessLoadingAC(true));
    let response = await DialogsAPI.getAllDialogs()
    dispatch(setSuccessLoadingAC(false));
    console.log('getAllDialogs')
    dispatch(setAllDialogsAC(response.data));
    console.log(response.data)
}


export const getListMessagesWithFriendThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await DialogsAPI.getListMessagesWithFriend(userId)
    dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
    console.log('getListMessagesWithFriend');
    console.log(response.data)
    //set current user in chat
    response = await ProfileAPI.getProfile(userId)
    dispatch(setCurrentUserInChatAC(response.data))
    Promise.all([response]).then(values => {
        dispatch(setSuccessLoadingAC(false));
    })
}
export const syncMessagesWithFrinedThunkCreator = (userId: number) => (dispatch: any) => {
    DialogsAPI.getListMessagesWithFriend(userId).then((response: any) => {
        dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
        console.log('getListMessagesWithFriend');
        console.log(response.data)
    })
    console.log('sync: User:', userId);
}

export const sendMessageToFriendThunkCreator = (userId: number, newMessage: string) => async (dispatch: any) => {
    await DialogsAPI.sendMessageToFriend(userId, newMessage);
    dispatch(getListMessagesWithFriendThunkCreator(userId));
}

export const getListNewMessagesThunkCreator = (userId: number) => async (dispatch: any) => {
    let response = await DialogsAPI.listNewMessage();
    dispatch(setCountNewMessages(response.data))
    console.log('getListNewMessages');
    console.log(response.data)
}
type ReponseGetReturnMessageDateThunkCreatorType = {
    response: {}
    data: {
        items: any
        totalCount: number | null
    }
}
export const getReturnMessageDateThunkCreator = (userId: number, date: string) => async (dispatch: any) => {
    let response: ReponseGetReturnMessageDateThunkCreatorType = await DialogsAPI.returnMessageThanDate(userId, date);
    dispatch(setMessagesListWithFriendAC(response.data));
}



export default DialogsReducer;