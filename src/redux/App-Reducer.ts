import {authMeThunkCreator} from "./Auth-Reducer";
import {ProfileAPI} from "../Api/Api";
import {IinitialStateType} from "../Types/AppTypes"
import { AppStateType } from "./store-redux";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const INITIALIZED_USER_PHOTO = 'INITIALIZED_USER_PHOTO';


let initialState:IinitialStateType = {
    initialized: false,
    userPhoto: {
        small: '',
        large: ''
    }
}
export const appReducer = (state = initialState, action: ActionsType):IinitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case INITIALIZED_USER_PHOTO:
            return{
                ...state,
                userPhoto: action.userPhoto
            }
        default:
            return state
    }
}

type ActionsType = InitializedSuccessACType | InitializedUserPhotoACType
//actions creators
type InitializedSuccessACType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccessAC = ():InitializedSuccessACType => {
    return{
        type: INITIALIZED_SUCCESS
    }
}
type InitializedUserPhotoACType = {
    type: typeof INITIALIZED_USER_PHOTO,
    userPhoto: {small:string,large:string}
}
export const initializedUserPhotoAC = (userPhoto: {small:string,large:string}):InitializedUserPhotoACType => {
    return{
        type: INITIALIZED_USER_PHOTO,
        userPhoto
    }
}
//thunks
type GetState = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>,GetState,unknown,ActionsType>

export const initiliazedThunkCreator = ():ThunkType => async (dispatch:any) => {
    let promise = dispatch(authMeThunkCreator());
    promise.then(() => {
        dispatch(initializedSuccessAC());
    })
}
export const initiliazedUserPhotoThunkCreator = (userId : number):ThunkType => async(dispatch) => {
    if(!userId){
        //none
    }else {
        let promise = await ProfileAPI.getProfile(userId);
        dispatch(initializedUserPhotoAC(promise.data.photos));
    }
}
