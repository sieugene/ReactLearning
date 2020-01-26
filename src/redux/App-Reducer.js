import {authMeThunkCreator} from "./Auth-Reducer";
import {ProfileAPI} from "../Api/Api";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const INITIALIZED_USER_PHOTO = 'INITIALIZED_USER_PHOTO';

let initialState = {
    initialized: false,
    userPhoto: null
}

export const appReducer = (state = initialState, action) => {
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

export const initializedSuccessAC = () => {
    return{
        type: INITIALIZED_SUCCESS
    }
}
export const initializedUserPhotoAC = (userPhoto) => {
    return{
        type: INITIALIZED_USER_PHOTO,
        userPhoto
    }
}

export const initiliazedThunkCreator = () => (dispatch) => {
    let promise = dispatch(authMeThunkCreator());
    promise.then(() => {
        dispatch(initializedSuccessAC());
    })
}
export const initiliazedUserPhotoThunkCreator = (userId) => async(dispatch) => {
    if(!userId){
        //none
    }else {
        let promise = await ProfileAPI.getProfile(userId);
        dispatch(initializedUserPhotoAC(promise.data.photos));
    }
}
