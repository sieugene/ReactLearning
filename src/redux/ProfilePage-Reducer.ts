import { ProfileAPI } from "../Api/Api";
import { stopSubmit } from "redux-form";
import { ProfileType } from "../Types/ProfileTypes";
import { AppStateType } from "./store-redux";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_NEW_PHOTO = 'SET_NEW_PHOTO'
const SET_SUCCESS_LOADING = 'SET_SUCCESS_LOADING'

let initialState = {
    profile: null as ProfileType | {} | null,
    status: "",
    loading: false
}
type InitialStateType = typeof initialState;

const profilePageReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
                profile: { ...state.profile, photos: action.photos }
            }
        case SET_SUCCESS_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}

type ActionsType = SetUserProfileACType | SetStatusUserACType | UploadNewPhotoACType |
    SetLoadingACType
//actions creator
type SetUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType): SetUserProfileACType => {
    return {
        type: SET_USER_PROFILE, profile
    }
}
type SetStatusUserACType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatusUserAC = (status: string): SetStatusUserACType => {
    return {
        type: SET_STATUS, status
    }
}
type UploadNewPhotoACType = {
    type: typeof SET_NEW_PHOTO,
    photos: string
}
export const uploadNewPhotoAC = (photos: string): UploadNewPhotoACType => {
    return {
        type: SET_NEW_PHOTO, photos
    }
}
type SetLoadingACType = {
    type: typeof SET_SUCCESS_LOADING,
    loading: boolean
}
export const setLoadingAC = (loading: boolean): SetLoadingACType => {
    return {
        type: SET_SUCCESS_LOADING, loading
    }
}
//thunks
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getProfileThunkCreator = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        if (!userId) {
            //none
        } else {
            await ProfileAPI.getProfile(userId)
                .then((response: { data: ProfileType; }) => {
                    dispatch(setUserProfileAC(response.data));
                })
        }
    }
}
//получение статуса пользователя
export const setStatusUserThunkCreator = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        if (!userId) {
            //none
        } else {
            await ProfileAPI.getStatus(userId).then((response: { data: string; }) => {
                dispatch(setStatusUserAC(response.data))
            })
        }
    }
}
type UpdateStatusResponseType = {
    data: {
        resultCode: number
    }
}
export const updateStatusUserThunkCreator = (userId: number, newStatus: string | null): ThunkActionType => {
    return async (dispatch) => {
        //проверка на изменение входящего текста
        await ProfileAPI.getStatus(userId).then((response: { data: string }) => {
            dispatch(setStatusUserAC(response.data))
            if (!newStatus) {
                alert('field empty')
            } else {
                if (response.data !== newStatus) {
                    dispatch(setLoadingAC(true));
                    ProfileAPI.updateStatus(newStatus).then((response: UpdateStatusResponseType) => {
                        if (response.data.resultCode === 0) {
                            dispatch(setStatusUserAC(newStatus))
                            dispatch(setLoadingAC(false));
                        }
                    })
                }
            }
        })
        //end
    }
}
type UpdateProfileResponseType = {
    data: {
        resultCode: number;
        messages: string | any[]
    }
}
export const updateProfileUserThunkCreator = (profile: ProfileType): ThunkActionType => 
    async(dispatch: any, getState) => {
    return await ProfileAPI.updateProfile(profile).then((response: UpdateProfileResponseType) => {
        if (response.data.resultCode === 0) {
            const userId = getState().Auth.id;
            if (userId) {
                dispatch(getProfileThunkCreator(userId));
            }
        } else {
            let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("editProfile", { _error: messageError }))
            return Promise.reject(response.data.messages[0]);
        }
    })

}

export const uploadNewPhotoThunkCreator = (photos: string): ThunkActionType => async (dispatch) => {
    dispatch(setLoadingAC(true));
    let response = await ProfileAPI.uploadPhoto(photos)
    dispatch(setLoadingAC(false));
    if (response.data.resultCode === 0) {
        dispatch(uploadNewPhotoAC(response.data.data.photos));
    }
}

export default profilePageReducer;