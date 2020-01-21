import Login from "./Login";
import {getCaptchaThunkCreator, loginThunkCreator} from "../../redux/Auth-Reducer";
import {connect} from "react-redux";


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

