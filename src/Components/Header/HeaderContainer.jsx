import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authMeThunkCreator, logoutThunkCreator} from "../../redux/Auth-Reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authMeThunk();
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login,
        id: state.Auth.id
    }
}

export default connect(mapStateToProps, {
    authMeThunk: authMeThunkCreator,
    logoutThunk: logoutThunkCreator
})(HeaderContainer);