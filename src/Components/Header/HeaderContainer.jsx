import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/Auth-Reducer";


class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}
            profile={this.props.profile}
            />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login,
        id: state.Auth.id,
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, {
    logoutThunk: logoutThunkCreator
})(HeaderContainer);