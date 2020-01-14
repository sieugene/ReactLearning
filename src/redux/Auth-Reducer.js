import {meAPI} from "../Api/Api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER = 'SET_AUTH_USER';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.data,
            }
         default :
             return state
    }
}

export const setAuthUserAC = (id,login,email,isAuth) => {
    return {
        type: SET_AUTH_USER,
        data: {id,login,email,isAuth}
    }
}
export const authMeThunkCreator = () => (dispatch) => {
    return meAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserAC(id, login, email,true))
        }
    })
}

export const loginThunkCreator = (email,password,rememberMe) => (dispatch) => {
    meAPI.login(email,password,rememberMe).then(response => {
        if(response.data.resultCode === 0){
            dispatch(authMeThunkCreator())
        }else{
            let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login",{_error: messageError}))
        }

    })
}
export const logoutThunkCreator = () => (dispatch) => {
    meAPI.logout().then(response => {
        if(response.data.resultCode === 0){
            dispatch(setAuthUserAC(null,null,null,false))
        }
    })
}
export default authReducer;