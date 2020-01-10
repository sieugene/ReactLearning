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
            if(response.data.resultCode === 0) {
                ProfileAPI.getProfile(response.data.data.id)
                    .then(response => {
                        dispatch(setUserProfileAC(response.data));
                    })
            }
        })
    }
}
//получение статуса пользователя
export const setStatusUserThunkCreator = (userId) => {
    return (dispatch) => {
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatusUserAC(response.data))
        })
    }
}
export const updateStatusUserThunkCreator = (userId,newStatus) => {
    return (dispatch) => {
        //проверка на изменение входящего текста
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatusUserAC(response.data))
            if(!newStatus){
                //none
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