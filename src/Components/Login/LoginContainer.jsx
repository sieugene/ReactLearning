import Login from "./Login";
import {connect} from "react-redux";
import { loginThunkCreator, getCaptchaThunkCreator } from "../../redux/Auth-Reducer";


let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        captcha: state.Auth.captcha
    }
}

export const LoginContainer = connect(mapStateToProps, {
    loginThunk: loginThunkCreator,
    getCaptchaThunk: getCaptchaThunkCreator
})(Login)

