import {ProfileAPI} from "../Api/Api";
import {stopSubmit} from "redux-form";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_NEW_PHOTO = 'SET_NEW_PHOTO'

let initialState = {
    profile: null,
    status: "",
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_NEW_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos:action.photos}
            }

        default:
            return state
    }
}

export const setUserProfileAC = (profile) => {
    return {
        type: SET_USER_PROFILE, profile
    }
}
export const setStatusUserAC = (status) => {
    return {
        type: SET_STATUS, status
    }
}
export const uploadNewPhotoAC = (photos) => {
    return {
        type: SET_NEW_PHOTO, photos
    }
}
export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        if (!userId) {
            //none
        } else {
            ProfileAPI.getProfile(userId)
                .then(response => {
                    dispatch(setUserProfileAC(response.data));
                })
        }
    }
}
//получение статуса пользователя
export const setStatusUserThunkCreator = (userId) => {
    return (dispatch) => {
        if (!userId) {
            //none
        } else {
            ProfileAPI.getStatus(userId).then(response => {
                dispatch(setStatusUserAC(response.data))
            })
        }
    }
}
export const updateStatusUserThunkCreator = (userId, newStatus) => {
    return (dispatch) => {
        //проверка на изменение входящего текста
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatusUserAC(response.data))
            if (!newStatus) {
                alert('field empty')
            } else {
                if (response.data !== newStatus) {
                    ProfileAPI.updateStatus(newStatus).then(response => {
                        if (response.data.resultCode === 0) {
                            dispatch(setStatusUserAC(newStatus))
                        }
                    })
                }
            }
        })
        //end
    }
}
export const updateProfileUserThunkCreator = (profile) => (dispatch, getState) => {
    return ProfileAPI.updateProfile(profile).then(response => {
        if (response.data.resultCode === 0) {
            const userId = getState().Auth.id;
            dispatch(getProfileThunkCreator(userId));
        } else {
            let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("editProfile", {_error: messageError}))
            return Promise.reject(response.data.messages[0]);
        }
    })

}

export const uploadNewPhotoThunkCreator = (photos) => async(dispatch) => {
    let response =  await ProfileAPI.uploadPhoto(photos)
    if(response.data.resultCode === 0){
        dispatch(uploadNewPhotoAC(response.data.data.photos));
    }
}

export default profilePageReducer;