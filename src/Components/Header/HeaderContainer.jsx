import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/Auth-Reducer";
import {initiliazedUserPhotoThunkCreator} from "../../redux/App-Reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.initiliazedUserPhotoThunk(this.props.id);
    }

    render() {
        return (
            <Header {...this.props} userPhoto={this.props.userPhoto}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login,
        id: state.Auth.id,
        userPhoto: state.app.userPhoto
    }
}

export default connect(mapStateToProps, {
    logoutThunk: logoutThunkCreator,
    initiliazedUserPhotoThunk: initiliazedUserPhotoThunkCreator
})(HeaderContainer);