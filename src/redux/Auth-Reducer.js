import {meAPI, securityAPI} from "../Api/Api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_SUCCESS_CAPTCHA = 'SET_SUCCESS_CAPTCHA';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
        case SET_SUCCESS_CAPTCHA:
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
export const setSuccessCaptchaAC = (captcha) => {
    return {
        type: SET_SUCCESS_CAPTCHA,
        data: {captcha}
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

export const loginThunkCreator = (email,password,rememberMe,captcha) => (dispatch) => {
    meAPI.login(email,password,rememberMe,captcha).then(response => {
        if(response.data.resultCode === 0){
            dispatch(authMeThunkCreator())
        }else{
            if(response.data.resultCode === 10){
                dispatch(getCaptchaThunkCreator());
            }
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
export const getCaptchaThunkCreator = () => async(dispatch) => {
    let response = await securityAPI.getCaptcha();
    dispatch(setSuccessCaptchaAC(response.data.url))
}

export default authReducer;