import Login from "./Login";
import { connect } from "react-redux";
import { loginThunkCreator, getCaptchaThunkCreator } from "../../redux/Auth-Reducer";
import { AppStateType } from "../../redux/store-redux";


type MapStateType = {
    isAuth: boolean,
    captcha: string,
    loading: boolean
}
type MapDispatchType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
    getCaptchaThunk: () => void
}

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        isAuth: state.Auth.isAuth,
        captcha: state.Auth.captcha,
        loading: state.Auth.loading
    }
}

export const LoginContainer = connect<MapStateType, MapDispatchType, null, AppStateType>
    (mapStateToProps, {
        loginThunk: loginThunkCreator,
        getCaptchaThunk: getCaptchaThunkCreator
    })(Login)

