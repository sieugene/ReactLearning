import {authMeThunkCreator} from "./Auth-Reducer";
import {ProfileAPI} from "../Api/Api";
import {IinitialStateType} from "../Types/AppTypes"
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const INITIALIZED_USER_PHOTO = 'INITIALIZED_USER_PHOTO';

let initialState:IinitialStateType = {
    initialized: false,
    userPhoto: null
}
export const appReducer = (state = initialState, action: any):IinitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case INITIALIZED_USER_PHOTO:
            return{
                ...state,
                userPhoto: {...action.userPhoto}
            }
        default:
            return state
    }
}

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
    userPhoto: string
}
export const initializedUserPhotoAC = (userPhoto: string):InitializedUserPhotoACType => {
    return{
        type: INITIALIZED_USER_PHOTO,
        userPhoto
    }
}

export const initiliazedThunkCreator = () => (dispatch: any) => {
    let promise = dispatch(authMeThunkCreator());
    promise.then(() => {
        dispatch(initializedSuccessAC());
    })
}
export const initiliazedUserPhotoThunkCreator = (userId : number) => async(dispatch : any) => {
    if(!userId){
        //none
    }else {
        let promise = await ProfileAPI.getProfile(userId);
        dispatch(initializedUserPhotoAC(promise.data.photos));
    }
}
