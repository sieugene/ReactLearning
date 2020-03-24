import {authMeThunkCreator} from "./Auth-Reducer";
import {ProfileAPI} from "../Api/Api";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const INITIALIZED_USER_PHOTO = 'INITIALIZED_USER_PHOTO';

type IinitialStateType = {
    initialized: boolean,
    userPhoto: null
}
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
export const initializedUserPhotoAC = (userPhoto: any) => {
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
export const initiliazedUserPhotoThunkCreator = (userId : any) => async(dispatch : any) => {
    if(!userId){
        //none
    }else {
        let promise = await ProfileAPI.getProfile(userId);
        dispatch(initializedUserPhotoAC(promise.data.photos));
    }
}
