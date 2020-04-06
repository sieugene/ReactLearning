import { DialogsAPI, ProfileAPI } from "../Api/Api";
import { InitialStateType, DialogItemType, MessageItemType } from "../Types/DialogsTypes";
import { AppStateType } from "./store-redux";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { reset } from "redux-form";
const SET_ALL_DIALOGS = 'SET_ALL_DIALOGS'
const SET_MESSAGES_WITH_FRIEND = 'SET_MESSAGES_WITH_FRIEND'
const SET_COUNT_NEW_MESSAGES = 'SET_COUNT_NEW_MESSAGES';
const SET_CURRENT_USER_IN_CHAT = 'SET_CURRENT_USER_IN_CHAT';
const SET_SUCCESS_LOADING = 'SET_SUCCESS_LOADING'
const SYNC_ALL_MESSAGES_TOOGLE = 'SYNC_ALL_MESSAGES_TOOGLE'
const TOGGLE_DISABLED_FORM = 'TOGGLE_DISABLED_FORM'

let initialState: InitialStateType = {
    listDialogs: [],
    messagesWithFriend: {
        items: [],
        totalCount: 0
    },
    countNesMessages: 0,
    currentUserInChat: [],
    loading: false,
    syncingAllMessages: false,
    disabledForm: false
}

const DialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
        case SYNC_ALL_MESSAGES_TOOGLE: {
            return {
                ...state,
                syncingAllMessages: action.syncingAllMessages
            }
        }
        case TOGGLE_DISABLED_FORM: {
            return {
                ...state,
                disabledForm: action.disabledForm
            }
        }
        default:
            return state
    }
}
type ActionsType = SetAllDialogsACType | SetCountNewMessagesType | SetCurrentUserInChatACType |
    SetMessagesListWithFriendACType | SetSuccessLoadingACType | SyncAllMessagesACType | DisabledFormACType
//actions creators
type SetAllDialogsACType = {
    type: typeof SET_ALL_DIALOGS
    allDialogs: DialogItemType[]
}
export const setAllDialogsAC = (allDialogs: DialogItemType[]): SetAllDialogsACType => {
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
    messages: MessageItemType[]
    totalCount: number
}
export const setMessagesListWithFriendAC = (messages: MessageItemType[], totalCount: number):
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
type SyncAllMessagesACType = {
    type: typeof SYNC_ALL_MESSAGES_TOOGLE
    syncingAllMessages: boolean
}
export const syncAllMessagesAC = (syncingAllMessages: boolean): SyncAllMessagesACType => {
    return {
        type: SYNC_ALL_MESSAGES_TOOGLE, syncingAllMessages
    }
}
type DisabledFormACType = {
    type: typeof TOGGLE_DISABLED_FORM
    disabledForm: boolean
}
export const disabledFormAC = (disabledForm: boolean): DisabledFormACType => {
    return {
        type: TOGGLE_DISABLED_FORM, disabledForm
    }
}
//thunks
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const startChattingThunkCreator = (userId: number): ThunkActionType => async (dispatch) => {
    await DialogsAPI.startChatting(userId)
}

export const getAllDialogsThunkCreator = (): ThunkActionType => async (dispatch) => {
    dispatch(setSuccessLoadingAC(true));
    let response = await DialogsAPI.getAllDialogs()
    dispatch(setSuccessLoadingAC(false));
    // console.log('getAllDialogs')
    dispatch(setAllDialogsAC(response.data));
    // console.log(response.data)
}


export const getListMessagesWithFriendThunkCreator = (userId: number): ThunkActionType => async (dispatch) => {
    dispatch(setSuccessLoadingAC(true));
    let response = await DialogsAPI.getListMessagesWithFriend(userId)
    dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
    let secondResponse = await ProfileAPI.getProfile(userId)
    dispatch(setCurrentUserInChatAC(secondResponse.data))
    Promise.all([response, secondResponse]).then(values => {
        dispatch(setSuccessLoadingAC(false));
    })
}

export const syncMessagesWithFrinedThunkCreator = (userId: number): ThunkActionType => async (dispatch, getState) => {
    const syncingAllMessages = getState().dialogs.syncingAllMessages;
    if (syncingAllMessages) {
        console.log('syncingAllMessages:', userId)
        let response = await DialogsAPI.returnMessageThanDate(userId, '2020.01.01');
        dispatch(setMessagesListWithFriendAC(response.data, response.data.length));
    } else {
        await DialogsAPI.getListMessagesWithFriend(userId).then((response) => {
            dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
            // console.log('getListMessagesWithFriend');
            // console.log(response.data)
            console.log('sync: User:', userId);
        })
    }
}

export const sendMessageToFriendThunkCreator = (userId: number, newMessage: string): ThunkActionType => async (dispatch:any) => {
    dispatch(disabledFormAC(true));
    await DialogsAPI.sendMessageToFriend(userId, newMessage).then((resp) => {
        dispatch(disabledFormAC(false));
        dispatch(reset("Message"));
    })
    await DialogsAPI.getListMessagesWithFriend(userId).then((response) => {
        dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
        // console.log('getListMessagesWithFriend');
        // console.log(response.data)
    })
}

export const getListNewMessagesThunkCreator = (userId: number): ThunkActionType => async (dispatch) => {
    let response = await DialogsAPI.listNewMessage();
    dispatch(setCountNewMessages(response.data))
    // console.log('getListNewMessages');
    // console.log(response.data)
}

export const getReturnMessageDateThunkCreator = (userId: number, date: string): ThunkActionType => async (dispatch) => {
    let response = await DialogsAPI.returnMessageThanDate(userId, date);
    dispatch(setMessagesListWithFriendAC(response.data, response.data.length));
    dispatch(syncAllMessagesAC(true))
}

export const DeleteMessageTC = (messageId: string, userId: number): ThunkActionType => async (dispatch) => {
    await DialogsAPI.deleteMessage(messageId);
    console.log('the message was deleted')
    await DialogsAPI.getListMessagesWithFriend(userId).then((response) => {
        dispatch(setMessagesListWithFriendAC(response.data.items, response.data.totalCount));
        // console.log('getListMessagesWithFriend');
        // console.log(response.data)
    })
}



export default DialogsReducer;