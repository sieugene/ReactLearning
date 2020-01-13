import Login from "./Login";
import {loginThunkCreator} from "../../redux/Auth-Reducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth
    }
}

export const LoginContainer = connect(mapStateToProps, {
    loginThunk: loginThunkCreator
})(Login)

