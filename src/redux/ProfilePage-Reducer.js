import {meAPI, ProfileAPI} from "../Api/Api";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_MY_PROFILE = 'GET_MY_PROFILE';

let initialState = {
    profile: null,
    myProfileId: null
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case GET_MY_PROFILE:

            return{
                ...state,
                myProfileId: action.myProfileId
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
export const getMyProfileAC = (myProfileId) => {
    return {
        type: GET_MY_PROFILE, myProfileId
    }
}
export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        ProfileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data));
            })
    }
}
//два запроса, возможно не правильная реализация, но выдает правильный профиль
//изначально узнаем кто мы и берем id
//после делаем запрос к profileApi и добавляем массив данных, который мапится
export const getMyProfileThunkCreator = () => {
    return (dispatch) => {
        meAPI.me().then(response => {
            dispatch(getMyProfileAC(response.data.data.id));
            ProfileAPI.getProfile(response.data.data.id)
                .then(response => {
                    dispatch(setUserProfileAC(response.data));
                })
        })
    }
}


export default profilePageReducer;