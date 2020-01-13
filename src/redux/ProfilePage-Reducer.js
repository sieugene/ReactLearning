import {meAPI, ProfileAPI} from "../Api/Api";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


let initialState = {
    profile: null,
    status: ""
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return{
                ...state,
                status: action.status
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
    return{
        type: SET_STATUS, status
    }
}
export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        if(!userId){
            //none
        }else {
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
        if(!userId){
            //none
        }else {
            ProfileAPI.getStatus(userId).then(response => {
                dispatch(setStatusUserAC(response.data))
            })
        }
    }
}
export const updateStatusUserThunkCreator = (userId,newStatus) => {
    return (dispatch) => {
        //проверка на изменение входящего текста
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatusUserAC(response.data))
            if(!newStatus){
                alert('field empty')
            }else {
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


export default profilePageReducer;