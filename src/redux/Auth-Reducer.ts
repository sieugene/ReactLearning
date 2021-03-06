import { meAPI, securityAPI, ResultCodesEnum } from "../Api/Api";
import { stopSubmit } from "redux-form";
import { AppStateType } from "./store-redux";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_SUCCESS_CAPTCHA = 'SET_SUCCESS_CAPTCHA';
const TOOGLE_LOADING = 'TOOGLE_LOADING';
//длинная запись
// type InitialStateType2 = {
//     id: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean 
//     captcha: string | null
// }
type InitialStateType = typeof initialState;
let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captcha: '' as string,
    loading: false
}
//коротая запись установки типа, автоматически
//но указав as, даем понятие четкого типа


const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER:
        case SET_SUCCESS_CAPTCHA:
            return {
                ...state,
                ...action.data
            }
        case TOOGLE_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}

type ActionsType = SetAuthUserACType | SetSuccessCaptchaACType |
    ToogleLoadingACType | SetSuccessCaptchaACType
//actions creators
type DataSetAuthUserACType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type SetAuthUserACType = {
    type: typeof SET_AUTH_USER,
    data: DataSetAuthUserACType
}

export const setAuthUserAC =
    (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserACType => {
        return {
            type: SET_AUTH_USER,
            data: { id, login, email, isAuth }
        }
    }

type ToogleLoadingACType = {
    type: typeof TOOGLE_LOADING,
    loading: boolean
}
export const toogleLoadingAC = (loading: boolean): ToogleLoadingACType => {
    return {
        type: TOOGLE_LOADING,
        loading
    }
}
type SetSuccessCaptchaACType = {
    type: typeof SET_SUCCESS_CAPTCHA,
    data: {
        captcha: string
    }
}
export const setSuccessCaptchaAC = (captcha: string): SetSuccessCaptchaACType => {
    return {
        type: SET_SUCCESS_CAPTCHA,
        data: { captcha }
    }
}
//thunks
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const authMeThunkCreator = (): ThunkType => async (dispatch) => {
    dispatch(toogleLoadingAC(true));
    return await meAPI.me().then((response) => {
        //вставили enum, который дает понятие возвращаемых ошибок
        //подробнее в api.ts
        if (response.data.resultCode === ResultCodesEnum.Success) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserAC(id, login, email, true))
            dispatch(toogleLoadingAC(false));
        } else {
            dispatch(toogleLoadingAC(false));
        }
    })
}
type loginThunkCreatorType = {
    response: {}
    data: {
        resultCode: number;
        messages: string[]
    }
}
export const loginThunkCreator =
    (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => (dispatch: any) => {
        dispatch(toogleLoadingAC(true));
        meAPI.login(email, password, rememberMe, captcha).then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(authMeThunkCreator())
                dispatch(toogleLoadingAC(false));
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaThunkCreator());
                    dispatch(toogleLoadingAC(false));
                }
                let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", { _error: messageError }))
                dispatch(toogleLoadingAC(false));
            }
        })
    }
type LogoutThunkCreatorType = {
    response: {};
    data: {
        resultCode: number
    }
}
export const logoutThunkCreator = (): ThunkType => (dispatch) => {
    dispatch(toogleLoadingAC(true));
    meAPI.logout().then((response: any) => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserAC(null, null, null, false))
            dispatch(toogleLoadingAC(false));
        } else {
            dispatch(toogleLoadingAC(false));
        }
    })
}
export const getCaptchaThunkCreator = (): ThunkType => async (dispatch) => {
    dispatch(toogleLoadingAC(true));
    let response = await securityAPI.getCaptcha();
    dispatch(setSuccessCaptchaAC(response.data.url))
    dispatch(toogleLoadingAC(false));
}

export default authReducer;